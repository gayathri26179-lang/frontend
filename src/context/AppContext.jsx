import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Pre-defined demo users
export const DEMO_USERS = {
  admin: {
    id: 'USR-001',
    name: 'Alexander Hayes',
    email: 'admin@interntrack.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    department: 'Executive Leadership',
    title: 'System Administrator'
  },
  manager: {
    id: 'USR-002',
    name: 'Elena Vance',
    email: 'manager@interntrack.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    department: 'Operations & Academics',
    title: 'Cohort & Operations Manager'
  },
  staff: {
    id: 'USR-003',
    name: 'Sarah Jenkins',
    email: 'staff@interntrack.com',
    role: 'Staff Member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    department: 'Full-Stack Development',
    title: 'Associate Software Intern'
  }
};

// Initial Seed Employees
const INITIAL_EMPLOYEES = [
  { id: 'EMP-1', name: 'Sarah Jenkins', email: 'sarah.j@interntrack.com', role: 'Staff Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', department: 'Full-Stack Dev', activeTasks: 4, completionRate: '94%' },
  { id: 'EMP-2', name: 'David Kim', email: 'david.k@interntrack.com', role: 'Staff Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', department: 'DevOps & Cloud', activeTasks: 3, completionRate: '91%' },
  { id: 'EMP-3', name: 'Priya Sharma', email: 'priya.s@interntrack.com', role: 'Staff Member', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', department: 'Data Science & AI', activeTasks: 5, completionRate: '89%' },
  { id: 'EMP-4', name: 'Marcus Brody', email: 'marcus.b@interntrack.com', role: 'Staff Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', department: 'UI/UX Design', activeTasks: 2, completionRate: '96%' },
  { id: 'EMP-5', name: 'Elena Vance', email: 'elena.v@interntrack.com', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80', department: 'Management', activeTasks: 6, completionRate: '98%' }
];

// Initial Seed Tasks
const INITIAL_TASKS = [
  { id: 'TSK-101', name: 'Implement OAuth 2.0 Auth Flow', assignedTo: 'Sarah Jenkins', dueDate: '2026-11-24', priority: 'High', status: 'In Progress', category: 'Backend Security', orderRef: 'ORD-8941' },
  { id: 'TSK-102', name: 'Design Responsive Course Grid', assignedTo: 'Marcus Brody', dueDate: '2026-11-22', priority: 'Medium', status: 'Completed', category: 'Frontend UI', orderRef: 'ORD-8930' },
  { id: 'TSK-103', name: 'Configure MySQL Replication Pool', assignedTo: 'David Kim', dueDate: '2026-11-26', priority: 'Urgent', status: 'Pending', category: 'Infrastructure', orderRef: 'ORD-8952' },
  { id: 'TSK-104', name: 'Refactor Batch Analytics Pipeline', assignedTo: 'Priya Sharma', dueDate: '2026-11-25', priority: 'High', status: 'In Progress', category: 'Data Engineering', orderRef: 'ORD-8964' },
  { id: 'TSK-105', name: 'Audit Intern Daily Activity Submissions', assignedTo: 'Elena Vance', dueDate: '2026-11-20', priority: 'Medium', status: 'Completed', category: 'Management', orderRef: 'ORD-8912' },
  { id: 'TSK-106', name: 'Deploy Microservices to Staging EKS', assignedTo: 'David Kim', dueDate: '2026-11-28', priority: 'Urgent', status: 'In Progress', category: 'DevOps', orderRef: 'ORD-8971' },
  { id: 'TSK-107', name: 'Build Certificate Verification QR Generator', assignedTo: 'Sarah Jenkins', dueDate: '2026-11-21', priority: 'High', status: 'Completed', category: 'Feature Delivery', orderRef: 'ORD-8925' },
  { id: 'TSK-108', name: 'Write Integration Tests for Ticket Router', assignedTo: 'Sarah Jenkins', dueDate: '2026-11-29', priority: 'Low', status: 'Pending', category: 'Quality Assurance', orderRef: 'ORD-8980' }
];

// Initial Seed Courses
const INITIAL_COURSES = [
  {
    id: 'CRS-01',
    title: 'Modern Full-Stack React & Node Mastery',
    description: 'Build enterprise scalable full-stack applications with React 19, Express, MySQL and modern REST architecture.',
    instructor: 'Alex Carter',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    duration: '48 Hours (8 Weeks)',
    lessonsCount: 36,
    completedLessons: 28,
    progress: 78,
    enrolled: true,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CRS-02',
    title: 'Advanced Database Architecture & MySQL Tuning',
    description: 'Master relational schema normalization, connection pooling, high-performance indexing, and transactional integrity.',
    instructor: 'Elena Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    duration: '32 Hours (6 Weeks)',
    lessonsCount: 24,
    completedLessons: 24,
    progress: 100,
    enrolled: true,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CRS-03',
    title: 'Docker, Kubernetes & Cloud DevOps Pipeline',
    description: 'Containerize microservices, deploy multi-container pods, automate CI/CD GitHub Actions, and monitor staging servers.',
    instructor: 'David Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    duration: '40 Hours (7 Weeks)',
    lessonsCount: 30,
    completedLessons: 12,
    progress: 40,
    enrolled: true,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CRS-04',
    title: 'Enterprise Task & Ticket Lifecycle Management',
    description: 'Standards for SLA resolution, priority triage, automated workflow triggers, and manager escalation channels.',
    instructor: 'Alexander Hayes',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    duration: '20 Hours (4 Weeks)',
    lessonsCount: 16,
    completedLessons: 0,
    progress: 0,
    enrolled: false,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
  }
];

// Initial Daily Activities
const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-501',
    date: '2026-11-19',
    workSummary: 'Implemented role-based protected routing in React and completed unit test suite for ticket service.',
    hoursWorked: 8.0,
    peopleContacted: 5,
    ordersHandled: 3,
    status: 'Approved',
    submittedBy: 'Sarah Jenkins',
    checklist: [
      { id: 1, text: 'Review daily standup blockers & Jira board', done: true },
      { id: 2, text: 'Commit authentication module with OAuth2', done: true },
      { id: 3, text: 'Resolve pending customer blocker ticket TCK-301', done: true },
      { id: 4, text: 'Submit daily timesheet log for manager approval', done: true }
    ]
  },
  {
    id: 'ACT-502',
    date: '2026-11-18',
    workSummary: 'Constructed responsive Bootstrap 5 dashboard cards and integrated Recharts for velocity visualization.',
    hoursWorked: 7.5,
    peopleContacted: 4,
    ordersHandled: 2,
    status: 'Approved',
    submittedBy: 'Sarah Jenkins',
    checklist: [
      { id: 1, text: 'Design chart container with responsive aspect ratio', done: true },
      { id: 2, text: 'Wire up localStorage persistence state', done: true },
      { id: 3, text: 'Perform cross-browser check on Firefox & Chrome', done: true }
    ]
  },
  {
    id: 'ACT-503',
    date: '2026-11-17',
    workSummary: 'Configured connection pooling parameters and optimized slow SQL query indexes for intern tracking.',
    hoursWorked: 8.5,
    peopleContacted: 6,
    ordersHandled: 4,
    status: 'Approved',
    submittedBy: 'David Kim',
    checklist: [
      { id: 1, text: 'Run EXPLAIN on foreign key joins in activities', done: true },
      { id: 2, text: 'Stress-test database under concurrent queries', done: true }
    ]
  }
];

