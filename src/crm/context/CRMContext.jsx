import React, { createContext, useContext, useState, useEffect } from 'react';

const CRMContext = createContext();

// Sample Initial Students
const INITIAL_STUDENTS = [
  {
    id: 'IAI-STU-101',
    name: 'Ananya Verma',
    email: 'ananya.verma@example.com',
    phone: '+91 98765 43210',
    course: 'Full Stack Development',
    progress: 94,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-06-15',
    duration: '6 Months',
    attendance: 96,
    feeStatus: 'Paid',
    totalFee: 1500,
    paidAmount: 1500,
    tasksCompleted: 42,
    totalTasks: 45,
    certificateId: 'IAI-2026-9842',
    certificateIssued: true,
    mentor: 'Alex Carter'
  },
  {
    id: 'IAI-STU-102',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 98123 45678',
    course: 'AI & Machine Learning',
    progress: 78,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-07-01',
    duration: '6 Months',
    attendance: 91,
    feeStatus: 'Paid',
    totalFee: 1800,
    paidAmount: 1800,
    tasksCompleted: 35,
    totalTasks: 45,
    certificateId: null,
    certificateIssued: false,
    mentor: 'Dr. Maya Raman'
  },
  {
    id: 'IAI-STU-103',
    name: 'Jessica Chen',
    email: 'jessica.chen@example.com',
    phone: '+1 (555) 234-5678',
    course: 'Data Science',
    progress: 100,
    status: 'Completed',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-05-10',
    duration: '6 Months',
    attendance: 98,
    feeStatus: 'Paid',
    totalFee: 1600,
    paidAmount: 1600,
    tasksCompleted: 45,
    totalTasks: 45,
    certificateId: 'IAI-2026-9042',
    certificateIssued: true,
    mentor: 'Dr. Maya Raman'
  },
  {
    id: 'IAI-STU-104',
    name: 'Kabir Patel',
    email: 'kabir.patel@example.com',
    phone: '+91 97234 56789',
    course: 'Python',
    progress: 68,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-08-01',
    duration: '3 Months',
    attendance: 88,
    feeStatus: 'Partial',
    totalFee: 900,
    paidAmount: 600,
    tasksCompleted: 24,
    totalTasks: 35,
    certificateId: null,
    certificateIssued: false,
    mentor: 'Elena Vance'
  },
  {
    id: 'IAI-STU-105',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 345-6789',
    course: 'Full Stack Development',
    progress: 89,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-06-20',
    duration: '6 Months',
    attendance: 95,
    feeStatus: 'Paid',
    totalFee: 1500,
    paidAmount: 1500,
    tasksCompleted: 40,
    totalTasks: 45,
    certificateId: null,
    certificateIssued: false,
    mentor: 'Alex Carter'
  },
  {
    id: 'IAI-STU-106',
    name: 'Liam Scott',
    email: 'liam.scott@example.com',
    phone: '+1 (555) 456-7890',
    course: 'AI & Machine Learning',
    progress: 52,
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-08-15',
    duration: '6 Months',
    attendance: 79,
    feeStatus: 'Paid',
    totalFee: 1800,
    paidAmount: 1800,
    tasksCompleted: 20,
    totalTasks: 45,
    certificateId: null,
    certificateIssued: false,
    mentor: 'Dr. Maya Raman'
  },
  {
    id: 'IAI-STU-107',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    phone: '+91 99887 76655',
    course: 'Data Science',
    progress: 82,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-07-10',
    duration: '6 Months',
    attendance: 93,
    feeStatus: 'Paid',
    totalFee: 1600,
    paidAmount: 1600,
    tasksCompleted: 37,
    totalTasks: 45,
    certificateId: null,
    certificateIssued: false,
    mentor: 'Dr. Maya Raman'
  },
  {
    id: 'IAI-STU-108',
    name: 'Arjun Nair',
    email: 'arjun.nair@example.com',
    phone: '+91 91234 98765',
    course: 'Python',
    progress: 95,
    status: 'Completed',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    enrolledDate: '2026-05-15',
    duration: '3 Months',
    attendance: 97,
    feeStatus: 'Paid',
    totalFee: 900,
    paidAmount: 900,
    tasksCompleted: 35,
    totalTasks: 35,
    certificateId: 'IAI-2026-8910',
    certificateIssued: true,
    mentor: 'Elena Vance'
  }
];

