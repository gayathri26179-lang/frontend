/**
 * AR IT COMPANY CRM - Unified API Service
 * 
 * Communicates directly with the backend REST API engine at http://localhost:5000/api.
 * Provides fallback tolerance to keep the UI interactive under any network condition.
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
 * Generic fetch wrapper with timeout, token headers, and error parsing
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

    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data?.message || `HTTP error ${response.status}`,
        error: data?.error || data?.message
      };
    }

    return data || { success: true };
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`[AR IT CRM API] Endpoint request failed (${endpoint}):`, error.message);
    return {
      success: false,
      isNetworkError: true,
      message: error.message
    };
  }
}

export const crmApiService = {
  // 0. Authentication & Role-Based Access
  async adminRegister(registerData) {
    return await apiRequest(API_CONFIG.ENDPOINTS.ADMIN_REGISTER, {
      method: 'POST',
      body: JSON.stringify(registerData)
    });
  },

  async adminLogin(email, password) {
    return await apiRequest(API_CONFIG.ENDPOINTS.ADMIN_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async mentorLogin(email, password) {
    return await apiRequest(API_CONFIG.ENDPOINTS.MENTOR_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async verifyToken() {
    return await apiRequest(API_CONFIG.ENDPOINTS.VERIFY_TOKEN);
  },

  // 1. Students & Shared Website Registrations
  async fetchRegisteredStudents(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `${API_CONFIG.ENDPOINTS.STUDENTS}?${query}` : API_CONFIG.ENDPOINTS.STUDENTS;
    const res = await apiRequest(endpoint);
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
    return res?.success !== false;
  },

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
    return res?.success !== false;
  },

  // 3. Internship Applications
  async fetchInternshipApplications(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `${API_CONFIG.ENDPOINTS.INTERNSHIPS}?${query}` : API_CONFIG.ENDPOINTS.INTERNSHIPS;
    const res = await apiRequest(endpoint);
    return res?.data || null;
  },

  async updateInternshipStatus(internshipId, status, mentor = null) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.UPDATE_STATUS(internshipId), {
      method: 'PATCH',
      body: JSON.stringify({ status, mentor })
    });
    return res?.data || null;
  },

  async assignMentorToStudent(internshipId, mentorName) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.ASSIGN_MENTOR(internshipId), {
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

  async createDailyActivity(activityData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.DAILY_ACTIVITIES, {
      method: 'POST',
      body: JSON.stringify(activityData)
    });
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

  async markAttendance(records, date = null) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.ATTENDANCE, {
      method: 'POST',
      body: JSON.stringify({ records, date, timestamp: new Date().toISOString() })
    });
    return res?.data || null;
  },

  async fetchAttendanceSummary() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.ATTENDANCE_SUMMARY);
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

  async fetchPaymentSummary() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.PAYMENT_SUMMARY);
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

  async verifyCertificate(code) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.VERIFY_CERTIFICATE(code));
    return res || null;
  },

  // 9. Mentors
  async fetchMentors() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.MENTORS);
    return res?.data || null;
  },

  async createMentor(mentorData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.MENTORS, {
      method: 'POST',
      body: JSON.stringify(mentorData)
    });
    return res?.data || null;
  },

  async updateMentor(mentorId, mentorData) {
    const res = await apiRequest(`${API_CONFIG.ENDPOINTS.MENTORS}/${mentorId}`, {
      method: 'PUT',
      body: JSON.stringify(mentorData)
    });
    return res?.data || null;
  },

  async deleteMentor(mentorId) {
    const res = await apiRequest(`${API_CONFIG.ENDPOINTS.MENTORS}/${mentorId}`, {
      method: 'DELETE'
    });
    return res?.success !== false;
  },

  // 10. Communication & Notifications
  async fetchNotifications() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
    return res?.data || null;
  },

  async markNotificationAsRead(id) {
    const res = await apiRequest(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/${id}/read`, {
      method: 'PATCH'
    });
    return res?.data || null;
  },

  async markAllNotificationsAsRead() {
    const res = await apiRequest(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/read-all`, {
      method: 'PATCH'
    });
    return res?.success !== false;
  },

  async fetchCommunications() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COMMUNICATIONS);
    return res?.data || null;
  },

  async sendAnnouncement(announcementData) {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.COMMUNICATIONS, {
      method: 'POST',
      body: JSON.stringify(announcementData)
    });
    return res?.data || null;
  },

  // 11. Reports & Analytics
  async fetchReports() {
    const res = await apiRequest(API_CONFIG.ENDPOINTS.REPORTS);
    return res?.data || null;
  }
};

export default crmApiService;
