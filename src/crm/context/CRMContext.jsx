import React, { createContext, useContext, useState, useEffect } from 'react';
import crmApiService from '../../services/api';

const CRMContext = createContext();

// =========================================================================
// 1. INITIAL REALISTIC SAMPLE COURSES (Section 6)
// =========================================================================
const INITIAL_COURSES = [
  {
    id: 'CRS-01',
    name: 'Full Stack Development',
    category: 'Full Stack',
    duration: '6 Months',
    fee: 35000,
    status: 'Active',
    enrolledCount: 148,
    modulesCount: 24,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    description: 'Enterprise full stack program covering React 19, Node.js, Express, PostgreSQL, Docker, Redis, and Cloud Deployment.'
  },
  {
    id: 'CRS-02',
    name: 'Frontend Development',
    category: 'Web Development',
    duration: '4 Months',
    fee: 25000,
    status: 'Active',
    enrolledCount: 112,
    modulesCount: 18,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    description: 'Modern UI/UX engineering with HTML5, CSS3/Tailwind, JavaScript ESNext, React, Vite, and responsive accessibility design.'
  },
  {
    id: 'CRS-03',
    name: 'Backend Development',
    category: 'Backend & Cloud',
    duration: '5 Months',
    fee: 28000,
    status: 'Active',
    enrolledCount: 94,
    modulesCount: 20,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    description: 'Scalable REST & GraphQL APIs, microservices, authentication systems, database tuning, caching, and CI/CD pipelines.'
  },
  {
    id: 'CRS-04',
    name: 'Python Programming',
    category: 'Programming & Data',
    duration: '3 Months',
    fee: 20000,
    status: 'Active',
    enrolledCount: 135,
    modulesCount: 16,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Core to advanced Python, OOP principles, FastAPI web services, automated data parsing, web scraping, and scripting.'
  },
  {
    id: 'CRS-05',
    name: 'Java Programming',
    category: 'Enterprise Software',
    duration: '4 Months',
    fee: 24000,
    status: 'Active',
    enrolledCount: 88,
    modulesCount: 18,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    description: 'Core Java, Spring Boot microservices, Hibernate/JPA, design patterns, multi-threading, and enterprise application testing.'
  },
  {
    id: 'CRS-06',
    name: 'UI/UX Design',
    category: 'Product Design',
    duration: '3 Months',
    fee: 22000,
    status: 'Active',
    enrolledCount: 76,
    modulesCount: 14,
    image: 'https://images.unsplash.com/photo-1581291518655-9523c93269c4?auto=format&fit=crop&w=600&q=80',
    description: 'Design thinking, user research, wireframing, high-fidelity Figma prototyping, design systems, usability testing.'
  },
  {
    id: 'CRS-07',
    name: 'Web Development',
    category: 'Web Development',
    duration: '3 Months',
    fee: 18000,
    status: 'Active',
    enrolledCount: 104,
    modulesCount: 15,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    description: 'Practical foundation in web architecture, semantic markup, modern CSS grid/flexbox, JavaScript DOM, and API consumption.'
  }
];

// =========================================================================
// 2. INITIAL REALISTIC MENTORS (Section 14)
// =========================================================================
const INITIAL_MENTORS = [
  {
    id: 'MTR-01',
    name: 'Rajesh K. Sharma',
    email: 'rajesh.sharma@aritcompany.com',
    specialization: 'Full Stack & Cloud Architecture',
    assignedCourse: 'Full Stack Development',
    activeStudentsCount: 18,
    phone: '+91 98450 11223',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    experience: '8+ Years'
  },
  {
    id: 'MTR-02',
    name: 'Pooja Sundaram',
    email: 'pooja.s@aritcompany.com',
    specialization: 'React & Modern Frontend Architecture',
    assignedCourse: 'Frontend Development',
    activeStudentsCount: 14,
    phone: '+91 97422 33445',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    experience: '6+ Years'
  },
  {
    id: 'MTR-03',
    name: 'Vikramaditya Verma',
    email: 'vikram.verma@aritcompany.com',
    specialization: 'Python & Distributed Systems',
    assignedCourse: 'Python Programming',
    activeStudentsCount: 16,
    phone: '+91 99001 55667',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    experience: '9+ Years'
  },
  {
    id: 'MTR-04',
    name: 'Anjali Deshmukh',
    email: 'anjali.d@aritcompany.com',
    specialization: 'UI/UX & Product Design Systems',
    assignedCourse: 'UI/UX Design',
    activeStudentsCount: 12,
    phone: '+91 98866 77889',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    experience: '7+ Years'
  },
  {
    id: 'MTR-05',
    name: 'Siddharth Menon',
    email: 'siddharth.m@aritcompany.com',
    specialization: 'Java Enterprise & Spring Boot',
    assignedCourse: 'Java Programming',
    activeStudentsCount: 15,
    phone: '+91 98112 99001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    experience: '10+ Years'
  }
];