// Initial Reports
const INITIAL_REPORTS = [
  { id: 'REP-201', title: 'Q4 Cohort Performance & Task Velocity Audit', submittedBy: 'Elena Vance', date: '2026-11-15', status: 'Approved', category: 'Operations' },
  { id: 'REP-202', title: 'Weekly Support Ticket SLA Compliance Review', submittedBy: 'Sarah Jenkins', date: '2026-11-17', status: 'Approved', category: 'Technical' },
  { id: 'REP-203', title: 'Intern Course Enrollment & Milestone Progress', submittedBy: 'Alexander Hayes', date: '2026-11-18', status: 'Pending', category: 'Academics' },
  { id: 'REP-204', title: 'Cloud Infrastructure Resource & Cost Allocation', submittedBy: 'David Kim', date: '2026-11-18', status: 'Under Review', category: 'DevOps' }
];

// Initial Tickets
const INITIAL_TICKETS = [
  { id: 'TCK-301', issue: 'Database pool connection drop during peak test hours', priority: 'High', status: 'Resolved', submittedBy: 'Sarah Jenkins', assignedTo: 'David Kim', createdAt: '2026-11-16' },
  { id: 'TCK-302', issue: 'Need staging S3 IAM credentials for certificate asset uploads', priority: 'Medium', status: 'In Progress', submittedBy: 'Sarah Jenkins', assignedTo: 'Alexander Hayes', createdAt: '2026-11-17' },
  { id: 'TCK-303', issue: 'Docker daemon socket permission error on worker VM #4', priority: 'Urgent', status: 'Open', submittedBy: 'David Kim', assignedTo: 'Elena Vance', createdAt: '2026-11-18' },
  { id: 'TCK-304', issue: 'Pandas data frame memory leak on 100k batch export', priority: 'Low', status: 'Closed', submittedBy: 'Priya Sharma', assignedTo: 'Sarah Jenkins', createdAt: '2026-11-14' }
];

