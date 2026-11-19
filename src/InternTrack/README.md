# InternTrack – Internship Activity & Ticket Management System

**InternTrack** is a full-stack web application designed for engineering cohorts, educational institutions, and corporate internship programs. It provides complete end-to-end tracking of daily intern activity submissions, issue ticket resolution with SLA monitoring, manager approvals, tamper-proof certificate verification, and analytics reports.

---

## 📁 Project Structure

```
InternTrack/
├── frontend/
│   ├── assets/                       # UI mockups, icons, and SVG visual previews
│   │   ├── step1_home.jpg
│   │   ├── step2_services.jpg
│   │   ├── step3_certificate.svg
│   │   ├── step4_login.jpg
│   │   ├── step5_manager_dashboard.jpg
│   │   ├── step6_staff_dashboard.jpg
│   │   ├── step7_daily_activities.jpg
│   │   ├── step8_reports_graphs.svg
│   │   └── step9_logout.svg
│   ├── css/
│   │   └── style.css                 # Unified Blue & White design system
│   ├── js/
│   │   ├── main.js                   # Universal API caller, toasts, session helper
│   │   ├── home.js                   # Animated metrics & health check
│   │   ├── services.js               # Dynamic services catalog
│   │   ├── certificate.js            # Live digital verification lookup
│   │   ├── auth.js                   # Role-based login & credential switch
│   │   ├── manager.js                # Manager KPI stats, ticket & activity reviews
│   │   ├── staff.js                  # Staff overview, hours, ticket raising
│   │   ├── activities.js             # Daily activity form & filtered log
│   │   ├── reports.js                # Canvas analytics charts
│   │   └── logout.js                 # Session termination & auto-redirect
│   ├── index.html                    # 1. Home Page
│   ├── services.html                 # 2. Services Page
│   ├── certificate.html              # 3. Certificate Verification Page
│   ├── login.html                    # 4. Login Page
│   ├── manager-dashboard.html        # 5. Manager Dashboard
│   ├── staff-dashboard.html          # 6. Staff Dashboard
│   ├── daily-activities.html         # 7. Daily Activities Page
│   ├── reports.html                  # 8. Reports & Graphs Page
│   └── logout.html                   # 9. Logout Confirmation Page
└── backend/
    ├── config/
    │   └── db.js                     # MySQL connection pool with resilient fallback
    ├── schema.sql                    # Complete relational database schema & seed data
    ├── server.js                     # REST API server & static file host (Port 5000)
    └── package.json                  # Dependencies: Express, MySQL2, CORS, Dotenv
```

---

## 🚀 Quick Start Guide

### 1. Start the Backend Server
In VS Code or terminal:
```bash
cd "d:/React project/frontend/src/InternTrack/backend"
node server.js
```
The server will start on `http://localhost:5000` and automatically serve the frontend!

### 2. Open the Website in Your Browser
Open your browser and navigate to:
```
http://localhost:5000/index.html
```
*(Or double-click `frontend/index.html` directly in VS Code)*

---

## 🗄️ MySQL Database Setup (Optional & Recommended)

1. Open MySQL CLI or phpMyAdmin.
2. Import the database schema and sample records:
```bash
mysql -u root -p < schema.sql
```
This creates the database `interntrack_db` with all tables (`users`, `activities`, `tickets`, `certificates`, `services`) pre-populated with active seed data.

---

## 🔑 Demo Login Accounts

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Manager / Admin** | `manager@interntrack.com` | `manager123` | Manager Dashboard, Review Activities, Resolve Tickets |
| **Staff / Intern** | `intern@interntrack.com` | `intern123` | Staff Dashboard, Daily Activity Submissions, Ticket Raiser |

---

## 📜 Verified Certificate Sample ID
To test the live verification engine, visit `certificate.html` and search:
```
IT-2026-8942
```
This displays the official verified credential for **Sarah Jenkins** in Full-Stack Software Engineering.