// =========================================================================
// 3. INITIAL REALISTIC STUDENTS (Section 5)
// =========================================================================
const INITIAL_STUDENTS = [
  {
    id: 'ARIT-2026-STU01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98451 23456',
    address: '42, Brigade Road, Shanthi Nagar, Bangalore - 560025',
    course: 'Full Stack Development',
    registrationDate: '2026-06-10',
    internshipStatus: 'Completed',
    duration: '6 Months',
    attendance: 96,
    progress: 100,
    feeStatus: 'Paid',
    totalFee: 35000,
    paidAmount: 35000,
    pendingAmount: 0,
    tasksCompleted: 45,
    totalTasks: 45,
    mentor: 'Rajesh K. Sharma',
    college: 'RV College of Engineering',
    certificateId: 'ARIT-CERT-2026-0101',
    certificateIssued: true,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    mode: 'Hybrid (Bangalore Campus + Online)'
  },
  {
    id: 'ARIT-2026-STU02',
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 98123 78901',
    address: '15, Navrangpura, Ahmedabad, Gujarat - 380009',
    course: 'Frontend Development',
    registrationDate: '2026-07-01',
    internshipStatus: 'Active',
    duration: '4 Months',
    attendance: 92,
    progress: 80,
    feeStatus: 'Paid',
    totalFee: 25000,
    paidAmount: 25000,
    pendingAmount: 0,
    tasksCompleted: 32,
    totalTasks: 40,
    mentor: 'Pooja Sundaram',
    college: 'Nirma University',
    certificateId: null,
    certificateIssued: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    mode: 'Online Live'
  },
  {
    id: 'ARIT-2026-STU03',
    name: 'Rohan Kulkarni',
    email: 'rohan.kulkarni@example.com',
    phone: '+91 99234 56789',
    address: '88, Kothrud, Pune, Maharashtra - 411038',
    course: 'Python Programming',
    registrationDate: '2026-07-15',
    internshipStatus: 'Active',
    duration: '3 Months',
    attendance: 88,
    progress: 75,
    feeStatus: 'Partially Paid',
    totalFee: 20000,
    paidAmount: 12000,
    pendingAmount: 8000,
    tasksCompleted: 26,
    totalTasks: 35,
    mentor: 'Vikramaditya Verma',
    college: 'COEP Technological University',
    certificateId: null,
    certificateIssued: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    mode: 'Hybrid (Bangalore Campus + Online)'
  },
  {
    id: 'ARIT-2026-STU04',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@example.com',
    phone: '+91 97441 23890',
    address: '104, Panampilly Nagar, Kochi, Kerala - 682036',
    course: 'UI/UX Design',
    registrationDate: '2026-08-01',
    internshipStatus: 'Active',
    duration: '3 Months',
    attendance: 95,
    progress: 88,
    feeStatus: 'Paid',
    totalFee: 22000,
    paidAmount: 22000,
    pendingAmount: 0,
    tasksCompleted: 28,
    totalTasks: 32,
    mentor: 'Anjali Deshmukh',
    college: 'Amrita Vishwa Vidyapeetham',
    certificateId: null,
    certificateIssued: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    mode: 'Online Live'
  },
  {
    id: 'ARIT-2026-STU05',
    name: 'Aditya Srivastava',
    email: 'aditya.s@example.com',
    phone: '+91 96500 44321',
    address: 'C-12, Sector 62, Noida, Uttar Pradesh - 201309',
    course: 'Java Programming',
    registrationDate: '2026-06-20',
    internshipStatus: 'Completed',
    duration: '4 Months',
    attendance: 98,
    progress: 100,
    feeStatus: 'Paid',
    totalFee: 24000,
    paidAmount: 24000,
    pendingAmount: 0,
    tasksCompleted: 40,
    totalTasks: 40,
    mentor: 'Siddharth Menon',
    college: 'IIT Roorkee',
    certificateId: 'ARIT-CERT-2026-0102',
    certificateIssued: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    mode: 'Hybrid (Bangalore Campus + Online)'
  },
  {
    id: 'ARIT-2026-STU06',
    name: 'Kavya Ramanathan',
    email: 'kavya.r@example.com',
    phone: '+91 94440 88990',
    address: '22, Gandhi Nagar, Adyar, Chennai, Tamil Nadu - 600020',
    course: 'Backend Development',
    registrationDate: '2026-08-10',
    internshipStatus: 'Active',
    duration: '5 Months',
    attendance: 90,
    progress: 60,
    feeStatus: 'Partially Paid',
    totalFee: 28000,
    paidAmount: 18000,
    pendingAmount: 10000,
    tasksCompleted: 24,
    totalTasks: 40,
    mentor: 'Rajesh K. Sharma',
    college: 'Anna University',
    certificateId: null,
    certificateIssued: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    mode: 'Online Live'
  },
  {
    id: 'ARIT-2026-STU07',
    name: 'Varun Teja',
    email: 'varun.teja@example.com',
    phone: '+91 99890 12345',
    address: '77, Jubilee Hills, Hyderabad, Telangana - 500033',
    course: 'Web Development',
    registrationDate: '2026-09-01',
    internshipStatus: 'Pending',
    duration: '3 Months',
    attendance: 0,
    progress: 10,
    feeStatus: 'Pending',
    totalFee: 18000,
    paidAmount: 0,
    pendingAmount: 18000,
    tasksCompleted: 2,
    totalTasks: 30,
    mentor: 'Unassigned',
    college: 'Osmania University',
    certificateId: null,
    certificateIssued: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    mode: 'Online Live'
  },
  {
    id: 'ARIT-2026-STU08',
    name: 'Priyanka Sen',
    email: 'priyanka.sen@example.com',
    phone: '+91 98300 66778',
    address: '35, Salt Lake Sector V, Kolkata, West Bengal - 700091',
    course: 'Full Stack Development',
    registrationDate: '2026-08-15',
    internshipStatus: 'Active',
    duration: '6 Months',
    attendance: 94,
    progress: 65,
    feeStatus: 'Paid',
    totalFee: 35000,
    paidAmount: 35000,
    pendingAmount: 0,
    tasksCompleted: 30,
    totalTasks: 45,
    mentor: 'Rajesh K. Sharma',
    college: 'Jadavpur University',
    certificateId: null,
    certificateIssued: false,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    mode: 'Hybrid (Bangalore Campus + Online)'
  }
];

// =========================================================================
// 4. INITIAL INTERNSHIP APPLICATIONS (Section 7)
// =========================================================================
const INITIAL_INTERNSHIPS = [
  {
    id: 'INT-APP-101',
    studentId: 'ARIT-2026-STU01',
    studentName: 'Aarav Sharma',
    course: 'Full Stack Development',
    startDate: '2026-06-15',
    endDate: '2026-11-20',
    mentor: 'Rajesh K. Sharma',
    status: 'Completed',
    college: 'RV College of Engineering',
    appliedDate: '2026-06-08',
    evaluationGrade: 'A+ (Distinction)',
    notes: 'Outstanding final project on Microservices Architecture with Docker & Kubernetes.'
  },
  {
    id: 'INT-APP-102',
    studentId: 'ARIT-2026-STU02',
    studentName: 'Sneha Patel',
    course: 'Frontend Development',
    startDate: '2026-07-05',
    endDate: '2026-11-30',
    mentor: 'Pooja Sundaram',
    status: 'Ongoing',
    college: 'Nirma University',
    appliedDate: '2026-06-25',
    evaluationGrade: 'A',
    notes: 'Excellent design component library implementation in Tailwind & React.'
  },
  {
    id: 'INT-APP-103',
    studentId: 'ARIT-2026-STU03',
    studentName: 'Rohan Kulkarni',
    course: 'Python Programming',
    startDate: '2026-07-20',
    endDate: '2026-10-30',
    mentor: 'Vikramaditya Verma',
    status: 'Ongoing',
    college: 'COEP Technological University',
    appliedDate: '2026-07-10',
    evaluationGrade: 'B+',
    notes: 'Completing FastAPI microservices backend module.'
  },
  {
    id: 'INT-APP-104',
    studentId: 'ARIT-2026-STU04',
    studentName: 'Meera Nambiar',
    course: 'UI/UX Design',
    startDate: '2026-08-05',
    endDate: '2026-11-15',
    mentor: 'Anjali Deshmukh',
    status: 'Ongoing',
    college: 'Amrita Vishwa Vidyapeetham',
    appliedDate: '2026-07-28',
    evaluationGrade: 'A+',
    notes: 'Designed mobile banking application prototype with 95% user satisfaction.'
  },
  {
    id: 'INT-APP-105',
    studentId: 'ARIT-2026-STU05',
    studentName: 'Aditya Srivastava',
    course: 'Java Programming',
    startDate: '2026-06-25',
    endDate: '2026-10-28',
    mentor: 'Siddharth Menon',
    status: 'Completed',
    college: 'IIT Roorkee',
    appliedDate: '2026-06-18',
    evaluationGrade: 'A+ (Distinction)',
    notes: 'Delivered Spring Boot enterprise order processing system with JUnit testing.'
  },
  {
    id: 'INT-APP-106',
    studentId: 'ARIT-2026-STU07',
    studentName: 'Varun Teja',
    course: 'Web Development',
    startDate: '2026-12-01',
    endDate: '2027-02-28',
    mentor: 'Unassigned',
    status: 'New Application',
    college: 'Osmania University',
    appliedDate: '2026-09-01',
    evaluationGrade: 'Under Review',
    notes: 'Application submitted via AR IT COMPANY Internship Portal. Awaiting mentor assignment.'
  },
  {
    id: 'INT-APP-107',
    studentId: 'ARIT-2026-STU09',
    studentName: 'Deepak Roy',
    course: 'Full Stack Development',
    startDate: '2026-11-20',
    endDate: '2027-05-20',
    mentor: 'Rajesh K. Sharma',
    status: 'Approved',
    college: 'BITS Pilani',
    appliedDate: '2026-11-10',
    evaluationGrade: 'Eligible',
    notes: 'Passed initial technical screening. Induction scheduled for next Monday.'
  },
  {
    id: 'INT-APP-108',
    studentId: 'ARIT-2026-STU10',
    studentName: 'Monika Chawla',
    course: 'UI/UX Design',
    startDate: '-',
    endDate: '-',
    mentor: 'None',
    status: 'Rejected',
    college: 'Delhi University',
    appliedDate: '2026-10-05',
    evaluationGrade: 'Incomplete',
    notes: 'Prerequisites not met; advised to retake portfolio workshop.'
  }
];

