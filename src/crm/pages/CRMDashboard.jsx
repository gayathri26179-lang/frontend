import React from 'react';
import { useCRM } from '../context/CRMContext';
import CRMOverviewCards from '../components/CRMOverviewCards';
import CRMStudentGrowthChart from '../components/CRMStudentGrowthChart';
import CRMCourseDistributionChart from '../components/CRMCourseDistributionChart';
import {
  CheckCircle,
  Clock,
  Award,
  CreditCard,
  Bell,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

const CRMDashboard = ({
  onOpenStudentProfile,
  onNavigateTab
}) => {
  const {
    students,
    internships,
    dailyActivities,
    payments,
    notifications,
    metrics
  } = useCRM();

  // 1. Recent Registrations (latest 5)
  const recentStudents = [...students].slice(0, 5);

  // 2. Recent Payments (latest 4)
  const recentPayments = [...payments].slice(0, 4);

  // 3. Recent Notifications (latest 4)
  const recentNotifications = [...notifications].slice(0, 4);

  // 4. Upcoming Internship Completions
  const upcomingCompletions = internships
    .filter(i => i.status === 'Ongoing' || i.status === 'Completed')
    .slice(0, 4);

  return (
    <div className="crm-dashboard-container">
      {/* 1. Summary Cards (8 KPI Cards) */}
      <section className="mb-4">
        <CRMOverviewCards />
      </section>

      {/* 2. Monthly Registration Analytics & Course-wise Enrollment Chart */}
      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-7">
          <CRMStudentGrowthChart />
        </div>
        <div className="col-12 col-xl-5">
          <CRMCourseDistributionChart />
        </div>
      </section>

      {/* 3. Student Activity Overview & Internship Progress Overview */}
      <section className="row g-4 mb-4">
        {/* Student Activity Overview */}
        <div className="col-12 col-lg-6">
          <div className="crm-card h-100 mb-0">
            <div className="crm-card-header">
              <div>
                <h2 className="crm-card-title">
                  <Clock size={18} style={{ color: 'var(--crm-purple)' }} />
                  <span>Student Activity Overview</span>
                </h2>
                <div className="crm-card-subtitle">
                  Latest daily activity submissions from active cohorts
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                onClick={() => onNavigateTab('daily-activities')}
              >
                <span>View All Activities</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="crm-activity-list">
              {dailyActivities.slice(0, 5).map(act => (
                <div
                  key={act.id}
                  className="p-3 mb-2 rounded-3 border d-flex align-items-start gap-3"
                  style={{ backgroundColor: '#FAF5FF', borderColor: 'var(--crm-purple-border)' }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: '36px',
                      height: '36px',
                      minWidth: '36px',
                      backgroundColor: 'var(--crm-purple)',
                      fontSize: '12px'
                    }}
                  >
                    {act.dayNumber.replace('Day ', 'D')}
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <strong className="text-dark text-truncate" style={{ fontSize: '13px' }}>
                        {act.studentName}
                      </strong>
                      <span
                        className={`crm-badge ${act.taskStatus === 'Approved' ? 'crm-badge-active' : act.taskStatus === 'Needs Revision' ? 'crm-badge-rejected' : 'crm-badge-pending'}`}
                        style={{ fontSize: '10px' }}
                      >
                        {act.taskStatus}
                      </span>
                    </div>
                    <div className="fw-semibold text-secondary mb-1" style={{ fontSize: '12px' }}>
                      {act.taskTitle}
                    </div>
                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: '11.5px' }}>
                      {act.workDescription}
                    </p>
                    <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '10.5px' }}>
                      <span>Course: {act.course}</span>
                      <span>&bull;</span>
                      <span>Mentor: {act.mentorName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Internship Progress Overview */}
        <div className="col-12 col-lg-6">
          <div className="crm-card h-100 mb-0">
            <div className="crm-card-header">
              <div>
                <h2 className="crm-card-title">
                  <TrendingUp size={18} style={{ color: 'var(--crm-navy)' }} />
                  <span>Internship Progress Overview</span>
                </h2>
                <div className="crm-card-subtitle">
                  Cohort completion velocity &amp; task milestones
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                onClick={() => onNavigateTab('progress')}
              >
                <span>Full Velocity Board</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {students.slice(0, 4).map(student => (
                <div
                  key={student.id}
                  className="p-3 rounded-3 border bg-light"
                  style={{ borderColor: 'var(--crm-border)' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong className="text-dark d-block" style={{ fontSize: '13px' }}>
                          {student.name}
                        </strong>
                        <span className="text-muted" style={{ fontSize: '11px' }}>
                          {student.course} ({student.id})
                        </span>
                      </div>
                    </div>
                    <span className="fw-bold" style={{ color: 'var(--crm-purple)', fontSize: '14px' }}>
                      {student.progress}%
                    </span>
                  </div>

                  <div className="crm-progress-track mb-2">
                    <div
                      className={`crm-progress-fill ${student.progress === 100 ? 'success' : ''}`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>

                  <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
                    <span>Tasks: {student.tasksCompleted} / {student.totalTasks}</span>
                    <span>Attendance: {student.attendance}%</span>
                    <span>Mentor: {student.mentor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recent Registrations & Upcoming Completions */}
      <section className="row g-4 mb-4">
        {/* Recent Registrations */}
        <div className="col-12 col-xl-6">
          <div className="crm-card h-100 mb-0">
            <div className="crm-card-header">
              <div>
                <h2 className="crm-card-title">
                  <UserCheck size={18} style={{ color: 'var(--crm-navy)' }} />
                  <span>Recent Registrations</span>
                </h2>
                <div className="crm-card-subtitle">
                  Enrolled through CRM &amp; Internship Website
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                onClick={() => onNavigateTab('students')}
              >
                <span>All Students</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="crm-table-container">
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="rounded-circle"
                            style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong className="text-dark d-block" style={{ fontSize: '12.5px' }}>
                              {student.name}
                            </strong>
                            <span className="text-muted" style={{ fontSize: '10.5px' }}>
                              {student.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '12px' }}>{student.course}</td>
                      <td style={{ fontSize: '11.5px' }}>{student.registrationDate}</td>
                      <td>
                        <span
                          className={`crm-badge ${student.internshipStatus === 'Completed' ? 'crm-badge-completed' : student.internshipStatus === 'Active' ? 'crm-badge-active' : 'crm-badge-pending'}`}
                          style={{ fontSize: '10px' }}
                        >
                          {student.internshipStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-light border py-0 px-2 text-dark"
                          style={{ fontSize: '11px', borderRadius: '4px' }}
                          onClick={() => onOpenStudentProfile(student)}
                        >
                          Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Internship Completions */}
        <div className="col-12 col-xl-6">
          <div className="crm-card h-100 mb-0">
            <div className="crm-card-header">
              <div>
                <h2 className="crm-card-title">
                  <Award size={18} style={{ color: 'var(--crm-pink)' }} />
                  <span>Upcoming Internship Completions</span>
                </h2>
                <div className="crm-card-subtitle">
                  Interns finishing final evaluation for certificate issuance
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                onClick={() => onNavigateTab('certificates')}
              >
                <span>Certificates</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="d-flex flex-column gap-2.5">
              {upcomingCompletions.map(intern => (
                <div
                  key={intern.id}
                  className="p-3 rounded-3 border d-flex align-items-center justify-content-between"
                  style={{ backgroundColor: '#FFFDF9', borderColor: '#FED7AA' }}
                >
                  <div>
                    <strong className="text-dark d-block" style={{ fontSize: '13px' }}>
                      {intern.studentName}
                    </strong>
                    <div className="text-secondary" style={{ fontSize: '11.5px' }}>
                      {intern.course} &bull; Mentor: {intern.mentor}
                    </div>
                    <div className="text-muted mt-1" style={{ fontSize: '11px' }}>
                      <Calendar size={12} className="me-1 d-inline" />
                      Target End Date: <strong>{intern.endDate}</strong>
                    </div>
                  </div>
                  <div className="text-end">
                    <span
                      className={`crm-badge ${intern.status === 'Completed' ? 'crm-badge-completed' : 'crm-badge-active'} mb-2 d-inline-block`}
                      style={{ fontSize: '10.5px' }}
                    >
                      {intern.status}
                    </span>
                    <div>
                      <span className="badge bg-light text-dark border" style={{ fontSize: '11px' }}>
                        {intern.evaluationGrade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recent Payments & Recent Notifications */}
      <section className="row g-4 mb-2">
        {/* Recent Payments */}
        <div className="col-12 col-xl-6">
          <div className="crm-card h-100 mb-0">
            <div className="crm-card-header">
              <div>
                <h2 className="crm-card-title">
                  <CreditCard size={18} style={{ color: 'var(--crm-success)' }} />
                  <span>Recent Payments</span>
                </h2>
                <div className="crm-card-subtitle">
                  Real-time transaction receipts and fee settlement
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                onClick={() => onNavigateTab('payments')}
              >
                <span>All Payments</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="crm-table-container">
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Student</th>
                    <th>Amount Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map(pay => (
                    <tr key={pay.id}>
                      <td>
                        <strong className="text-dark d-block" style={{ fontSize: '12px' }}>
                          {pay.id}
                        </strong>
                        <span className="text-muted" style={{ fontSize: '10.5px' }}>
                          {pay.paymentDate}
                        </span>
                      </td>
                      <td>
                        <span className="d-block text-dark fw-medium" style={{ fontSize: '12.5px' }}>
                          {pay.studentName}
                        </span>
                        <span className="text-muted" style={{ fontSize: '11px' }}>
                          {pay.course}
                        </span>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--crm-navy)', fontSize: '13px' }}>
                          ₹{pay.amountPaid.toLocaleString('en-IN')}
                        </strong>
                      </td>
                      <td>
                        <span
                          className={`crm-badge ${pay.paymentStatus === 'Paid' ? 'crm-badge-paid' : pay.paymentStatus === 'Partially Paid' ? 'crm-badge-partial' : 'crm-badge-pending'}`}
                          style={{ fontSize: '10px' }}
                        >
                          {pay.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="col-12 col-xl-6">
          <div className="crm-card h-100 mb-0">
            <div className="crm-card-header">
              <div>
                <h2 className="crm-card-title">
                  <Bell size={18} style={{ color: 'var(--crm-purple)' }} />
                  <span>Recent Notifications</span>
                </h2>
                <div className="crm-card-subtitle">
                  Automated alerts, student actions &amp; registration updates
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
                style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                onClick={() => onNavigateTab('notifications')}
              >
                <span>Notification Center</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="d-flex flex-column gap-2">
              {recentNotifications.map(notif => (
                <div
                  key={notif.id}
                  className="p-3 rounded-3 border d-flex align-items-start gap-3 bg-light"
                  style={{ borderColor: 'var(--crm-border)' }}
                >
                  <div
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: 'var(--crm-purple-soft)',
                      color: 'var(--crm-purple)'
                    }}
                  >
                    <Bell size={15} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <strong className="text-dark" style={{ fontSize: '13px' }}>
                        {notif.title}
                      </strong>
                      <span className="text-muted" style={{ fontSize: '10.5px' }}>
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-secondary mb-0" style={{ fontSize: '12px' }}>
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CRMDashboard;