// Initial Pending Tasks for Review
const INITIAL_PENDING_TASKS = [
  {
    id: 'TASK-REV-01',
    taskName: 'Build RAG Pipeline with ChromaDB & LangChain',
    studentName: 'Kabir Patel',
    studentId: 'IAI-STU-104',
    course: 'Python',
    assignedDate: '2026-11-15',
    dueDate: '2026-11-22',
    submittedDate: '2026-11-19',
    status: 'Pending Review',
    repoUrl: 'https://github.com/kabir/rag-pipeline',
    demoUrl: 'https://rag-demo.incredibleai.app',
    notes: 'Implemented vector embeddings with OpenAI text-embedding-3-small and persistent ChromaDB collection with cosine similarity reranking.'
  },
  {
    id: 'TASK-REV-02',
    taskName: 'Redux Toolkit Query Cache & Pagination',
    studentName: 'Sarah Jenkins',
    studentId: 'IAI-STU-105',
    course: 'Full Stack Development',
    assignedDate: '2026-11-16',
    dueDate: '2026-11-21',
    submittedDate: '2026-11-19',
    status: 'Pending Review',
    repoUrl: 'https://github.com/sarah/rtk-query-demo',
    demoUrl: 'https://rtk-cache.incredibleai.app',
    notes: 'Configured optimistic updates, automated cache invalidation on mutations, and infinite scroll pagination with RTK Query.'
  },
  {
    id: 'TASK-REV-03',
    taskName: 'Customer Churn Classification & ROC-AUC Analysis',
    studentName: 'Aisha Khan',
    studentId: 'IAI-STU-107',
    course: 'Data Science',
    assignedDate: '2026-11-14',
    dueDate: '2026-11-20',
    submittedDate: '2026-11-18',
    status: 'In Review',
    repoUrl: 'https://github.com/aisha/churn-analysis',
    demoUrl: 'https://churn-viz.incredibleai.app',
    notes: 'Trained XGBoost model with hyperparameter tuning via Optuna. Achieved 0.89 ROC-AUC on 50k customer dataset with SHAP feature importance.'
  },
  {
    id: 'TASK-REV-04',
    taskName: 'FastAPI JWT Auth & Role-Based RBAC Middleware',
    studentName: 'Rohan Mehta',
    studentId: 'IAI-STU-102',
    course: 'AI & Machine Learning',
    assignedDate: '2026-11-17',
    dueDate: '2026-11-24',
    submittedDate: '2026-11-19',
    status: 'Pending Review',
    repoUrl: 'https://github.com/rohan/fastapi-auth',
    demoUrl: 'https://api-auth.incredibleai.app',
    notes: 'Full OAuth2 Bearer token flow with refresh tokens, password hashing with passlib/bcrypt, and dependency injection guards.'
  },
  {
    id: 'TASK-REV-05',
    taskName: 'YOLOv8 Real-Time Object Tracking Pipeline',
    studentName: 'Liam Scott',
    studentId: 'IAI-STU-106',
    course: 'AI & Machine Learning',
    assignedDate: '2026-11-15',
    dueDate: '2026-11-23',
    submittedDate: '2026-11-18',
    status: 'Needs Re-work',
    repoUrl: 'https://github.com/liam/yolov8-tracking',
    demoUrl: 'https://yolo-stream.incredibleai.app',
    notes: 'Frame rate drops below 15 FPS when processing 1080p stream. Needs TensorRT quantization or frame-skipping optimization.'
  }
];

// Initial Recent Activities Timeline
const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-1',
    type: 'registration',
    title: 'New Student Registered',
    description: 'Aarav Sharma enrolled in AI & Machine Learning Bootcamp (Cohort #14).',
    timestamp: '10 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
    iconColor: '#6366f1'
  },
  {
    id: 'ACT-2',
    type: 'submission',
    title: 'Task Submitted for Review',
    description: 'Ananya Verma submitted "Fine-Tuning Llama 3 on Custom Dataset".',
    timestamp: '25 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
    iconColor: '#8b5cf6'
  },
  {
    id: 'ACT-3',
    type: 'certificate',
    title: 'Certificate Generated & Verified',
    description: 'Official digital certificate issued to Jessica Chen (#IAI-CERT-9042).',
    timestamp: '1 hour ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
    iconColor: '#10b981'
  },
  {
    id: 'ACT-4',
    type: 'payment',
    title: 'Payment Received',
    description: '$1,800 received from Rohan Mehta for Full Tuition Fee (Stripe Ref: #TXN-9021).',
    timestamp: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    iconColor: '#f59e0b'
  },
  {
    id: 'ACT-5',
    type: 'submission',
    title: 'Task Approved with Distinction',
    description: 'Mentor Alex Carter approved Sarah Jenkins’s "React 19 Server Components Architecture".',
    timestamp: '3 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    iconColor: '#10b981'
  }
];