// =========================================================================
// 5. INITIAL DAILY ACTIVITIES (Section 8)
// =========================================================================
const INITIAL_DAILY_ACTIVITIES = [
  {
    id: 'ACT-01',
    studentName: 'Aarav Sharma',
    studentId: 'ARIT-2026-STU01',
    course: 'Full Stack Development',
    dayNumber: 'Day 1',
    activityDate: '2026-11-15',
    taskTitle: 'Day 1 – HTML Introduction',
    workDescription: 'Configured development environment, created semantic markup for AR IT corporate portal header, hero section, and accessible forms.',
    taskStatus: 'Approved',
    mentorFeedback: 'Well structured semantic elements. Excellent use of meta viewport and ARIA landmarks.',
    mentorName: 'Rajesh K. Sharma'
  },
  {
    id: 'ACT-02',
    studentName: 'Sneha Patel',
    studentId: 'ARIT-2026-STU02',
    course: 'Frontend Development',
    dayNumber: 'Day 2',
    activityDate: '2026-11-16',
    taskTitle: 'Day 2 – CSS Fundamentals',
    workDescription: 'Developed responsive Flexbox grid and media queries for tablet & mobile views. Integrated CSS custom variables for dark/light themes.',
    taskStatus: 'Approved',
    mentorFeedback: 'Clean typography and responsive break-points match Figma guidelines accurately.',
    mentorName: 'Pooja Sundaram'
  },
  {
    id: 'ACT-03',
    studentName: 'Rohan Kulkarni',
    studentId: 'ARIT-2026-STU03',
    course: 'Python Programming',
    dayNumber: 'Day 3',
    activityDate: '2026-11-17',
    taskTitle: 'Day 3 – JavaScript Basics',
    workDescription: 'Implemented asynchronous data fetching with ES6 promises, error handling with try/catch blocks, and localStorage state synchronization.',
    taskStatus: 'Approved',
    mentorFeedback: 'Good error handling. Added comments for debounced search logic.',
    mentorName: 'Vikramaditya Verma'
  },
  {
    id: 'ACT-04',
    studentName: 'Sneha Patel',
    studentId: 'ARIT-2026-STU02',
    course: 'Frontend Development',
    dayNumber: 'Day 4',
    activityDate: '2026-11-18',
    taskTitle: 'Day 4 – React Introduction',
    workDescription: 'Architected reusable UI components: StatCard, Badge, FilterDropdown, and Modal. Handled props drilling using React Context API.',
    taskStatus: 'Pending Review',
    mentorFeedback: 'In review. Checking component re-render performance with memoization.',
    mentorName: 'Pooja Sundaram'
  },
  {
    id: 'ACT-05',
    studentName: 'Aarav Sharma',
    studentId: 'ARIT-2026-STU01',
    course: 'Full Stack Development',
    dayNumber: 'Day 5',
    activityDate: '2026-11-19',
    taskTitle: 'Day 5 – Mini Project Development',
    workDescription: 'Built full end-to-end Student Registration feature connected with local REST mock API. Included client-side form validation and toast alerts.',
    taskStatus: 'Approved',
    mentorFeedback: 'Outstanding delivery! Production-ready code quality and flawless UX.',
    mentorName: 'Rajesh K. Sharma'
  },
  {
    id: 'ACT-06',
    studentName: 'Kavya Ramanathan',
    studentId: 'ARIT-2026-STU06',
    course: 'Backend Development',
    dayNumber: 'Day 6',
    activityDate: '2026-11-20',
    taskTitle: 'Day 6 – REST API Integration',
    workDescription: 'Designed CRUD endpoints for students and courses with JWT bearer authentication and role-based permissions middleware.',
    taskStatus: 'Needs Revision',
    mentorFeedback: 'Please ensure bcrypt salt rounds are at least 10 and return sanitized JSON omitting password fields.',
    mentorName: 'Rajesh K. Sharma'
  }
];

// =========================================================================
// 6. INITIAL ATTENDANCE RECORDS (Section 9)
// =========================================================================
const INITIAL_ATTENDANCE = [
  { studentId: 'ARIT-2026-STU01', studentName: 'Aarav Sharma', course: 'Full Stack Development', date: '2026-11-25', status: 'Present', markedAt: '09:05 AM' },
  { studentId: 'ARIT-2026-STU02', studentName: 'Sneha Patel', course: 'Frontend Development', date: '2026-11-25', status: 'Present', markedAt: '09:12 AM' },
  { studentId: 'ARIT-2026-STU03', studentName: 'Rohan Kulkarni', course: 'Python Programming', date: '2026-11-25', status: 'Leave', markedAt: '08:45 AM', reason: 'Medical Checkup' },
  { studentId: 'ARIT-2026-STU04', studentName: 'Meera Nambiar', course: 'UI/UX Design', date: '2026-11-25', status: 'Present', markedAt: '09:00 AM' },
  { studentId: 'ARIT-2026-STU05', studentName: 'Aditya Srivastava', course: 'Java Programming', date: '2026-11-25', status: 'Present', markedAt: '09:10 AM' },
  { studentId: 'ARIT-2026-STU06', studentName: 'Kavya Ramanathan', course: 'Backend Development', date: '2026-11-25', status: 'Absent', markedAt: '10:00 AM' },
  { studentId: 'ARIT-2026-STU07', studentName: 'Varun Teja', course: 'Web Development', date: '2026-11-25', status: 'Leave', markedAt: '08:30 AM', reason: 'College Semester Exam' },
  { studentId: 'ARIT-2026-STU08', studentName: 'Priyanka Sen', course: 'Full Stack Development', date: '2026-11-25', status: 'Present', markedAt: '09:18 AM' }
];

