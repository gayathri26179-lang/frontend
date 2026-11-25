import React, { useState } from 'react';
import {
  X,
  User,
  BookOpen,
  CreditCard,
  CalendarCheck,
  CheckSquare,
  TrendingUp,
  Award,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMStudentProfileModal = ({ student, onClose, onGenerateCert }) => {
  const { dailyActivities, attendance, payments, certificates, generateCertificate } = useCRM();
  const [activeTab, setActiveTab] = useState('personal'); // 7 tabs

  if (!student) return null;

  // Filter entities belonging to this student
  const studentActivities = dailyActivities.filter(a => a.studentId === student.id);
  const studentAttendance = attendance.filter(a => a.studentId === student.id);
  const studentPayments = payments.filter(p => p.studentId === student.id);
  const studentCertificate = certificates.find(c => c.studentId === student.id);

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div
        className="crm-modal-card"
        style={{ maxWidth: '820px', width: '95%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Banner */}
        <div
          className="p-4 text-white position-relative"
          style={{
            background: 'linear-gradient(135deg, #172554 0%, #7045B5 70%, #1e1b4b 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <button
            type="button"
            className="btn btn-link text-white position-absolute top-0 end-0 p-3"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="rounded-circle border border-3 border-white shadow-sm"
              style={{ width: '76px', height: '76px', objectFit: 'cover' }}
            />
            <div className="text-center text-sm-start flex-grow-1">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                <h2 className="fw-bold mb-0 text-white" style={{ fontSize: '20px' }}>
                  {student.name}
                </h2>
                <span
                  className="badge px-2.5 py-1 rounded-pill"
                  style={{ backgroundColor: 'var(--crm-pink)', color: 'var(--crm-navy)', fontSize: '11px', fontWeight: 700 }}
                >
                  {student.id}
                </span>
                <span
                  className={`badge px-2.5 py-1 rounded-pill ${student.internshipStatus === 'Completed' ? 'bg-success' : 'bg-primary'}`}
                  style={{ fontSize: '11px' }}
                >
                  {student.internshipStatus}
                </span>
              </div>

              <div className="text-light opacity-90" style={{ fontSize: '13px' }}>
                {student.course} &bull; Mentor: {student.mentor}
              </div>

              <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 mt-2 text-white-50" style={{ fontSize: '12px' }}>
                <span className="d-flex align-items-center gap-1 text-light opacity-80">
                  <Mail size={12} /> {student.email}
                </span>
                <span className="d-flex align-items-center gap-1 text-light opacity-80">
                  <Phone size={12} /> {student.phone}
                </span>
                <span className="d-flex align-items-center gap-1 text-light opacity-80">
                  <Building size={12} /> {student.college}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Profile Tabs Navigation */}
        <div className="px-4 pt-3 bg-white border-bottom">
          <div className="crm-tabs-nav mb-0">
            {[
              { id: 'personal', label: 'Personal Information', icon: User },
              { id: 'course', label: 'Course Details', icon: BookOpen },
              { id: 'payment', label: 'Payment Details', icon: CreditCard },
              { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
              { id: 'activities', label: 'Daily Activities', icon: CheckSquare },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'certificates', label: 'Certificates', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`crm-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="crm-modal-body p-4" style={{ minHeight: '340px' }}>
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'personal' && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Full Name</div>
                  <strong className="text-dark" style={{ fontSize: '14px' }}>{student.name}</strong>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Student ID</div>
                  <strong className="text-dark" style={{ fontSize: '14px' }}>{student.id}</strong>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Email Address</div>
                  <span className="text-dark" style={{ fontSize: '13.5px' }}>{student.email}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Phone Number</div>
                  <span className="text-dark" style={{ fontSize: '13.5px' }}>{student.phone}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Residential Address</div>
                  <span className="text-dark d-flex align-items-center gap-1" style={{ fontSize: '13.5px' }}>
                    <MapPin size={14} className="text-danger flex-shrink-0" />
                    {student.address}
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>College / University</div>
                  <span className="text-dark" style={{ fontSize: '13.5px' }}>{student.college}</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Registration Date</div>
                  <span className="text-dark" style={{ fontSize: '13.5px' }}>{student.registrationDate}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Learning Mode</div>
                  <span className="text-dark" style={{ fontSize: '13.5px' }}>{student.mode}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COURSE DETAILS */}
          {activeTab === 'course' && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Selected Course</div>
                  <strong className="text-dark" style={{ fontSize: '15px' }}>{student.course}</strong>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Course Duration</div>
                  <strong className="text-dark" style={{ fontSize: '15px' }}>{student.duration}</strong>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Assigned Mentor</div>
                  <strong style={{ color: 'var(--crm-purple)', fontSize: '14px' }}>{student.mentor}</strong>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="text-muted mb-1" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Internship Cohort</div>
                  <strong className="text-dark" style={{ fontSize: '14px' }}>Cohort 2026 Batch A</strong>
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 rounded-3 border" style={{ backgroundColor: '#FAF5FF', borderColor: 'var(--crm-purple-border)' }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--crm-navy)', fontSize: '13.5px' }}>Curriculum Scope</h6>
                  <p className="text-secondary mb-0" style={{ fontSize: '12.5px', lineHeight: '1.6' }}>
                    Hands-on industry projects, Git version control workflow, weekly standup demos, peer code reviews, continuous feedback, and verified certification on successful capstone evaluation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT DETAILS */}
          {activeTab === 'payment' && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-4">
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Total Course Fee</div>
                    <div className="fw-bold fs-5 mt-1" style={{ color: 'var(--crm-navy)' }}>
                      ₹{student.totalFee.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Amount Paid</div>
                    <div className="fw-bold fs-5 text-success mt-1">
                      ₹{student.paidAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Pending Balance</div>
                    <div className={`fw-bold fs-5 mt-1 ${student.pendingAmount > 0 ? 'text-warning' : 'text-muted'}`}>
                      ₹{student.pendingAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: '13px' }}>Transaction Receipts</h6>
              {studentPayments.length === 0 ? (
                <div className="p-3 text-center text-muted bg-light rounded-3" style={{ fontSize: '12.5px' }}>
                  No payment transactions logged yet for this student.
                </div>
              ) : (
                <div className="crm-table-container">
                  <table className="crm-table">
                    <thead>
                      <tr>
                        <th>Receipt ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentPayments.map(p => (
                        <tr key={p.id}>
                          <td><strong>{p.receiptNo || p.id}</strong></td>
                          <td>{p.paymentDate}</td>
                          <td><strong>₹{p.amountPaid.toLocaleString('en-IN')}</strong></td>
                          <td>{p.method}</td>
                          <td>
                            <span className="crm-badge crm-badge-paid">{p.paymentStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-4">
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Attendance Rate</div>
                    <div className="fw-bold fs-4 text-success mt-1">{student.attendance}%</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>Complies with 80% criteria</div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Total Days Tracked</div>
                    <div className="fw-bold fs-4 text-dark mt-1">45 Days</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>Current Cohort Duration</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Status Indicator</div>
                    <div className="fw-bold fs-4 mt-1" style={{ color: 'var(--crm-purple)' }}>Consistent</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>Eligible for Certification</div>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: '13px' }}>Recent Attendance History</h6>
              {studentAttendance.length === 0 ? (
                <div className="p-3 text-center text-muted bg-light rounded-3" style={{ fontSize: '12.5px' }}>
                  Student has not missed any recorded sprint sessions.
                </div>
              ) : (
                <div className="crm-table-container">
                  <table className="crm-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Marked At</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentAttendance.map((rec, i) => (
                        <tr key={i}>
                          <td>{rec.date}</td>
                          <td>
                            <span className={`crm-badge ${rec.status === 'Present' ? 'crm-badge-active' : rec.status === 'Leave' ? 'crm-badge-pending' : 'crm-badge-rejected'}`}>
                              {rec.status}
                            </span>
                          </td>
                          <td>{rec.markedAt}</td>
                          <td>{rec.reason || 'Regular Session'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DAILY ACTIVITIES */}
          {activeTab === 'activities' && (
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '13.5px' }}>Submitted Daily Logs</h6>
                <span className="badge bg-light text-dark border" style={{ fontSize: '11.5px' }}>
                  {studentActivities.length} Submissions Logged
                </span>
              </div>

              {studentActivities.length === 0 ? (
                <div className="p-4 text-center text-muted bg-light rounded-3" style={{ fontSize: '13px' }}>
                  No daily activity logs submitted yet for this student.
                </div>
              ) : (
                <div className="d-flex flex-column gap-2.5">
                  {studentActivities.map(act => (
                    <div key={act.id} className="p-3 rounded-3 border bg-light">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <strong className="text-dark" style={{ fontSize: '13px' }}>
                          {act.dayNumber}: {act.taskTitle}
                        </strong>
                        <span className={`crm-badge ${act.taskStatus === 'Approved' ? 'crm-badge-active' : act.taskStatus === 'Needs Revision' ? 'crm-badge-rejected' : 'crm-badge-pending'}`}>
                          {act.taskStatus}
                        </span>
                      </div>
                      <p className="text-secondary mb-2" style={{ fontSize: '12.5px' }}>
                        {act.workDescription}
                      </p>
                      <div className="p-2 rounded-2 bg-white border" style={{ fontSize: '11.5px' }}>
                        <span className="fw-semibold text-dark">Mentor Feedback: </span>
                        <span className="text-muted">{act.mentorFeedback}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: PROGRESS */}
          {activeTab === 'progress' && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-12">
                  <div className="p-3 rounded-3 bg-light border">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-semibold text-dark" style={{ fontSize: '13.5px' }}>Overall Internship Completion</span>
                      <strong className="fs-5" style={{ color: 'var(--crm-purple)' }}>{student.progress}%</strong>
                    </div>
                    <div className="crm-progress-track mb-2">
                      <div className="crm-progress-fill" style={{ width: `${student.progress}%` }} />
                    </div>
                    <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11.5px' }}>
                      <span>Completed Tasks: <strong>{student.tasksCompleted} / {student.totalTasks}</strong></span>
                      <span>Target Milestone: Capstone Deployment</span>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: '13px' }}>Milestone Checklist</h6>
              <div className="list-group">
                {[
                  { title: 'Core Programming & Foundations', done: true },
                  { title: 'Framework Architecture & Component Design', done: student.progress >= 40 },
                  { title: 'Database Modeling & API Integration', done: student.progress >= 70 },
                  { title: 'Comprehensive Mini Project Submission', done: student.progress >= 85 },
                  { title: 'Production Capstone & Mentor Final Review', done: student.progress === 100 }
                ].map((m, idx) => (
                  <div key={idx} className="list-group-item d-flex align-items-center gap-2 py-2.5" style={{ fontSize: '12.5px' }}>
                    <CheckCircle size={15} style={{ color: m.done ? '#10B981' : '#CBD5E1' }} />
                    <span className={m.done ? 'text-dark fw-medium' : 'text-muted'}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div>
              {student.certificateIssued ? (
                <div className="p-4 rounded-3 border text-center" style={{ backgroundColor: '#FAF5FF', borderColor: 'var(--crm-purple-border)' }}>
                  <Award size={48} className="mb-2" style={{ color: 'var(--crm-purple)' }} />
                  <h5 className="fw-bold text-dark mb-1">Official Certificate Issued</h5>
                  <div className="text-secondary mb-2" style={{ fontSize: '13px' }}>
                    Certificate ID: <strong>{student.certificateId || studentCertificate?.id}</strong>
                  </div>
                  <p className="text-muted mb-3" style={{ fontSize: '12.5px', maxWidth: '460px', margin: '0 auto' }}>
                    This credential was officially verified and awarded under the authorized seal of AR IT COMPANY for completion of {student.course}.
                  </p>
                  <button
                    type="button"
                    className="crm-btn crm-btn-primary crm-btn-sm"
                    onClick={() => {
                      onClose();
                      onGenerateCert(student);
                    }}
                  >
                    <Download size={14} />
                    <span>View &amp; Download Verified PDF Certificate</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-3 bg-light border text-center">
                  <AlertCircle size={44} className="text-warning mb-2" />
                  <h6 className="fw-bold text-dark mb-1">Certificate Not Issued Yet</h6>
                  <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                    {student.internshipStatus === 'Completed'
                      ? 'Student has met all criteria and is eligible for digital certificate generation.'
                      : `Internship status is currently "${student.internshipStatus}". Completion of the full internship duration is strictly required before issuing an official certificate.`}
                  </p>
                  {student.internshipStatus === 'Completed' ? (
                    <button
                      type="button"
                      className="crm-btn crm-btn-primary crm-btn-sm"
                      onClick={() => {
                        generateCertificate(student.id, 'navy');
                      }}
                    >
                      <Award size={14} />
                      <span>Issue Official Certificate Now</span>
                    </button>
                  ) : (
                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill" style={{ fontSize: '12px' }}>
                      Completion Required
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="crm-modal-footer">
          <button type="button" className="crm-btn crm-btn-outline crm-btn-sm" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRMStudentProfileModal;