// Initial Courses
const INITIAL_COURSES = [
  {
    id: 'CRS-FS',
    title: 'Full Stack Development',
    code: 'FSD-2026',
    category: 'Web & Cloud',
    enrolledStudents: 475,
    percentage: 38,
    color: '#6366f1',
    duration: '6 Months',
    modulesCount: 24,
    instructor: 'Alex Carter, Senior Lead Architect',
    description: 'Comprehensive enterprise track: React 19, TypeScript, Node.js, Express, MySQL, PostgreSQL, Docker, and AWS cloud deployment.',
    rating: 4.9,
    status: 'Active'
  },
  {
    id: 'CRS-AI',
    title: 'AI & Machine Learning',
    code: 'AIML-2026',
    category: 'Artificial Intelligence',
    enrolledStudents: 337,
    percentage: 27,
    color: '#8b5cf6',
    duration: '6 Months',
    modulesCount: 28,
    instructor: 'Dr. Maya Raman, AI Research Director',
    description: 'Deep learning neural networks, PyTorch, LangChain, RAG architecture, LLM fine-tuning, computer vision with YOLOv8, and Agentic AI workflows.',
    rating: 4.95,
    status: 'Active'
  },
  {
    id: 'CRS-DS',
    title: 'Data Science',
    code: 'DS-2026',
    category: 'Data & Analytics',
    enrolledStudents: 262,
    percentage: 21,
    color: '#a855f7',
    duration: '5 Months',
    modulesCount: 20,
    instructor: 'Priya Sharma, Principal Data Scientist',
    description: 'Exploratory data analysis, statistical modeling, Pandas, NumPy, Scikit-Learn, Big Data with PySpark, Tableau & Power BI dashboarding.',
    rating: 4.85,
    status: 'Active'
  },
  {
    id: 'CRS-PY',
    title: 'Python',
    code: 'PY-2026',
    category: 'Programming & Automation',
    enrolledStudents: 174,
    percentage: 14,
    color: '#ec4899',
    duration: '3 Months',
    modulesCount: 16,
    instructor: 'Elena Vance, Technical Curriculum Lead',
    description: 'Core and advanced Python, asynchronous programming, FastAPI microservices, web scraping with Playwright, automated testing, and CI/CD pipelines.',
    rating: 4.8,
    status: 'Active'
  }
];

// Initial Certificates
const INITIAL_CERTIFICATES = [
  {
    id: 'IAI-2026-9842',
    studentId: 'IAI-STU-101',
    studentName: 'Ananya Verma',
    courseName: 'Full Stack Development',
    duration: '6 Months (May 2026 - Nov 2026)',
    completionDate: 'November 20, 2026',
    grade: 'Distinction with Honors',
    status: 'Verified',
    verificationCode: 'IAI-2026-9842',
    qrData: 'https://incredibleai.solutions/verify/IAI-2026-9842',
    issuedBy: 'Dr. Maya Raman & Vikram Singhania',
    skills: 'React 19, TypeScript, Node.js, Express, MySQL, Docker, REST APIs'
  },
  {
    id: 'IAI-2026-9042',
    studentId: 'IAI-STU-103',
    studentName: 'Jessica Chen',
    courseName: 'Data Science',
    duration: '6 Months (May 2026 - Nov 2026)',
    completionDate: 'November 10, 2026',
    grade: 'Distinction',
    status: 'Verified',
    verificationCode: 'IAI-2026-9042',
    qrData: 'https://incredibleai.solutions/verify/IAI-2026-9042',
    issuedBy: 'Dr. Maya Raman & Vikram Singhania',
    skills: 'Python, PyTorch, Machine Learning, Data Analytics, Pandas, Scikit-Learn'
  },
  {
    id: 'IAI-2026-8910',
    studentId: 'IAI-STU-108',
    studentName: 'Arjun Nair',
    courseName: 'Python',
    duration: '3 Months (Aug 2026 - Nov 2026)',
    completionDate: 'November 15, 2026',
    grade: 'Excellence',
    status: 'Verified',
    verificationCode: 'IAI-2026-8910',
    qrData: 'https://incredibleai.solutions/verify/IAI-2026-8910',
    issuedBy: 'Elena Vance & Vikram Singhania',
    skills: 'Advanced Python, FastAPI, AsyncIO, PyTest, Automated Scrapers'
  }
];

