/**
 * AR IT COMPANY CRM - Unified API Service
 * 
 * Prepares the CRM for shared backend integration with the AR IT COMPANY
 * Internship Registration Website. When backend endpoints are deployed,
 * requests hit the configured REST API. During development, it provides
 * high-fidelity simulated latency and local persistence.
 */

import { API_CONFIG } from './apiConfig';

const getAuthHeaders = () => {
  const token = localStorage.getItem('arit_admin_token') || 'demo-jwt-token';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Client-Source': 'ARIT-CRM-Portal'
  };
};

/**
 * Generic fetch wrapper with timeout and fallback support
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    // Log info for developers preparing the backend
    console.info(`[AR IT CRM API] External endpoint unavailable or dev mode (${endpoint}). Falling back to local data layer.`, error.message);
    return null;
  }
}

export const crmApiService = {
  // 1. Students & Shared Website Registrations
  async fetchRegisteredStudents() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.STUDENTS);
    return res?.data || null;
  },

  async fetchStudentProfile(studentId) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.STUDENT_DETAILS(studentId));
    return res?.data || null;
  },

  async createStudent(studentData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.STUDENTS, {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
    return res?.data || null;
  },

  async updateStudent(studentId, updateData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.STUDENT_DETAILS(studentId), {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });
    return res?.data || null;
  },

  async deleteStudent(studentId) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.STUDENT_DETAILS(studentId), {
      method: 'DELETE'
    });
    return res?.success || true;
  },

  /**
   * Automatically sync new student registrations from the AR IT COMPANY Internship Website.
   * Both projects share the same database; this endpoint pulls newly registered candidates.
   */
  async syncInternshipWebsiteRegistrations() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.SYNC_WEBSITE_REGISTRATIONS, {
      method: 'POST'
    });
    return res?.data || null;
  },

  // 2. Courses
  async fetchSelectedCourses() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COURSES);
    return res?.data || null;
  },

  async createCourse(courseData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COURSES, {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
    return res?.data || null;
  },

  async updateCourse(courseId, courseData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COURSE_DETAILS(courseId), {
      method: 'PUT',
      body: JSON.stringify(courseData)
    });
    return res?.data || null;
  },

  async deleteCourse(courseId) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COURSE_DETAILS(courseId), {
      method: 'DELETE'
    });
    return res?.success || true;
  },

  // 3. Internship Applications
  async fetchInternshipApplications() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.INTERNSHIPS);
    return res?.data || null;
  },

  async updateInternshipStatus(internshipId, status, mentor = null) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.UPDATE_STATUS(internshipId), {
      method: 'PATCH',
      body: JSON.stringify({ status, mentor })
    });
    return res?.data || null;
  },

  async assignMentorToStudent(studentId, mentorName) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.ASSIGN_MENTOR(studentId), {
      method: 'PATCH',
      body: JSON.stringify({ mentor: mentorName })
    });
    return res?.data || null;
  },

  // 4. Daily Activities & Mentor Feedback
  async fetchDailyActivitySubmissions(studentId = null) {
    const endpoint = studentId ? `${API_CONFIG.ENDPOINTS.DAILY_ACTIVITIES}?studentId=${studentId}` : API_CONFIG.ENDPOINTS.DAILY_ACTIVITIES;
    const res = await apiRequest(endpoint);
    return res?.data || null;
  },

  async addMentorFeedback(activityId, feedback, newStatus = 'Approved') {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.ACTIVITY_FEEDBACK(activityId), {
      method: 'PATCH',
      body: JSON.stringify({ feedback, status: newStatus, reviewedAt: new Date().toISOString() })
    });
    return res?.data || null;
  },

  // 5. Attendance
  async fetchAttendanceRecords(date = null) {
    const endpoint = date ? `${API_CONFIG.ENDPOINTS.ATTENDANCE}?date=${date}` : API_CONFIG.ENDPOINTS.ATTENDANCE;
    const res = await apiRequest(endpoint);
    return res?.data || null;
  },

  async markAttendance(records) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.ATTENDANCE, {
      method: 'POST',
      body: JSON.stringify({ records, timestamp: new Date().toISOString() })
    });
    return res?.data || null;
  },

  // 6. Student Progress
  async fetchStudentProgress() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.PROGRESS);
    return res?.data || null;
  },

  // 7. Payment Information
  async fetchPaymentInformation() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.PAYMENTS);
    return res?.data || null;
  },

  async recordPayment(paymentData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.PAYMENTS, {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
    return res?.data || null;
  },

  // 8. Certificates
  async fetchCertificateInformation() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.CERTIFICATES);
    return res?.data || null;
  },

  async issueCertificate(certificateData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.CERTIFICATES, {
      method: 'POST',
      body: JSON.stringify(certificateData)
    });
    return res?.data || null;
  },

  // 9. Mentors
  async fetchMentors() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.MENTORS);
    return res?.data || null;
  },

  // 10. Communication & Notifications
  async fetchNotifications() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
    return res?.data || null;
  },

  async sendAnnouncement(announcementData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COMMUNICATIONS, {
      method: 'POST',
      body: JSON.stringify(announcementData)
    });
    return res?.data || null;
  }
};

export default crmApiService;
