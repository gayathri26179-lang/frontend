import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CheckSquare,
  ExternalLink,
  Check,
  X,
  MessageSquare,
  AlertCircle,
  FileCode,
  Calendar,
  Clock
} from 'lucide-react';

const CRMPendingTasks = ({ onOpenSubmissionReview }) => {
  const { pendingTasks, approveTask, rejectTask } = useCRM();

  const [reviewModalTask, setReviewModalTask] = useState(null);
  const [mentorFeedback, setMentorFeedback] = useState('');

  const handleOpenReview = (task) => {
    setReviewModalTask(task);
    setMentorFeedback('');
  };

  const handleApprove = (taskId) => {
    approveTask(taskId, mentorFeedback || 'Approved with distinction. Clean and well-architected.');
    setReviewModalTask(null);
  };

  const handleReject = (taskId) => {
    rejectTask(taskId, mentorFeedback || 'Requires revision. Please follow guidelines.');
    setReviewModalTask(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="crm-badge active"><Check size={12} /> Approved</span>;
      case 'Needs Re-work':
        return <span className="crm-badge pending"><AlertCircle size={12} /> Needs Re-work</span>;
      case 'In Review':
        return <span className="crm-badge on-leave"><Clock size={12} /> In Review</span>;
      default:
        return <span className="crm-badge on-leave"><Clock size={12} /> Pending Review</span>;
    }
  };

  return (
    <div className="crm-card mb-4">
      <div className="crm-card-header">
        <div>
          <h2 className="crm-card-title">
            <CheckSquare size={18} className="text-primary" />
            <span>Pending Tasks & Student Submissions</span>
          </h2>
          <div className="crm-card-subtitle">
            Review code repositories, verify milestone requirements, and award grades
          </div>
        </div>
      </div>

      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Student Name</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th className="text-end">Review Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <div className="fw-semibold text-dark">{task.taskName}</div>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span className="badge bg-light text-secondary border" style={{ fontSize: '10px' }}>
                      {task.course}
                    </span>
                    {task.repoUrl && (
                      <a
                        href={task.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary d-inline-flex align-items-center gap-1 text-decoration-none"
                        style={{ fontSize: '11px' }}
                      >
                        <FileCode size={12} />
                        <span>Repo</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </td>
                <td>
                  <div className="fw-medium text-dark">{task.studentName}</div>
                  <div className="text-muted font-monospace" style={{ fontSize: '11px' }}>{task.studentId}</div>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '12px' }}>
                    <Calendar size={13} />
                    <span>{task.assignedDate}</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    Due: {task.dueDate}
                  </div>
                </td>
                <td>
                  {getStatusBadge(task.status)}
                </td>
                <td className="text-end">
                  <div className="d-inline-flex align-items-center gap-1">
                    <button
                      type="button"
                      className="crm-btn crm-btn-secondary crm-btn-sm"
                      onClick={() => handleOpenReview(task)}
                      title="Inspect Submission & Feedback"
                    >
                      <MessageSquare size={13} />
                      <span>Review</span>
                    </button>
                    {task.status !== 'Approved' && (
                      <button
                        type="button"
                        className="crm-btn crm-btn-primary crm-btn-sm"
                        style={{ background: '#10b981', borderColor: '#10b981' }}
                        onClick={() => handleApprove(task.id)}
                        title="Quick Approve"
                      >
                        <Check size={14} />
                        <span>Approve</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Submission Modal */}
      {reviewModalTask && (
        <div className="crm-modal-backdrop" onClick={() => setReviewModalTask(null)}>
          <div className="crm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '16px', color: '#1e1b4b' }}>
                  Review Submission: {reviewModalTask.taskName}
                </h3>
                <div className="text-muted" style={{ fontSize: '12px' }}>
                  Submitted by {reviewModalTask.studentName} ({reviewModalTask.studentId})
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setReviewModalTask(null)}
              />
            </div>

            <div className="crm-modal-body">
              <div className="mb-3 p-3 rounded-3 bg-light border">
                <div className="fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>
                  Student Notes & Deliverables:
                </div>
                <p className="text-muted mb-2" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  {reviewModalTask.notes || 'No extra notes provided by student.'}
                </p>

                <div className="d-flex flex-wrap gap-2 pt-2 border-top">
                  {reviewModalTask.repoUrl && (
                    <a
                      href={reviewModalTask.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-1 rounded-2"
                      style={{ fontSize: '12px' }}
                    >
                      <FileCode size={14} />
                      <span>View GitHub Repository</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {reviewModalTask.demoUrl && (
                    <a
                      href={reviewModalTask.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 rounded-2"
                      style={{ fontSize: '12px' }}
                    >
                      <ExternalLink size={14} />
                      <span>Live App Preview</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="crm-form-group">
                <label className="crm-form-label">
                  Mentor Assessment & Feedback
                </label>
                <textarea
                  className="crm-form-control"
                  rows="3"
                  placeholder="Provide structured constructive feedback or notes for revision..."
                  value={mentorFeedback}
                  onChange={(e) => setMentorFeedback(e.target.value)}
                />
              </div>
            </div>

            <div className="crm-modal-footer">
              <button
                type="button"
                className="crm-btn crm-btn-outline crm-btn-sm"
                onClick={() => setReviewModalTask(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="crm-btn crm-btn-sm"
                style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                onClick={() => handleReject(reviewModalTask.id)}
              >
                <X size={14} />
                <span>Request Re-work</span>
              </button>
              <button
                type="button"
                className="crm-btn crm-btn-primary crm-btn-sm"
                style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
                onClick={() => handleApprove(reviewModalTask.id)}
              >
                <Check size={14} />
                <span>Approve & Award Distinction</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMPendingTasks;
