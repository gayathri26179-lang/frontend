const mysql = require('mysql2/promise');
require('dotenv').config();

// In-Memory Fallback State (Ensures zero crashes if MySQL service is not yet started)
const inMemoryStore = {
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

let pool = null;
let useMySQL = false;

async function initDatabase() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'interntrack_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  try {
    // Attempt connection
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL at ${dbConfig.host}:${dbConfig.database}`);
    connection.release();
    useMySQL = true;
  } catch (err) {
    console.warn(`[Database Notice] MySQL connection failed (${err.message}). Activating built-in resilient In-Memory Database store with pre-seeded data.`);
    useMySQL = false;
  }
}

// Universal query runner supporting both MySQL and In-Memory fallback
async function query(sql, params = []) {
  if (useMySQL && pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (dbErr) {
      console.error('[MySQL Query Error]', dbErr.message);
      throw dbErr;
    }
  }

  // Handle in-memory simulation for core routes
  const normalizedSql = sql.trim().toLowerCase();

  // 1. Users Queries
  if (normalizedSql.includes('from users') && normalizedSql.includes('email =')) {
    const email = params[0];
    const user = inMemoryStore.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    return user ? [user] : [];
  }
  if (normalizedSql.includes('select * from users') || normalizedSql.includes('select id, name, email')) {
    return inMemoryStore.users;
  }

  // 2. Services Queries
  if (normalizedSql.includes('from services')) {
    return inMemoryStore.services;
  }

  // 3. Certificates Queries
  if (normalizedSql.includes('from certificates') && (normalizedSql.includes('cert_code =') || normalizedSql.includes('where cert_code'))) {
    const code = params[0];
    const cert = inMemoryStore.certificates.find(c => c.cert_code.toUpperCase() === (code || '').toUpperCase());
    return cert ? [cert] : [];
  }
  if (normalizedSql.includes('from certificates')) {
    return inMemoryStore.certificates;
  }

  // 4. Activities Queries
  if (normalizedSql.includes('from activities')) {
    if (normalizedSql.includes('where user_id =')) {
      const userId = parseInt(params[0], 10);
      return inMemoryStore.activities.filter(a => a.user_id === userId);
    }
    return inMemoryStore.activities;
  }
  if (normalizedSql.startsWith('insert into activities')) {
    const newId = inMemoryStore.activities.length + 1;
    const [userId, date, title, cat, hours, desc, status] = params;
    const newActivity = {
      id: newId,
      user_id: parseInt(userId, 10),
      activity_date: date,
      title,
      category: cat,
      hours_spent: parseFloat(hours),
      description: desc,
      status: status || 'Pending',
      manager_comment: null
    };
    inMemoryStore.activities.unshift(newActivity);
    return { insertId: newId, affectedRows: 1 };
  }
  if (normalizedSql.startsWith('update activities set status =')) {
    const status = params[0];
    const comment = params[1];
    const id = parseInt(params[2], 10);
    const act = inMemoryStore.activities.find(a => a.id === id);
    if (act) {
      act.status = status;
      act.manager_comment = comment;
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // 5. Tickets Queries
  if (normalizedSql.includes('from tickets')) {
    if (normalizedSql.includes('where user_id =')) {
      const userId = parseInt(params[0], 10);
      return inMemoryStore.tickets.filter(t => t.user_id === userId);
    }
    return inMemoryStore.tickets;
  }
  if (normalizedSql.startsWith('insert into tickets')) {
    const newId = inMemoryStore.tickets.length + 1;
    const [code, userId, title, desc, cat, priority] = params;
    const newTicket = {
      id: newId,
      ticket_code: code || `TCK-${1000 + newId}`,
      user_id: parseInt(userId, 10),
      title,
      description: desc,
      category: cat,
      priority: priority || 'Medium',
      status: 'Open',
      assigned_to: 'Alex Carter'
    };
    inMemoryStore.tickets.unshift(newTicket);
    return { insertId: newId, affectedRows: 1 };
  }
  if (normalizedSql.startsWith('update tickets set status =')) {
    const status = params[0];
    const id = parseInt(params[1], 10);
    const tck = inMemoryStore.tickets.find(t => t.id === id);
    if (tck) {
      tck.status = status;
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  return [];
}

module.exports = {
  initDatabase,
  query,
  inMemoryStore,
  get isMySQLConnected() { return useMySQL; }
};
