import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  MessageSquare,
  Send,
  Plus,
  Bell,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Mail,
  ShieldCheck
} from 'lucide-react';

const CRMCommunicationPage = () => {
  const { communications, addCommunication, courses } = useCRM();

  const [activeCategory, setActiveCategory] = useState('All');
  const [showComposeModal, setShowComposeModal] = useState(false);

  const [composeForm, setComposeForm] = useState({
    title: '',
    category: 'Internship Announcements',
    targetAudience: 'All Cohorts',
    content: ''
  });

  const categories = [
    'All',
    'Student Notifications',
    'Internship Announcements',
    'Course Announcements',
    'Activity Reminders',
    'Payment Reminders',
    'Certificate Notifications'
  ];

  const filteredCommunications = communications.filter(c =>
    activeCategory === 'All' || c.category === activeCategory
  );

  const handleComposeSubmit = (e) => {
    e.preventDefault();
    if (!composeForm.title.trim() || !composeForm.content.trim()) return;

    addCommunication(composeForm);
    setShowComposeModal(false);
    setComposeForm({
      title: '',
      category: 'Internship Announcements',
      targetAudience: 'All Cohorts',
      content: ''
    });
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Student Communication &amp; Broadcast Center
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Dispatch announcements, sprint reminders, fee notices, and automated email alerts across cohorts
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={() => setShowComposeModal(true)}
        >
          <Send size={14} />
          <span>Compose Announcement</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom overflow-x-auto">
          <div className="crm-tabs-nav mb-0">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`crm-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Communication Broadcasts List */}
        <div className="p-4">
          <div className="d-flex flex-column gap-3">
            {filteredCommunications.map((comm) => (
              <div
                key={comm.id}
                className="p-3.5 rounded-3 border bg-white shadow-sm"
                style={{ borderColor: 'var(--crm-border)' }}
              >
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="badge px-2.5 py-1 rounded-pill"
                      style={{ backgroundColor: 'var(--crm-purple-soft)', color: 'var(--crm-purple)', fontSize: '11px', fontWeight: 600 }}
                    >
                      {comm.category}
                    </span>
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '15px' }}>
                      {comm.title}
                    </h5>
                  </div>

                  <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                    <Clock size={12} />
                    {comm.sentDate}
                  </span>
                </div>

                <p className="text-secondary mb-3" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  {comm.content}
                </p>

                <div className="d-flex align-items-center justify-content-between pt-2 border-top text-muted" style={{ fontSize: '11.5px' }}>
                  <div className="d-flex align-items-center gap-3">
                    <span>Target: <strong>{comm.targetAudience}</strong></span>
                    <span>&bull;</span>
                    <span>Dispatched By: <strong>{comm.sentBy}</strong></span>
                  </div>

                  <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2 py-0.5" style={{ fontSize: '11px' }}>
                    Delivered &bull; Synced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compose Announcement Modal */}
      {showComposeModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowComposeModal(false)}>
          <div className="crm-modal-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Compose Student Broadcast
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowComposeModal(false)} />
            </div>

            <form onSubmit={handleComposeSubmit}>
              <div className="crm-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Subject / Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Weekly Sprint Review & Code Inspection"
                    value={composeForm.title}
                    onChange={(e) => setComposeForm({ ...composeForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Category</label>
                    <select
                      className="form-select"
                      value={composeForm.category}
                      onChange={(e) => setComposeForm({ ...composeForm, category: e.target.value })}
                    >
                      <option value="Internship Announcements">Internship Announcements</option>
                      <option value="Course Announcements">Course Announcements</option>
                      <option value="Activity Reminders">Activity Reminders</option>
                      <option value="Payment Reminders">Payment Reminders</option>
                      <option value="Certificate Notifications">Certificate Notifications</option>
                      <option value="Student Notifications">Student Notifications</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Target Audience</label>
                    <select
                      className="form-select"
                      value={composeForm.targetAudience}
                      onChange={(e) => setComposeForm({ ...composeForm, targetAudience: e.target.value })}
                    >
                      <option value="All Cohorts">All Cohorts</option>
                      <option value="Full Stack Development Batch">Full Stack Development Batch</option>
                      <option value="Frontend Development Batch">Frontend Development Batch</option>
                      <option value="Python Programming Batch">Python Programming Batch</option>
                      <option value="Students with Pending Balance">Students with Pending Balance</option>
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Message Body *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type broadcast announcement text..."
                    value={composeForm.content}
                    onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowComposeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <Send size={14} />
                  <span>Dispatch Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMCommunicationPage;
