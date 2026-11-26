/**
 * AR IT COMPANY CRM - Backend API Configuration
 * 
 * Configured for future shared backend integration with the AR IT COMPANY
 * Internship Registration Website. Both projects will communicate with the
 * same backend API base URL and share student registration schemas.
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    // Auth & Roles (Admin & Mentor)
    ADMIN_REGISTER: '/auth/admin/register',
    ADMIN_LOGIN: '/auth/admin/login',
    ADMIN_LOGOUT: '/auth/admin/logout',
    MENTOR_LOGIN: '/auth/mentor/login',
    VERIFY_TOKEN: '/auth/verify',
    
    // Students (Shared with Internship Registration Website)
    STUDENTS: '/students',
    STUDENT_DETAILS: (id) => `/students/${id}`,
    SYNC_WEBSITE_REGISTRATIONS: '/students/sync-website-registrations',
    
    // Courses
    COURSES: '/courses',
    COURSE_DETAILS: (id) => `/courses/${id}`,
    
    // Internships
    INTERNSHIPS: '/internships',
    INTERNSHIP_DETAILS: (id) => `/internships/${id}`,
    UPDATE_STATUS: (id) => `/internships/${id}/status`,
    ASSIGN_MENTOR: (id) => `/internships/${id}/assign-mentor`,
    
    // Daily Activities
    DAILY_ACTIVITIES: '/daily-activities',
    ACTIVITY_FEEDBACK: (id) => `/daily-activities/${id}/feedback`,
    
    // Attendance
    ATTENDANCE: '/attendance',
    ATTENDANCE_SUMMARY: '/attendance/summary',
    
    // Payments
    PAYMENTS: '/payments',
    PAYMENT_SUMMARY: '/payments/summary',
    
    // Progress
    PROGRESS: '/progress',
    
    // Certificates
    CERTIFICATES: '/certificates',
    CERTIFICATE_DETAILS: (id) => `/certificates/${id}`,
    VERIFY_CERTIFICATE: (code) => `/certificates/verify/${code}`,
    
    // Mentors
    MENTORS: '/mentors',
    
    // Communication & Notifications
    NOTIFICATIONS: '/notifications',
    COMMUNICATIONS: '/communications',
    
    // Reports
    REPORTS: '/reports'
  }
};

export default API_CONFIG;