// =========================================================================
// 7. INITIAL PAYMENTS (Section 11)
// =========================================================================
const INITIAL_PAYMENTS = [
  {
    id: 'TXN-ARIT-8901',
    studentId: 'ARIT-2026-STU01',
    studentName: 'Aarav Sharma',
    course: 'Full Stack Development',
    courseFee: 35000,
    amountPaid: 35000,
    pendingAmount: 0,
    paymentDate: '2026-06-10',
    paymentStatus: 'Paid',
    method: 'UPI / NetBanking',
    receiptNo: 'REC-2026-001'
  },
  {
    id: 'TXN-ARIT-8902',
    studentId: 'ARIT-2026-STU02',
    studentName: 'Sneha Patel',
    course: 'Frontend Development',
    courseFee: 25000,
    amountPaid: 25000,
    pendingAmount: 0,
    paymentDate: '2026-07-01',
    paymentStatus: 'Paid',
    method: 'Credit Card / Razorpay',
    receiptNo: 'REC-2026-002'
  },
  {
    id: 'TXN-ARIT-8903',
    studentId: 'ARIT-2026-STU03',
    studentName: 'Rohan Kulkarni',
    course: 'Python Programming',
    courseFee: 20000,
    amountPaid: 12000,
    pendingAmount: 8000,
    paymentDate: '2026-07-15',
    paymentStatus: 'Partially Paid',
    method: 'UPI Transfer',
    receiptNo: 'REC-2026-003'
  },
  {
    id: 'TXN-ARIT-8904',
    studentId: 'ARIT-2026-STU04',
    studentName: 'Meera Nambiar',
    course: 'UI/UX Design',
    courseFee: 22000,
    amountPaid: 22000,
    pendingAmount: 0,
    paymentDate: '2026-08-01',
    paymentStatus: 'Paid',
    method: 'Debit Card',
    receiptNo: 'REC-2026-004'
  },
  {
    id: 'TXN-ARIT-8905',
    studentId: 'ARIT-2026-STU06',
    studentName: 'Kavya Ramanathan',
    course: 'Backend Development',
    courseFee: 28000,
    amountPaid: 18000,
    pendingAmount: 10000,
    paymentDate: '2026-08-10',
    paymentStatus: 'Partially Paid',
    method: 'Net Banking',
    receiptNo: 'REC-2026-005'
  },
  {
    id: 'TXN-ARIT-8906',
    studentId: 'ARIT-2026-STU07',
    studentName: 'Varun Teja',
    course: 'Web Development',
    courseFee: 18000,
    amountPaid: 0,
    pendingAmount: 18000,
    paymentDate: '2026-09-01',
    paymentStatus: 'Pending',
    method: 'Awaiting Payment',
    receiptNo: '-'
  }
];

// =========================================================================
// 8. INITIAL CERTIFICATES (Section 12)
// =========================================================================
const INITIAL_CERTIFICATES = [
  {
    id: 'ARIT-CERT-2026-0101',
    studentId: 'ARIT-2026-STU01',
    studentName: 'Aarav Sharma',
    courseName: 'Full Stack Development',
    duration: '6 Months (June 2026 – November 2026)',
    issueDate: '2026-11-20',
    theme: 'navy', // 'pink' | 'purple' | 'navy'
    grade: 'A+ (Distinction)',
    authorizedSignatory: 'Dr. Maya Raman (Managing Director)',
    technicalLead: 'Rajesh K. Sharma (Technical Head)',
    company: 'AR IT COMPANY',
    verificationCode: 'ARIT-VERIFY-0101',
    skills: 'React 19, Node.js, Express, PostgreSQL, Docker, Microservices'
  },
  {
    id: 'ARIT-CERT-2026-0102',
    studentId: 'ARIT-2026-STU05',
    studentName: 'Aditya Srivastava',
    courseName: 'Java Programming',
    duration: '4 Months (June 2026 – October 2026)',
    issueDate: '2026-10-28',
    theme: 'purple',
    grade: 'A+ (Distinction)',
    authorizedSignatory: 'Dr. Maya Raman (Managing Director)',
    technicalLead: 'Siddharth Menon (Technical Lead)',
    company: 'AR IT COMPANY',
    verificationCode: 'ARIT-VERIFY-0102',
    skills: 'Java 21, Spring Boot, Hibernate, REST APIs, Microservices, JUnit'
  }
];

// =========================================================================
// 9. INITIAL NOTIFICATIONS (Section 16)
// =========================================================================
const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    type: 'registration',
    title: 'New Student Registration',
    message: 'Varun Teja registered for Web Development course via online portal.',
    timestamp: '15 minutes ago',
    unread: true,
    link: '/students'
  },
  {
    id: 'NOTIF-02',
    type: 'activity',
    title: 'Daily Activity Submitted',
    message: 'Sneha Patel submitted Day 4 – React Introduction for review.',
    timestamp: '45 minutes ago',
    unread: true,
    link: '/daily-activities'
  },
  {
    id: 'NOTIF-03',
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of ₹22,000 received from Meera Nambiar for UI/UX Design.',
    timestamp: '2 hours ago',
    unread: false,
    link: '/payments'
  },
  {
    id: 'NOTIF-04',
    type: 'internship',
    title: 'Internship Completed',
    message: 'Aarav Sharma completed 6-month Full Stack internship with Distinction.',
    timestamp: '1 day ago',
    unread: false,
    link: '/certificates'
  },
  {
    id: 'NOTIF-05',
    type: 'application',
    title: 'New Internship Application',
    message: 'Deepak Roy submitted internship application for Full Stack Development.',
    timestamp: '2 days ago',
    unread: false,
    link: '/internships'
  }
];

