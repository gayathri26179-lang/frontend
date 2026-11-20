import React from 'react';
import {
  X,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  CreditCard,
  Mail,
  Phone,
  User,
  ShieldCheck,
  TrendingUp,
  Download
} from 'lucide-react';

const CRMStudentProfileModal = ({ student, onClose, onGenerateCert }) => {
  if (!student) return null;

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header Profile Banner */}
        <div
          className="p-4 text-white position-relative rounded-top"
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4f46e5 100%)',
            borderTopLeftRadius: 'var(--crm-radius-lg)',
            borderTopRightRadius: 'var(--crm-radius-lg)'
          }}
        >
          <button
            type="button"
            className="btn btn-link text-white position-absolute top-0 end-0 p-3"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="rounded-circle border border-3 border-white shadow-sm"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            <div className="text-center text-sm-start">
              <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                <h2 className="fw-bold mb-0 text-white" style={{ fontSize: '22px' }}>
                  {student.name}
                </h2>
                <span className="badge bg-white bg-opacity-25 text-white" style={{ fontSize: '11px' }}>
                  {student.id}
                </span>
              </div>
              <div className="text-light opacity-75" style={{ fontSize: '13px' }}>
                {student.course} • Cohort 2026
              </div>
              <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 mt-2" style={{ fontSize: '12px' }}>
                <span className="d-flex align-items-center gap-1 opacity-90">
                  <Mail size={13} /> {student.email}
                </span>
                <span className="d-flex align-items-center gap-1 opacity-90">
                  <Phone size={13} /> {student.phone || '+91 98765 43210'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body with Detailed Sections */}
        <div className="crm-modal-body p-4">
          {/* Key KPI Chips */}
          <div className="row g-3 mb-4">
            <div className="col-4">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Curriculum Progress
                </div>
                <div className="fw-bold fs-4 text-primary mt-1">{student.progress}%</div>
                <div className="crm-progress-track mt-2">
                  <div className="crm-progress-fill" style={{ width: `${student.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Attendance Rate
                </div>
                <div className="fw-bold fs-4 text-success mt-1">{student.attendance}%</div>
                <div className="text-muted" style={{ fontSize: '11px' }}>Excellent Consistency</div>
              </div>
            </div>

            <div className="col-4">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Tasks Completed
                </div>
                <div className="fw-bold fs-4 text-purple mt-1" style={{ color: '#8b5cf6' }}>
                  {student.tasksCompleted}/{student.totalTasks || 45}
                </div>
                <div className="text-muted" style={{ fontSize: '11px' }}>Assignments</div>
              </div>
            </div>
          </div>

          {/* Academic Details & Mentor */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="p-3 rounded-3 border h-100">
                <div className="fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: '14px' }}>
                  <BookOpen size={16} className="text-primary" />
                  <span>Program Information</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Specialization:</span>
                  <span className="fw-semibold">{student.course}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Duration:</span>
                  <span className="fw-semibold">{student.duration}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Enrolled Date:</span>
                  <span className="fw-semibold">{student.enrolledDate || '2026-06-15'}</span>
                </div>
                <div className="d-flex justify-content-between py-1" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Assigned Mentor:</span>
                  <span className="fw-semibold text-primary">{student.mentor || 'Alex Carter'}</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 rounded-3 border h-100">
                <div className="fw-bold text-dark d-flex align-items-center gap-2 mb-2" style={{ fontSize: '14px' }}>
                  <CreditCard size={16} className="text-warning" />
                  <span>Financial & Tuition Status</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Total Tuition:</span>
                  <span className="fw-semibold">${student.totalFee || 1500}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Amount Paid:</span>
                  <span className="fw-semibold text-success">${student.paidAmount || 1500}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Balance Due:</span>
                  <span className="fw-semibold text-danger">
                    ${Math.max(0, (student.totalFee || 1500) - (student.paidAmount || 1500))}
                  </span>
                </div>
                <div className="d-flex justify-content-between py-1" style={{ fontSize: '12px' }}>
                  <span className="text-muted">Status:</span>
                  <span className="badge bg-success bg-opacity-10 text-success">
                    {student.feeStatus || 'Paid in Full'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Section */}
          <div className="p-3 rounded-3 border" style={{ backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <Award size={22} />
                </div>
                <div>
                  <div className="fw-bold" style={{ fontSize: '14px', color: '#1e1b4b' }}>
                    {student.certificateIssued ? 'Certificate of Completion Issued' : 'Eligible for Certificate Generation'}
                  </div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>
                    {student.certificateIssued
                      ? `Credential ID: ${student.certificateId}`
                      : `${student.progress}% Course Complete • Verified projects approved`}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="crm-btn crm-btn-primary crm-btn-sm"
                  onClick={() => {
                    onClose();
                    onGenerateCert(student);
                  }}
                >
                  <Award size={14} />
                  <span>{student.certificateIssued ? 'View Certificate' : 'Issue Certificate'}</span>
                </button>
              </div>
            </div>
          </div>
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
