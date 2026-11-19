-- ========================================================
-- InternTrack – Internship Activity & Ticket Management System
-- Complete MySQL Database Schema and Seed Data
-- ========================================================

CREATE DATABASE IF NOT EXISTS interntrack_db;
USE interntrack_db;

-- 1. Users Table (Managers & Intern Staff)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('manager', 'staff') NOT NULL DEFAULT 'staff',
    department VARCHAR(100) DEFAULT 'Software Development',
    avatar_url VARCHAR(255) DEFAULT 'assets/avatar_default.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Daily Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_date DATE NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(80) NOT NULL,
    hours_spent DECIMAL(4,2) NOT NULL DEFAULT 8.00,
    description TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    manager_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Support Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_code VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(80) NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    assigned_to VARCHAR(100) DEFAULT 'Alex Carter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Verified Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cert_code VARCHAR(60) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    intern_name VARCHAR(120) NOT NULL,
    course_title VARCHAR(180) NOT NULL,
    grade VARCHAR(30) DEFAULT 'Distinction',
    total_hours INT DEFAULT 240,
    issue_date DATE NOT NULL,
    qr_data VARCHAR(255),
    status ENUM('Issued', 'Verified', 'Revoked') DEFAULT 'Verified',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Enterprise Services Catalog
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(80) NOT NULL,
    icon VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'Active'
);

-- ========================================================
-- Seed Initial Sample Data
-- ========================================================

-- Seed Users
INSERT INTO users (id, name, email, password, role, department) VALUES
(1, 'Alex Carter', 'manager@interntrack.com', 'manager123', 'manager', 'Engineering Leadership'),
(2, 'Sarah Jenkins', 'intern@interntrack.com', 'intern123', 'staff', 'Full-Stack Development'),
(3, 'David Kim', 'david@interntrack.com', 'david123', 'staff', 'Cloud DevOps'),
(4, 'Priya Sharma', 'priya@interntrack.com', 'priya123', 'staff', 'Data Science & AI')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Services
INSERT INTO services (id, title, category, icon, description) VALUES
(1, 'Daily Activity & Timesheet Logging', 'Core Tracking', '📝', 'Comprehensive daily task submission with hours tracking, task category tagging, and automatic submission logs.'),
(2, 'Ticket & Issue Management', 'Workflow & Support', '🎫', 'Raise and track blockers, hardware queries, guidance requests, and technical tickets with priority tags and SLA status.'),
(3, 'Manager Review & Approvals', 'Supervision', '✅', 'Real-time dashboard for supervisors to approve daily submissions, inspect weekly metrics, and leave mentorship feedback.'),
(4, 'Verified Digital Certificates', 'Certification', '📜', 'Tamper-proof verifiable internship completion certificates with instant online code search and official seal.'),
(5, 'Live Analytics & Reports', 'Insights', '📈', 'Comprehensive charts showing velocity, attendance percentage, hours worked, and department-wide performance.'),
(6, 'Role-Based Access Control', 'Security', '🔐', 'Separate secure interfaces for Management, Academic Coordinators, and Intern Staff with session management.')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Seed Activities
INSERT INTO activities (id, user_id, activity_date, title, category, hours_spent, description, status, manager_comment) VALUES
(1, 2, '2026-11-15', 'Implemented User Authentication & JWT Flow', 'Backend Development', 7.5, 'Designed login controller, password hashing with bcrypt, and session validation middleware.', 'Approved', 'Great job adhering to clean code standards.'),
(2, 2, '2026-11-16', 'Built Manager Dashboard UI & KPI Cards', 'Frontend Development', 8.0, 'Constructed responsive layout in HTML/CSS with flexbox, metric summary cards, and ticket list.', 'Approved', 'Visual alignment is sharp and matches specifications.'),
(3, 2, '2026-11-17', 'Configured MySQL Database Pool & Migrations', 'Database Architecture', 6.5, 'Created schema with relational foreign keys for users, activities, tickets, and certificates.', 'Approved', 'Well structured relational model.'),
(4, 2, '2026-11-18', 'Developed Reports & Analytics Chart View', 'Frontend Development', 8.0, 'Integrated canvas data visualizations for weekly velocity and SLA resolution ratios.', 'Pending', NULL),
(5, 3, '2026-11-18', 'Set up Docker container and CI/CD pipelines', 'DevOps & Infrastructure', 7.0, 'Wrote multi-stage Dockerfile and GitHub Actions workflow for staging builds.', 'Pending', NULL)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Seed Tickets
INSERT INTO tickets (id, ticket_code, user_id, title, description, category, priority, status, assigned_to) VALUES
(1, 'TCK-1001', 2, 'Database pool timeout during concurrent load tests', 'Connection dropped after 10 simultaneous queries; need pool config adjustment.', 'Database', 'High', 'Resolved', 'Alex Carter'),
(2, 'TCK-1002', 2, 'Requesting access to Staging AWS S3 bucket', 'Need upload credentials to test certificate PDF generation and asset storage.', 'Cloud Infrastructure', 'Medium', 'In Progress', 'Alex Carter'),
(3, 'TCK-1003', 3, 'Docker daemon permission error on staging VM', 'Permission denied when running docker-compose up; user group needs update.', 'DevOps', 'Urgent', 'Open', 'Alex Carter'),
(4, 'TCK-1004', 4, 'Pandas data frame memory leak in analytics job', 'Batch report generator runs out of memory on 100k test records.', 'Bug Fix', 'Medium', 'Open', 'Alex Carter')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Seed Verified Certificate
INSERT INTO certificates (id, cert_code, user_id, intern_name, course_title, grade, total_hours, issue_date, qr_data, status) VALUES
(1, 'IT-2026-8942', 2, 'Sarah Jenkins', 'Full-Stack Software Engineering & Ticket Resolution Track', 'Distinction', 240, '2026-11-15', 'https://interntrack.local/certificate.html?id=IT-2026-8942', 'Verified')
ON DUPLICATE KEY UPDATE cert_code=VALUES(cert_code);