// =========================================================================
// 10. INITIAL COMMUNICATIONS (Section 13)
// =========================================================================
const INITIAL_COMMUNICATIONS = [
  {
    id: 'COMM-01',
    title: 'Final Capstone Project Evaluation Schedule',
    category: 'Internship Announcements',
    targetAudience: 'All Active Interns (Cohort 2026)',
    sentDate: '2026-11-20',
    sentBy: 'Dr. Maya Raman',
    status: 'Sent',
    content: 'All interns scheduled for December evaluation must submit their final GitHub repository links and deployment URLs by Friday 5:00 PM.'
  },
  {
    id: 'COMM-02',
    title: 'Upcoming Tech Webinar: Microservices with Docker & Kubernetes',
    category: 'Course Announcements',
    targetAudience: 'Full Stack & Backend Development Batches',
    sentDate: '2026-11-18',
    sentBy: 'Rajesh K. Sharma',
    status: 'Sent',
    content: 'Join our senior lead architect for an intensive 2-hour live session on container orchestration and cloud architecture.'
  },
  {
    id: 'COMM-03',
    title: 'Daily Activity Log Reminder',
    category: 'Activity Reminders',
    targetAudience: 'All Cohorts',
    sentDate: '2026-11-24',
    sentBy: 'System Automation',
    status: 'Sent',
    content: 'Reminder: Daily internship activity logs must be submitted before 8:00 PM every working day for mentor review.'
  },
  {
    id: 'COMM-04',
    title: 'Tuition Fee Balance Clearance Notice',
    category: 'Payment Reminders',
    targetAudience: 'Students with Pending Balances',
    sentDate: '2026-11-15',
    sentBy: 'Accounts Department',
    status: 'Sent',
    content: 'Kindly clear any pending course installment balances to ensure uninterrupted access to the internship lab and certification.'
  }
];