// Initial Payments
const INITIAL_PAYMENTS = [
  { id: 'TXN-9021', studentId: 'IAI-STU-102', studentName: 'Rohan Mehta', course: 'AI & Machine Learning', amount: 1800, date: '2026-11-19', method: 'Stripe / Credit Card', status: 'Completed', invoice: 'INV-2026-0891' },
  { id: 'TXN-9020', studentId: 'IAI-STU-101', studentName: 'Ananya Verma', course: 'Full Stack Development', amount: 1500, date: '2026-11-18', method: 'Bank Wire / ACH', status: 'Completed', invoice: 'INV-2026-0890' },
  { id: 'TXN-9019', studentId: 'IAI-STU-104', studentName: 'Kabir Patel', course: 'Python', amount: 600, date: '2026-11-17', method: 'UPI / Razorpay', status: 'Completed', invoice: 'INV-2026-0889' },
  { id: 'TXN-9018', studentId: 'IAI-STU-107', studentName: 'Aisha Khan', course: 'Data Science', amount: 1600, date: '2026-11-16', method: 'Stripe / Card', status: 'Completed', invoice: 'INV-2026-0888' },
  { id: 'TXN-9017', studentId: 'IAI-STU-105', studentName: 'Sarah Jenkins', course: 'Full Stack Development', amount: 1500, date: '2026-11-15', method: 'PayPal', status: 'Completed', invoice: 'INV-2026-0887' }
];

