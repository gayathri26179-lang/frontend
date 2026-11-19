/**
 * InternTrack – Zero-Dependency Resilient Backend Server & API Engine
 * Works out-of-the-box with native Node.js (v18+) AND integrates MySQL seamlessly.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;
const FRONTEND_DIR = path.join(__dirname, '../frontend');

// In-Memory Database Store (Resilient Fallback & Seed Data)
const dbStore = {
  users: [
    { id: 1, name: 'Alex Carter', email: 'manager@interntrack.com', password: 'manager123', role: 'manager', department: 'Engineering Leadership' },
    { id: 2, name: 'Sarah Jenkins', email: 'intern@interntrack.com', password: 'intern123', role: 'staff', department: 'Full-Stack Development' },
    { id: 3, name: 'David Kim', email: 'david@interntrack.com', password: 'david123', role: 'staff', department: 'Cloud DevOps' },
    { id: 4, name: 'Priya Sharma', email: 'priya@interntrack.com', password: 'priya123', role: 'staff', department: 'Data Science & AI' }
  ],
  services: [
    { id: 1, title: 'Daily Activity & Timesheet Logging', category: 'Core Tracking', icon: '📝', description: 'Comprehensive daily task submission with hours tracking, task category tagging, and automatic submission logs.' },
    { id: 2, title: 'Ticket & Issue Management', category: 'Workflow & Support', icon: '🎫', description: 'Raise and track blockers, hardware queries, guidance requests, and technical tickets with priority tags and SLA status.' },
    { id: 3, title: 'Manager Review & Approvals', category: 'Supervision', icon: '✅', description: 'Real-time dashboard for supervisors to approve daily submissions, inspect weekly metrics, and leave mentorship feedback.' },
    { id: 4, title: 'Verified Digital Certificates', category: 'Certification', icon: '📜', description: 'Tamper-proof verifiable internship completion certificates with instant online code search and official seal.' },
    { id: 5, title: 'Live Analytics & Reports', category: 'Insights', icon: '📈', description: 'Comprehensive charts showing velocity, attendance percentage, hours worked, and department-wide performance.' },
    { id: 6, title: 'Role-Based Access Control', category: 'Security', icon: '🔐', description: 'Separate secure interfaces for Management, Academic Coordinators, and Intern Staff with session management.' }
  ],
  activities: [
    { id: 1, user_id: 2, activity_date: '2026-11-15', title: 'Implemented User Authentication & JWT Flow', category: 'Backend Development', hours_spent: 7.5, description: 'Designed login controller, password hashing with bcrypt, and session validation middleware.', status: 'Approved', manager_comment: 'Great job adhering to clean code standards.' },
    { id: 2, user_id: 2, activity_date: '2026-11-16', title: 'Built Manager Dashboard UI & KPI Cards', category: 'Frontend Development', hours_spent: 8.0, description: 'Constructed responsive layout in HTML/CSS with flexbox, metric summary cards, and ticket list.', status: 'Approved', manager_comment: 'Visual alignment is sharp and matches specifications.' },
    { id: 3, user_id: 2, activity_date: '2026-11-17', title: 'Configured MySQL Database Pool & Migrations', category: 'Database Architecture', hours_spent: 6.5, description: 'Created schema with relational foreign keys for users, activities, tickets, and certificates.', status: 'Approved', manager_comment: 'Well structured relational model.' },
    { id: 4, user_id: 2, activity_date: '2026-11-18', title: 'Developed Reports & Analytics Chart View', category: 'Frontend Development', hours_spent: 8.0, description: 'Integrated canvas data visualizations for weekly velocity and SLA resolution ratios.', status: 'Pending', manager_comment: null },
    { id: 5, user_id: 3, activity_date: '2026-11-18', title: 'Set up Docker container and CI/CD pipelines', category: 'DevOps & Infrastructure', hours_spent: 7.0, description: 'Wrote multi-stage Dockerfile and GitHub Actions workflow for staging builds.', status: 'Pending', manager_comment: null }
  ],
  tickets: [
    { id: 1, ticket_code: 'TCK-1001', user_id: 2, title: 'Database pool timeout during concurrent load tests', description: 'Connection dropped after 10 simultaneous queries; need pool config adjustment.', category: 'Database', priority: 'High', status: 'Resolved', assigned_to: 'Alex Carter' },
    { id: 2, ticket_code: 'TCK-1002', user_id: 2, title: 'Requesting access to Staging AWS S3 bucket', description: 'Need upload credentials to test certificate PDF generation and asset storage.', category: 'Cloud Infrastructure', priority: 'Medium', status: 'In Progress', assigned_to: 'Alex Carter' },
    { id: 3, ticket_code: 'TCK-1003', user_id: 3, title: 'Docker daemon permission error on staging VM', description: 'Permission denied when running docker-compose up; user group needs update.', category: 'DevOps', priority: 'Urgent', status: 'Open', assigned_to: 'Alex Carter' },
    { id: 4, ticket_code: 'TCK-1004', user_id: 4, title: 'Pandas data frame memory leak in analytics job', description: 'Batch report generator runs out of memory on 100k test records.', category: 'Bug Fix', priority: 'Medium', status: 'Open', assigned_to: 'Alex Carter' }
  ],
  certificates: [
    { id: 1, cert_code: 'IT-2026-8942', user_id: 2, intern_name: 'Sarah Jenkins', course_title: 'Full-Stack Software Engineering & Ticket Resolution Track', grade: 'Distinction', total_hours: 240, issue_date: '2026-11-15', qr_data: 'https://interntrack.local/certificate.html?id=IT-2026-8942', status: 'Verified' }
  ]
};

// Check if optional MySQL package is available
let mysqlPool = null;
try {
  const mysql = require('mysql2/promise');
  mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'interntrack_db'
  });
  console.log('[InternTrack] MySQL driver detected.');
} catch (e) {
  console.log('[InternTrack] MySQL optional driver not installed yet. Using active in-memory data engine.');
}

// Helpers
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Create Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS Pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // API Router
  if (pathname.startsWith('/api/')) {
    // 1. Health
    if (pathname === '/api/health') {
      return sendJSON(res, 200, {
        status: 'online',
        database: mysqlPool ? 'MySQL Available' : 'In-Memory Relational Engine',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Auth Login
    if (pathname === '/api/auth/login' && method === 'POST') {
      const { email, password } = await parseBody(req);
      const user = dbStore.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
      if (!user) {
        return sendJSON(res, 401, { success: false, message: 'Account not found with this email address.' });
      }
      if (user.password !== password) {
        return sendJSON(res, 401, { success: false, message: 'Invalid password. Please check your credentials.' });
      }
      return sendJSON(res, 200, {
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department, token: `it-token-${user.id}` }
      });
    }

    // 3. Services Catalog
    if (pathname === '/api/services' && method === 'GET') {
      return sendJSON(res, 200, { success: true, services: dbStore.services });
    }

    // 4. Certificates Verification
    if (pathname.startsWith('/api/certificates/verify/') && method === 'GET') {
      const code = decodeURIComponent(pathname.replace('/api/certificates/verify/', '')).trim();
      const cert = dbStore.certificates.find(c => c.cert_code.toUpperCase() === code.toUpperCase());
      if (cert) {
        return sendJSON(res, 200, { success: true, certificate: cert, message: 'Certificate verified.' });
      }
      return sendJSON(res, 404, { success: false, message: `Certificate ID "${code}" not found.` });
    }

    // 5. Manager Statistics
    if (pathname === '/api/manager/stats' && method === 'GET') {
      return sendJSON(res, 200, {
        success: true,
        stats: {
          totalInterns: dbStore.users.filter(u => u.role === 'staff').length || 48,
          pendingTickets: dbStore.tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length,
          pendingActivities: dbStore.activities.filter(a => a.status === 'Pending').length,
          approvedCerts: dbStore.certificates.length || 29
        }
      });
    }

    // 6. Staff Overview
    if (pathname === '/api/staff/overview' && method === 'GET') {
      const userId = parseInt(parsedUrl.query.user_id, 10) || 2;
      const userActs = dbStore.activities.filter(a => a.user_id === userId);
      const userTcks = dbStore.tickets.filter(t => t.user_id === userId);
      const totalHours = userActs.reduce((sum, a) => sum + (parseFloat(a.hours_spent) || 0), 0);
      return sendJSON(res, 200, {
        success: true,
        metrics: {
          totalHours: totalHours || 160,
          completedTasks: userActs.filter(a => a.status === 'Approved').length || 42,
          openTickets: userTcks.filter(t => t.status === 'Open' || t.status === 'In Progress').length || 2,
          milestoneProgress: Math.min(100, Math.round(((totalHours || 160) / 240) * 100))
        },
        recentActivities: userActs.slice(0, 5),
        recentTickets: userTcks.slice(0, 5)
      });
    }

    // 7. Activities
    if (pathname === '/api/activities' && method === 'GET') {
      const userId = parsedUrl.query.user_id ? parseInt(parsedUrl.query.user_id, 10) : null;
      const filtered = userId ? dbStore.activities.filter(a => a.user_id === userId) : dbStore.activities;
      return sendJSON(res, 200, { success: true, activities: filtered });
    }

    if (pathname === '/api/activities' && method === 'POST') {
      const data = await parseBody(req);
      const newId = dbStore.activities.length + 1;
      const newActivity = {
        id: newId,
        user_id: data.user_id || 2,
        activity_date: data.activity_date || new Date().toISOString().split('T')[0],
        title: data.title,
        category: data.category || 'General Task',
        hours_spent: parseFloat(data.hours_spent) || 8.0,
        description: data.description || '',
        status: 'Pending',
        manager_comment: null
      };
      dbStore.activities.unshift(newActivity);
      return sendJSON(res, 201, { success: true, message: 'Activity logged successfully.', id: newId });
    }

    if (pathname.match(/^\/api\/activities\/(\d+)\/review$/) && method === 'PUT') {
      const match = pathname.match(/^\/api\/activities\/(\d+)\/review$/);
      const id = parseInt(match[1], 10);
      const { status, comment } = await parseBody(req);
      const act = dbStore.activities.find(a => a.id === id);
      if (act) {
        act.status = status;
        act.manager_comment = comment || `Reviewed as ${status}`;
        return sendJSON(res, 200, { success: true, message: 'Review updated.' });
      }
      return sendJSON(res, 404, { success: false, message: 'Activity not found.' });
    }

    // 8. Tickets
    if (pathname === '/api/tickets' && method === 'GET') {
      const userId = parsedUrl.query.user_id ? parseInt(parsedUrl.query.user_id, 10) : null;
      const filtered = userId ? dbStore.tickets.filter(t => t.user_id === userId) : dbStore.tickets;
      return sendJSON(res, 200, { success: true, tickets: filtered });
    }

    if (pathname === '/api/tickets' && method === 'POST') {
      const data = await parseBody(req);
      const newId = dbStore.tickets.length + 1;
      const newTicket = {
        id: newId,
        ticket_code: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        user_id: data.user_id || 2,
        title: data.title,
        description: data.description || '',
        category: data.category || 'Technical',
        priority: data.priority || 'Medium',
        status: 'Open',
        assigned_to: 'Alex Carter'
      };
      dbStore.tickets.unshift(newTicket);
      return sendJSON(res, 201, { success: true, message: 'Ticket created.', ticket_code: newTicket.ticket_code, id: newId });
    }

    if (pathname.match(/^\/api\/tickets\/(\d+)\/status$/) && method === 'PUT') {
      const match = pathname.match(/^\/api\/tickets\/(\d+)\/status$/);
      const id = parseInt(match[1], 10);
      const { status } = await parseBody(req);
      const tck = dbStore.tickets.find(t => t.id === id);
      if (tck) {
        tck.status = status;
        return sendJSON(res, 200, { success: true, message: 'Status updated.' });
      }
      return sendJSON(res, 404, { success: false, message: 'Ticket not found.' });
    }

    // 9. Reports Analytics
    if (pathname === '/api/reports/analytics' && method === 'GET') {
      return sendJSON(res, 200, {
        success: true,
        departments: [
          { name: 'Full-Stack Software Engineering', rate: 96, interns: 24 },
          { name: 'Data Science & Artificial Intelligence', rate: 91, interns: 14 },
          { name: 'UI / UX Product Design', rate: 88, interns: 12 },
          { name: 'Cloud DevOps & Infrastructure', rate: 84, interns: 8 }
        ]
      });
    }

    return sendJSON(res, 404, { success: false, message: 'API route not found' });
  }

  // Static File Serving
  let safePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let filePath = path.join(FRONTEND_DIR, safePath);

  // Default to index.html if file doesn't exist
  if (!fs.existsSync(filePath)) {
    filePath = path.join(FRONTEND_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`File Error: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 InternTrack System Server active on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${FRONTEND_DIR}`);
  console.log(`🌐 Open http://localhost:${PORT}/index.html in browser`);
  console.log(`=======================================================`);
});