// =========================================================================
// CRM PROVIDER COMPONENT
// =========================================================================
export const CRMProvider = ({ children }) => {
  // 1. Current Session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const auth = localStorage.getItem('arit_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        return {
          name: parsed.name || 'Dr. Maya Raman',
          role: parsed.role || 'Senior IT Director',
          email: parsed.email || 'admin@aritcompany.com',
          avatar: parsed.avatar || (parsed.userType === 'mentor'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'),
          company: 'AR IT COMPANY',
          userType: parsed.userType || 'admin',
          assignedCourse: parsed.assignedCourse || null
        };
      }
      const saved = localStorage.getItem('arit_user');
      return saved ? JSON.parse(saved) : {
        name: 'Dr. Maya Raman',
        role: 'Senior IT Director',
        email: 'admin@aritcompany.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        company: 'AR IT COMPANY',
        userType: 'admin'
      };
    } catch {
      return {
        name: 'Dr. Maya Raman',
        role: 'Senior IT Director',
        email: 'admin@aritcompany.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        company: 'AR IT COMPANY',
        userType: 'admin'
      };
    }
  });

  const [activeRole, setActiveRole] = useState(() => {
    try {
      const auth = localStorage.getItem('arit_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        return parsed.userType === 'mentor' ? 'Mentor' : 'Admin';
      }
    } catch {}
    return 'Admin';
  });

  // 2. Core Entities with LocalStorage Persistence
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('arit_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('arit_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [internships, setInternships] = useState(() => {
    const saved = localStorage.getItem('arit_internships');
    return saved ? JSON.parse(saved) : INITIAL_INTERNSHIPS;
  });

  const [dailyActivities, setDailyActivities] = useState(() => {
    const saved = localStorage.getItem('arit_daily_activities');
    return saved ? JSON.parse(saved) : INITIAL_DAILY_ACTIVITIES;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('arit_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('arit_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('arit_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [mentors, setMentors] = useState(() => {
    const saved = localStorage.getItem('arit_mentors');
    return saved ? JSON.parse(saved) : INITIAL_MENTORS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('arit_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [communications, setCommunications] = useState(() => {
    const saved = localStorage.getItem('arit_communications');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNICATIONS;
  });

  // 3. UI State
  const [toasts, setToasts] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('arit_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('arit_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('arit_internships', JSON.stringify(internships)); }, [internships]);
  useEffect(() => { localStorage.setItem('arit_daily_activities', JSON.stringify(dailyActivities)); }, [dailyActivities]);
  useEffect(() => { localStorage.setItem('arit_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('arit_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('arit_certificates', JSON.stringify(certificates)); }, [certificates]);
  useEffect(() => { localStorage.setItem('arit_mentors', JSON.stringify(mentors)); }, [mentors]);
  useEffect(() => { localStorage.setItem('arit_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('arit_communications', JSON.stringify(communications)); }, [communications]);
  useEffect(() => { localStorage.setItem('arit_user', JSON.stringify(currentUser)); }, [currentUser]);

  // Load live data from Backend REST API on mount
  useEffect(() => {
    let isMounted = true;
    const loadBackendData = async () => {
      try {
        const [
          fetchedStudents,
          fetchedCourses,
          fetchedInternships,
          fetchedActivities,
          fetchedAttendance,
          fetchedPayments,
          fetchedCerts,
          fetchedMentors,
          fetchedNotifs,
          fetchedComms
        ] = await Promise.all([
          crmApiService.fetchRegisteredStudents(),
          crmApiService.fetchSelectedCourses(),
          crmApiService.fetchInternshipApplications(),
          crmApiService.fetchDailyActivitySubmissions(),
          crmApiService.fetchAttendanceRecords(),
          crmApiService.fetchPaymentInformation(),
          crmApiService.fetchCertificateInformation(),
          crmApiService.fetchMentors(),
          crmApiService.fetchNotifications(),
          crmApiService.fetchCommunications()
        ]);

        if (!isMounted) return;

        if (Array.isArray(fetchedStudents) && fetchedStudents.length > 0) setStudents(fetchedStudents);
        if (Array.isArray(fetchedCourses) && fetchedCourses.length > 0) setCourses(fetchedCourses);
        if (Array.isArray(fetchedInternships) && fetchedInternships.length > 0) setInternships(fetchedInternships);
        if (Array.isArray(fetchedActivities) && fetchedActivities.length > 0) setDailyActivities(fetchedActivities);
        if (Array.isArray(fetchedAttendance) && fetchedAttendance.length > 0) setAttendance(fetchedAttendance);
        if (Array.isArray(fetchedPayments) && fetchedPayments.length > 0) setPayments(fetchedPayments);
        if (Array.isArray(fetchedCerts) && fetchedCerts.length > 0) setCertificates(fetchedCerts);
        if (Array.isArray(fetchedMentors) && fetchedMentors.length > 0) setMentors(fetchedMentors);
        if (Array.isArray(fetchedNotifs) && fetchedNotifs.length > 0) setNotifications(fetchedNotifs);
        if (Array.isArray(fetchedComms) && fetchedComms.length > 0) setCommunications(fetchedComms);
      } catch (err) {
        console.warn('[CRMContext] Initial backend load note:', err.message);
      }
    };

    loadBackendData();
    return () => { isMounted = false; };
  }, []);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // =========================================================================
  // STUDENT ACTIONS
  // =========================================================================
  const addStudent = async (studentData) => {
    const nextNumber = students.length + 1;
    const formattedId = `ARIT-2026-STU${nextNumber < 10 ? '0' + nextNumber : nextNumber}`;
    const newStudent = {
      id: formattedId,
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone || '+91 98000 00000',
      address: studentData.address || 'AR IT Bangalore Campus',
      course: studentData.course,
      registrationDate: studentData.registrationDate || new Date().toISOString().split('T')[0],
      internshipStatus: studentData.internshipStatus || 'Active',
      duration: studentData.duration || '6 Months',
      attendance: 100,
      progress: 0,
      feeStatus: studentData.feeStatus || 'Paid',
      totalFee: Number(studentData.totalFee) || 30000,
      paidAmount: Number(studentData.paidAmount) || 30000,
      pendingAmount: Math.max(0, (Number(studentData.totalFee) || 30000) - (Number(studentData.paidAmount) || 30000)),
      tasksCompleted: 0,
      totalTasks: 40,
      mentor: studentData.mentor || 'Rajesh K. Sharma',
      college: studentData.college || 'Engineering Institute',
      certificateId: null,
      certificateIssued: false,
      avatar: studentData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      mode: studentData.mode || 'Hybrid (Bangalore Campus + Online)'
    };

    setStudents(prev => [newStudent, ...prev]);

    // Also create corresponding internship record
    const newInternship = {
      id: `INT-APP-${100 + nextNumber}`,
      studentId: newStudent.id,
      studentName: newStudent.name,
      course: newStudent.course,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2027-05-30',
      mentor: newStudent.mentor,
      status: 'Ongoing',
      college: newStudent.college,
      appliedDate: newStudent.registrationDate,
      evaluationGrade: 'In Progress',
      notes: 'Directly enrolled via AR IT COMPANY CRM portal.'
    };
    setInternships(prev => [newInternship, ...prev]);

    // Record payment entry
    if (newStudent.paidAmount > 0) {
      const newPayment = {
        id: `TXN-ARIT-${8900 + nextNumber}`,
        studentId: newStudent.id,
        studentName: newStudent.name,
        course: newStudent.course,
        courseFee: newStudent.totalFee,
        amountPaid: newStudent.paidAmount,
        pendingAmount: newStudent.pendingAmount,
        paymentDate: newStudent.registrationDate,
        paymentStatus: newStudent.pendingAmount === 0 ? 'Paid' : 'Partially Paid',
        method: 'Online Transfer',
        receiptNo: `REC-2026-${100 + nextNumber}`
      };
      setPayments(prev => [newPayment, ...prev]);
    }

    // Add Notification
    addNotification({
      type: 'registration',
      title: 'New Student Added',
      message: `${newStudent.name} enrolled in ${newStudent.course}.`,
      link: '/students'
    });

    showToast(`Student ${newStudent.name} (${newStudent.id}) registered successfully!`);

    // Asynchronously synchronize with Backend REST API
    try {
      crmApiService.createStudent(newStudent).catch(e => console.warn('[CRM] API createStudent sync fallback:', e));
    } catch {}

    return newStudent;
  };

  const updateStudent = async (id, updatedFields) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const merged = { ...s, ...updatedFields };
        merged.pendingAmount = Math.max(0, merged.totalFee - merged.paidAmount);
        merged.feeStatus = merged.pendingAmount === 0 ? 'Paid' : merged.paidAmount > 0 ? 'Partially Paid' : 'Pending';
        return merged;
      }
      return s;
    }));

    showToast('Student profile updated successfully.');

    // Asynchronously synchronize with Backend REST API
    try {
      crmApiService.updateStudent(id, updatedFields).catch(e => console.warn('[CRM] API updateStudent sync fallback:', e));
    } catch {}
  };

  const deleteStudent = async (id) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    setInternships(prev => prev.filter(i => i.studentId !== id));
    setPayments(prev => prev.filter(p => p.studentId !== id));
    setDailyActivities(prev => prev.filter(a => a.studentId !== id));
    showToast(`Student ${student ? student.name : id} has been removed.`, 'info');

    // Asynchronously synchronize with Backend REST API
    try {
      crmApiService.deleteStudent(id).catch(e => console.warn('[CRM] API deleteStudent sync fallback:', e));
    } catch {}
  };

  // =========================================================================
  // SHARED WEBSITE REGISTRATION SYNCHRONIZATION
  // =========================================================================
  const syncInternshipWebsiteRegistrations = async () => {
    setIsSyncing(true);
    showToast('Connecting to AR IT COMPANY Shared Registration API...', 'info');

    try {
      // 1. Trigger real API synchronization endpoint
      const serverRes = await crmApiService.syncInternshipWebsiteRegistrations();
      if (Array.isArray(serverRes) && serverRes.length > 0) {
        setStudents(prev => {
          const existingIds = new Set(prev.map(s => s.id || s.email));
          const toAdd = serverRes.filter(s => !existingIds.has(s.id) && !existingIds.has(s.email));
          return [...toAdd, ...prev];
        });
        showToast(`Successfully synced ${serverRes.length} registration(s) from AR IT Internship Website!`, 'success');
        setIsSyncing(false);
        return;
      }
    } catch (e) {
      console.warn('[CRM] Server sync failed, falling back to local dataset sync:', e.message);
    }

    // 2. Simulated local dataset fallback
    setTimeout(() => {
      const incomingCandidates = [
        {
          name: 'Nikhil R. Varma',
          email: 'nikhil.varma@gmail.com',
          phone: '+91 98452 77112',
          address: '56, Indiranagar 100ft Road, Bangalore - 560038',
          course: 'Full Stack Development',
          college: 'PES University, Bangalore',
          totalFee: 35000,
          paidAmount: 35000,
          mentor: 'Rajesh K. Sharma',
          mode: 'Hybrid (Bangalore Campus + Online)'
        },
        {
          name: 'Divya Bharathi',
          email: 'divya.b@outlook.com',
          phone: '+91 97411 88992',
          address: '12, RS Puram, Coimbatore, Tamil Nadu - 641002',
          course: 'Frontend Development',
          college: 'PSG College of Technology',
          totalFee: 25000,
          paidAmount: 25000,
          mentor: 'Pooja Sundaram',
          mode: 'Online Live'
        },
        {
          name: 'Tarun Reddy',
          email: 'tarun.reddy@gmail.com',
          phone: '+91 99088 12340',
          address: '204, Madhapur, Hyderabad, Telangana - 500081',
          course: 'Python Programming',
          college: 'CBIT Hyderabad',
          totalFee: 20000,
          paidAmount: 10000,
          mentor: 'Vikramaditya Verma',
          mode: 'Online Live'
        }
      ];

      const newItems = incomingCandidates.filter(inc => !students.some(s => s.email === inc.email));

      if (newItems.length === 0) {
        showToast('All student registrations from the Internship Website are already up to date!', 'info');
        setIsSyncing(false);
        return;
      }

      newItems.forEach(candidate => {
        addStudent({
          ...candidate,
          registrationDate: new Date().toISOString().split('T')[0],
          internshipStatus: 'Active'
        });
      });

      addNotification({
        type: 'registration',
        title: 'Website Registrations Synced',
        message: `${newItems.length} student registrations successfully imported from AR IT Internship Website.`,
        link: '/students'
      });

      showToast(`Successfully synced ${newItems.length} registrations from AR IT Internship Website!`, 'success');
      setIsSyncing(false);
    }, 600);
  };

  // =========================================================================
  // COURSE ACTIONS
  // =========================================================================
  const addCourse = async (courseData) => {
    const newCourse = {
      id: `CRS-0${courses.length + 1}`,
      name: courseData.name,
      category: courseData.category || 'Technology',
      duration: courseData.duration || '3 Months',
      fee: Number(courseData.fee) || 20000,
      status: courseData.status || 'Active',
      enrolledCount: 0,
      modulesCount: Number(courseData.modulesCount) || 12,
      image: courseData.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      description: courseData.description || 'Comprehensive professional training curriculum designed by AR IT industry experts.'
    };
    setCourses(prev => [...prev, newCourse]);
    showToast(`Course "${newCourse.name}" added successfully.`);

    try {
      crmApiService.createCourse(newCourse).catch(e => console.warn('[CRM] API createCourse fallback:', e));
    } catch {}
  };

  const updateCourse = async (id, updatedFields) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    showToast('Course details updated successfully.');

    try {
      crmApiService.updateCourse(id, updatedFields).catch(e => console.warn('[CRM] API updateCourse fallback:', e));
    } catch {}
  };

  const deleteCourse = async (id) => {
    const course = courses.find(c => c.id === id);
    setCourses(prev => prev.filter(c => c.id !== id));
    showToast(`Course "${course ? course.name : id}" removed.`, 'info');

    try {
      crmApiService.deleteCourse(id).catch(e => console.warn('[CRM] API deleteCourse fallback:', e));
    } catch {}
  };

  // =========================================================================
  // INTERNSHIP ACTIONS
  // =========================================================================
  const updateInternshipStatus = async (internshipId, newStatus, mentorName = null) => {
    setInternships(prev => prev.map(item => {
      if (item.id === internshipId) {
        const updated = {
          ...item,
          status: newStatus,
          mentor: mentorName || item.mentor
        };

        // Also reflect on student record
        setStudents(sList => sList.map(stu => {
          if (stu.id === item.studentId) {
            let stuStatus = 'Active';
            if (newStatus === 'Completed') stuStatus = 'Completed';
            if (newStatus === 'Rejected') stuStatus = 'Dropped';
            if (newStatus === 'New Application') stuStatus = 'Pending';
            return {
              ...stu,
              internshipStatus: stuStatus,
              mentor: mentorName || stu.mentor
            };
          }
          return stu;
        }));

        return updated;
      }
      return item;
    }));

    showToast(`Internship application updated to: ${newStatus}`);

    try {
      crmApiService.updateInternshipStatus(internshipId, newStatus, mentorName).catch(e => console.warn('[CRM] API updateInternshipStatus fallback:', e));
    } catch {}
  };

  // =========================================================================
  // DAILY ACTIVITIES & MENTOR FEEDBACK
  // =========================================================================
  const addDailyActivity = async (activityData) => {
    const newAct = {
      id: `ACT-0${dailyActivities.length + 1}`,
      studentName: activityData.studentName,
      studentId: activityData.studentId,
      course: activityData.course,
      dayNumber: activityData.dayNumber || `Day ${dailyActivities.length + 1}`,
      activityDate: activityData.activityDate || new Date().toISOString().split('T')[0],
      taskTitle: activityData.taskTitle,
      workDescription: activityData.workDescription,
      taskStatus: 'Pending Review',
      mentorFeedback: 'Under review by assigned mentor.',
      mentorName: activityData.mentorName || 'Assigned Mentor'
    };
    setDailyActivities(prev => [newAct, ...prev]);
    showToast(`Activity for ${newAct.dayNumber} logged successfully.`);

    try {
      crmApiService.createDailyActivity(newAct).catch(e => console.warn('[CRM] API createDailyActivity fallback:', e));
    } catch {}
  };

  const addMentorFeedback = async (activityId, feedback, newStatus = 'Approved') => {
    setDailyActivities(prev => prev.map(a => {
      if (a.id === activityId) {
        return {
          ...a,
          mentorFeedback: feedback,
          taskStatus: newStatus
        };
      }
      return a;
    }));

    showToast(`Mentor feedback submitted: status set to ${newStatus}.`);

    try {
      crmApiService.addMentorFeedback(activityId, feedback, newStatus).catch(e => console.warn('[CRM] API addMentorFeedback fallback:', e));
    } catch {}
  };

  // =========================================================================
  // ATTENDANCE ACTIONS
  // =========================================================================
  const markAttendance = async (studentId, status, date = new Date().toISOString().split('T')[0]) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    setAttendance(prev => {
      const filtered = prev.filter(a => !(a.studentId === studentId && a.date === date));
      return [
        {
          studentId,
          studentName: student.name,
          course: student.course,
          date,
          status,
          markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...filtered
      ];
    });

    showToast(`Marked ${student.name} as ${status}.`);

    try {
      crmApiService.markAttendance([{ studentId, status, studentName: student.name, course: student.course }], date).catch(e => console.warn('[CRM] API markAttendance fallback:', e));
    } catch {}
  };

  const markAllAttendance = async (status, date = new Date().toISOString().split('T')[0]) => {
    const newRecords = students.map(student => ({
      studentId: student.id,
      studentName: student.name,
      course: student.course,
      date,
      status,
      markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setAttendance(prev => {
      const otherDates = prev.filter(a => a.date !== date);
      return [...newRecords, ...otherDates];
    });

    showToast(`Bulk updated all students as ${status} for ${date}.`);

    try {
      crmApiService.markAttendance(newRecords, date).catch(e => console.warn('[CRM] API markAllAttendance fallback:', e));
    } catch {}
  };

  // =========================================================================
  // CERTIFICATES ACTIONS (Section 12)
  // =========================================================================
  /**
   * Strictly enforces: "Do not automatically issue certificates to students
   * who have not completed the required internship."
   */
  const generateCertificate = (studentId, theme = 'navy') => {
    const student = students.find(s => s.id === studentId);
    if (!student) {
      showToast('Student not found.', 'error');
      return null;
    }

    if (student.internshipStatus !== 'Completed') {
      showToast(
        `Cannot issue certificate: ${student.name}'s internship status is "${student.internshipStatus}". Completion required.`,
        'error'
      );
      return null;
    }

    const certNumber = certificates.length + 1;
    const certId = `ARIT-CERT-2026-${certNumber < 10 ? '0' + certNumber : certNumber}`;

    const newCert = {
      id: certId,
      studentId: student.id,
      studentName: student.name,
      courseName: student.course,
      duration: `${student.duration} (${student.registrationDate} – Present)`,
      issueDate: new Date().toISOString().split('T')[0],
      theme: theme || 'navy',
      grade: 'Distinction (A+)',
      authorizedSignatory: 'Dr. Maya Raman (Managing Director)',
      technicalLead: `${student.mentor} (Technical Head)`,
      company: 'AR IT COMPANY',
      verificationCode: `ARIT-VERIFY-${certNumber}`,
      skills: 'Full Stack Architecture, Modern Software Engineering, Enterprise Standards'
    };

    setCertificates(prev => [newCert, ...prev]);

    // Update student record
    updateStudent(student.id, {
      certificateId: newCert.id,
      certificateIssued: true
    });

    addNotification({
      type: 'certificate',
      title: 'Certificate Generated',
      message: `Official Certificate ${newCert.id} issued to ${student.name}.`,
      link: '/certificates'
    });

    showToast(`Official Certificate ${newCert.id} generated for ${student.name}!`);

    try {
      crmApiService.issueCertificate({
        studentId: student.id,
        theme,
        grade: 'Distinction (A+)'
      }).catch(e => console.warn('[CRM] API issueCertificate fallback:', e));
    } catch {}

    return newCert;
  };

  // =========================================================================
  // MENTORS ACTIONS
  // =========================================================================
  const addMentor = async (mentorData) => {
    const newMentor = {
      id: `MTR-0${mentors.length + 1}`,
      name: mentorData.name,
      email: mentorData.email,
      specialization: mentorData.specialization,
      assignedCourse: mentorData.assignedCourse,
      activeStudentsCount: 0,
      phone: mentorData.phone || '+91 98000 00000',
      avatar: mentorData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      experience: mentorData.experience || '5+ Years'
    };
    setMentors(prev => [...prev, newMentor]);
    showToast(`Mentor "${newMentor.name}" onboarded successfully.`);

    try {
      crmApiService.createMentor(newMentor).catch(e => console.warn('[CRM] API createMentor fallback:', e));
    } catch {}
  };

  const updateMentor = async (id, updatedFields) => {
    setMentors(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    showToast('Mentor information updated.');

    try {
      crmApiService.updateMentor(id, updatedFields).catch(e => console.warn('[CRM] API updateMentor fallback:', e));
    } catch {}
  };

  const deleteMentor = async (id) => {
    const mentor = mentors.find(m => m.id === id);
    setMentors(prev => prev.filter(m => m.id !== id));
    showToast(`Mentor ${mentor ? mentor.name : id} removed.`, 'info');

    try {
      crmApiService.deleteMentor(id).catch(e => console.warn('[CRM] API deleteMentor fallback:', e));
    } catch {}
  };

  // =========================================================================
  // COMMUNICATIONS & NOTIFICATIONS
  // =========================================================================
  const addCommunication = async (commData) => {
    const newComm = {
      id: `COMM-0${communications.length + 1}`,
      title: commData.title,
      category: commData.category,
      targetAudience: commData.targetAudience,
      sentDate: new Date().toISOString().split('T')[0],
      sentBy: currentUser.name,
      status: 'Sent',
      content: commData.content
    };
    setCommunications(prev => [newComm, ...prev]);
    showToast(`Announcement "${newComm.title}" published.`);

    try {
      crmApiService.sendAnnouncement(newComm).catch(e => console.warn('[CRM] API sendAnnouncement fallback:', e));
    } catch {}
  };

  const addNotification = (notifData) => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      type: notifData.type || 'info',
      title: notifData.title,
      message: notifData.message,
      timestamp: 'Just now',
      unread: true,
      link: notifData.link || '/dashboard'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    try {
      crmApiService.markNotificationAsRead(id).catch(() => {});
    } catch {}
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
    try {
      crmApiService.markAllNotificationsAsRead().catch(() => {});
    } catch {}
  };

  // =========================================================================
  // PAYMENTS ACTIONS
  // =========================================================================
  const addPayment = async (paymentData) => {
    const newPayment = {
      id: `TXN-ARIT-${8900 + payments.length + 1}`,
      studentId: paymentData.studentId,
      studentName: paymentData.studentName,
      course: paymentData.course,
      courseFee: Number(paymentData.courseFee),
      amountPaid: Number(paymentData.amountPaid),
      pendingAmount: Math.max(0, Number(paymentData.courseFee) - Number(paymentData.amountPaid)),
      paymentDate: paymentData.paymentDate || new Date().toISOString().split('T')[0],
      paymentStatus: paymentData.paymentStatus || 'Paid',
      method: paymentData.method || 'Online Transfer',
      receiptNo: `REC-2026-${100 + payments.length + 1}`
    };

    setPayments(prev => [newPayment, ...prev]);

    // Also update student feeStatus & paidAmount
    updateStudent(paymentData.studentId, {
      paidAmount: newPayment.amountPaid,
      pendingAmount: newPayment.pendingAmount
    });

    addNotification({
      type: 'payment',
      title: 'Payment Recorded',
      message: `₹${newPayment.amountPaid.toLocaleString('en-IN')} recorded for ${newPayment.studentName}.`,
      link: '/payments'
    });

    showToast(`Payment of ₹${newPayment.amountPaid.toLocaleString('en-IN')} logged.`);

    try {
      crmApiService.recordPayment(newPayment).catch(e => console.warn('[CRM] API recordPayment fallback:', e));
    } catch {}
  };

  // =========================================================================
  // COMPUTED DASHBOARD METRICS (Section 4)
  // =========================================================================
  const totalStudents = students.length;
  const totalRegistrations = students.length + internships.filter(i => i.status === 'New Application').length;
  const activeStudents = students.filter(s => s.internshipStatus === 'Active').length;
  const activeInterns = internships.filter(i => i.status === 'Ongoing').length;
  const completedInternships = students.filter(s => s.internshipStatus === 'Completed').length;
  const pendingApplications = internships.filter(i => i.status === 'New Application').length;
  const totalCourses = courses.length;
  const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);

  return (
    <CRMContext.Provider value={{
      // Core states
      currentUser,
      setCurrentUser,
      activeRole,
      setActiveRole,
      students,
      courses,
      internships,
      dailyActivities,
      attendance,
      payments,
      certificates,
      mentors,
      notifications,
      communications,
      toasts,
      isSyncing,

      // Summary metrics
      metrics: {
        totalStudents,
        totalRegistrations,
        activeStudents,
        activeInterns,
        completedInternships,
        pendingApplications,
        totalCourses,
        totalRevenue
      },

      // Handlers
      addStudent,
      updateStudent,
      deleteStudent,
      syncInternshipWebsiteRegistrations,

      addCourse,
      updateCourse,
      deleteCourse,

      updateInternshipStatus,

      addDailyActivity,
      addMentorFeedback,

      markAttendance,
      markAllAttendance,

      generateCertificate,

      addMentor,
      updateMentor,
      deleteMentor,

      addCommunication,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,

      addPayment,

      showToast,
      removeToast
    }}>
      {children}

      {/* Global Toast Notification Container */}
      <div className="crm-toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`crm-toast ${toast.type}`}>
            <div>
              <strong style={{ fontSize: '13px', display: 'block', color: 'var(--crm-navy)' }}>
                {toast.type === 'error' ? 'Notice' : 'AR IT CRM System'}
              </strong>
              <span style={{ fontSize: '12.5px', color: 'var(--crm-text-secondary)' }}>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '16px' }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};

export default CRMContext;