export const AppProvider = ({ children }) => {
  // 1. Current Auth User (default to Staff or saved in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('it_current_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.staff;
  });

  // 2. Tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('it_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // 3. Courses
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('it_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // 4. Daily Activities
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('it_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // 5. Reports
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('it_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // 6. Tickets
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('it_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  // 7. Employees
  const [employees] = useState(INITIAL_EMPLOYEES);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('it_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('it_current_user');
    }
  }, [currentUser]);

  useEffect(() => { localStorage.setItem('it_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('it_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('it_activities', JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem('it_reports', JSON.stringify(reports)); }, [reports]);
  useEffect(() => { localStorage.setItem('it_tickets', JSON.stringify(tickets)); }, [tickets]);

  // Auth Methods
  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    let matchedUser = Object.values(DEMO_USERS).find(u => u.email.toLowerCase() === cleanEmail);
    if (!matchedUser) {
      // Auto-fallback demo match based on keyword
      if (cleanEmail.includes('admin')) matchedUser = DEMO_USERS.admin;
      else if (cleanEmail.includes('manager')) matchedUser = DEMO_USERS.manager;
      else matchedUser = DEMO_USERS.staff;
    }
    setCurrentUser(matchedUser);
    return { success: true, user: matchedUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (roleKey) => {
    const user = DEMO_USERS[roleKey] || DEMO_USERS.staff;
    setCurrentUser(user);
  };

  // Task Handlers
  const addTask = (newTask) => {
    const id = `TSK-${Math.floor(100 + Math.random() * 900)}`;
    const taskObj = {
      id,
      orderRef: `ORD-${Math.floor(8000 + Math.random() * 1000)}`,
      status: 'Pending',
      priority: 'Medium',
      ...newTask
    };
    setTasks(prev => [taskObj, ...prev]);
    return taskObj;
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'In Progress' : t.status === 'In Progress' ? 'Pending' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Course Handlers
  const addCourse = (newCourse) => {
    const id = `CRS-0${courses.length + 1}`;
    const courseObj = {
      id,
      enrolled: false,
      progress: 0,
      completedLessons: 0,
      lessonsCount: 20,
      status: 'Available',
      ...newCourse
    };
    setCourses(prev => [courseObj, ...prev]);
  };

  const updateCourse = (id, updatedFields) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const enrollCourse = (id) => {
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, enrolled: true, status: 'In Progress' };
      }
      return c;
    }));
  };

  const updateCourseProgress = (id, progressDelta) => {
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        const newProgress = Math.min(100, Math.max(0, c.progress + progressDelta));
        const newLessons = Math.round((newProgress / 100) * c.lessonsCount);
        return {
          ...c,
          progress: newProgress,
          completedLessons: newLessons,
          status: newProgress === 100 ? 'Completed' : 'In Progress'
        };
      }
      return c;
    }));
  };

  // Activity Handlers
  const addActivity = (newAct) => {
    const id = `ACT-${Math.floor(500 + Math.random() * 500)}`;
    const actObj = {
      id,
      status: 'Pending',
      submittedBy: currentUser ? currentUser.name : 'Sarah Jenkins',
      checklist: [
        { id: 1, text: 'Verify code deliverables', done: true },
        { id: 2, text: 'Daily task status sync', done: true }
      ],
      ...newAct
    };
    setActivities(prev => [actObj, ...prev]);
  };

  const toggleChecklistItem = (activityId, itemId) => {
    setActivities(prev => prev.map(act => {
      if (act.id === activityId && act.checklist) {
        return {
          ...act,
          checklist: act.checklist.map(item => item.id === itemId ? { ...item, done: !item.done } : item)
        };
      }
      return act;
    }));
  };

  // Report Handlers
  const addReport = (newRep) => {
    const id = `REP-${Math.floor(200 + Math.random() * 800)}`;
    const repObj = {
      id,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      submittedBy: currentUser ? currentUser.name : 'Sarah Jenkins',
      ...newRep
    };
    setReports(prev => [repObj, ...prev]);
  };

  const updateReportStatus = (id, status) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Ticket Handlers
  const addTicket = (newTck) => {
    const id = `TCK-${Math.floor(300 + Math.random() * 700)}`;
    const tckObj = {
      id,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Open',
      submittedBy: currentUser ? currentUser.name : 'Sarah Jenkins',
      assignedTo: 'Alexander Hayes',
      ...newTck
    };
    setTickets(prev => [tckObj, ...prev]);
    return tckObj;
  };

  const updateTicketStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      login,
      logout,
      switchRole,
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      enrollCourse,
      updateCourseProgress,
      activities,
      addActivity,
      toggleChecklistItem,
      reports,
      addReport,
      updateReportStatus,
      tickets,
      addTicket,
      updateTicketStatus,
      employees
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