export const CRMProvider = ({ children }) => {
  // Persistence state
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('incredible_crm_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [pendingTasks, setPendingTasks] = useState(() => {
    const saved = localStorage.getItem('incredible_crm_pending_tasks');
    return saved ? JSON.parse(saved) : INITIAL_PENDING_TASKS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('incredible_crm_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('incredible_crm_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('incredible_crm_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('incredible_crm_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Task Submission', text: 'Ananya Verma submitted RAG Pipeline for review.', time: '10m ago', unread: true },
    { id: 2, title: 'Payment Confirmed', text: '$1,800 received from Rohan Mehta.', time: '1h ago', unread: true },
    { id: 3, title: 'Certificate Downloaded', text: 'Jessica Chen downloaded verified PDF certificate.', time: '3h ago', unread: false },
    { id: 4, title: 'Batch Standup Reminder', text: 'AI & ML Cohort #14 weekly review starts at 4 PM.', time: '5h ago', unread: false }
  ]);

  const [currentAdmin] = useState({
    name: 'Dr. Maya Raman',
    role: 'Chief Academic Officer & Co-Founder',
    email: 'maya.raman@incredibleai.solutions',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  });

  // Selected student for Profile modal / drawer
  const [selectedStudent, setSelectedStudent] = useState(null);
  // Selected certificate for Preview / PDF download
  const [selectedCertificate, setSelectedCertificate] = useState(INITIAL_CERTIFICATES[0]);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('incredible_crm_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('incredible_crm_pending_tasks', JSON.stringify(pendingTasks)); }, [pendingTasks]);
  useEffect(() => { localStorage.setItem('incredible_crm_activities', JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem('incredible_crm_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('incredible_crm_certificates', JSON.stringify(certificates)); }, [certificates]);
  useEffect(() => { localStorage.setItem('incredible_crm_payments', JSON.stringify(payments)); }, [payments]);

  // Student Actions
  const addStudent = (studentData) => {
    const newId = `IAI-STU-${100 + students.length + 1}`;
    const newStudent = {
      id: newId,
      progress: 0,
      status: 'Active',
      attendance: 100,
      feeStatus: 'Paid',
      totalFee: 1500,
      paidAmount: 1500,
      tasksCompleted: 0,
      totalTasks: 45,
      certificateId: null,
      certificateIssued: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      enrolledDate: new Date().toISOString().split('T')[0],
      duration: '6 Months',
      ...studentData
    };
    setStudents(prev => [newStudent, ...prev]);

    // Add activity
    addActivity({
      type: 'registration',
      title: 'New Student Registered',
      description: `${newStudent.name} enrolled in ${newStudent.course}.`,
      avatar: newStudent.avatar,
      iconColor: '#6366f1'
    });

    return newStudent;
  };

  const updateStudent = (id, updatedFields) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(prev => ({ ...prev, ...updatedFields }));
    }
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(null);
    }
  };

  // Task Actions
  const approveTask = (taskId, comment) => {
    setPendingTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // increase student progress
        updateStudentProgress(t.studentId, 5);
        return { ...t, status: 'Approved', mentorComment: comment || 'Task reviewed and approved with distinction.' };
      }
      return t;
    }));

    const task = pendingTasks.find(t => t.id === taskId);
    if (task) {
      addActivity({
        type: 'submission',
        title: 'Task Approved',
        description: `Approved "${task.taskName}" for ${task.studentName}.`,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
        iconColor: '#10b981'
      });
    }
  };

  const rejectTask = (taskId, reason) => {
    setPendingTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'Needs Re-work', mentorComment: reason || 'Please revise according to requirements.' };
      }
      return t;
    }));
  };

  const updateStudentProgress = (studentId, delta) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const nextProgress = Math.min(100, s.progress + delta);
        const nextTasks = s.tasksCompleted + 1;
        return {
          ...s,
          progress: nextProgress,
          tasksCompleted: nextTasks,
          status: nextProgress >= 100 ? 'Completed' : s.status
        };
      }
      return s;
    }));
  };

  // Certificate Actions
  const generateCertificate = (student) => {
    const certCode = `IAI-2026-${Math.floor(8000 + Math.random() * 2000)}`;
    const newCert = {
      id: certCode,
      studentId: student.id,
      studentName: student.name,
      courseName: student.course,
      duration: student.duration || '6 Months Intensive Program',
      completionDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      grade: student.progress >= 90 ? 'Distinction with Honors' : 'First Class with Merit',
      status: 'Verified',
      verificationCode: certCode,
      qrData: `https://incredibleai.solutions/verify/${certCode}`,
      issuedBy: 'Dr. Maya Raman & Vikram Singhania',
      skills: `${student.course} Enterprise Specialization, Applied Project Portfolio, Production Architecture`
    };

    setCertificates(prev => [newCert, ...prev]);
    updateStudent(student.id, { certificateId: certCode, certificateIssued: true, status: 'Completed' });
    setSelectedCertificate(newCert);

    addActivity({
      type: 'certificate',
      title: 'Certificate Generated',
      description: `Official digital certificate issued to ${student.name} (#${certCode}).`,
      avatar: student.avatar,
      iconColor: '#10b981'
    });

    return newCert;
  };

  // Payment Actions
  const recordPayment = (paymentData) => {
    const newTxn = {
      id: `TXN-${Math.floor(9000 + Math.random() * 1000)}`,
      invoice: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      ...paymentData
    };

    setPayments(prev => [newTxn, ...prev]);
    addActivity({
      type: 'payment',
      title: 'Payment Received',
      description: `$${newTxn.amount} received from ${newTxn.studentName} (${newTxn.method}).`,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      iconColor: '#f59e0b'
    });
  };

  // Activity Helper
  const addActivity = (act) => {
    const newActivity = {
      id: `ACT-${Date.now()}`,
      timestamp: 'Just now',
      ...act
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 15)]);
  };

  // Notification helpers
  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Computed overview metrics
  const totalStudents = 1248 + students.length - INITIAL_STUDENTS.length;
  const tasksCompleted = 8620 + students.reduce((acc, s) => acc + (s.tasksCompleted || 0), 0) - INITIAL_STUDENTS.reduce((acc, s) => acc + s.tasksCompleted, 0);
  const certificatesIssued = 642 + certificates.length - INITIAL_CERTIFICATES.length;
  const totalRevenue = 128450 + payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0) - INITIAL_PAYMENTS.reduce((acc, p) => acc + p.amount, 0);

  return (
    <CRMContext.Provider value={{
      // Data
      students,
      pendingTasks,
      activities,
      courses,
      certificates,
      payments,
      notifications,
      currentAdmin,
      selectedStudent,
      setSelectedStudent,
      selectedCertificate,
      setSelectedCertificate,

      // Metrics
      metrics: {
        totalStudents,
        tasksCompleted,
        certificatesIssued,
        totalRevenue
      },

      // Methods
      addStudent,
      updateStudent,
      deleteStudent,
      approveTask,
      rejectTask,
      generateCertificate,
      recordPayment,
      addActivity,
      markNotificationAsRead,
      markAllNotificationsAsRead
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => useContext(CRMContext);
