import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

const TicketModal = ({ isOpen, onClose }) => {
  const { addTicket, currentUser } = useApp();

  const [formData, setFormData] = useState({
    issue: '',
    category: 'Technical Blocker',
    priority: 'Medium',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issue.trim()) return;

    addTicket({
      issue: formData.issue,
      category: formData.category,
      priority: formData.priority,
      description: formData.description,
      submittedBy: currentUser ? currentUser.name : 'Staff Member'
    });

    setFormData({
      issue: '',
      category: 'Technical Blocker',
      priority: 'Medium',
      description: ''
    });
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1100 }}
    >
      <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden" style={{ maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
          <h5 className="m-0 fw-bold text-dark">Raise Support / Blocker Ticket</h5>
          <button onClick={onClose} className="btn btn-sm btn-light rounded-circle p-1">
            <X size={20} className="text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
              Issue Summary / Headline <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="e.g. Database connection pool dropped during test"
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Category
              </label>
              <select
                className="form-select py-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Technical Blocker">Technical Blocker</option>
                <option value="Database & SQL">Database &amp; SQL</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Hardware / Device">Hardware / Device</option>
                <option value="Mentor Guidance">Mentor Guidance</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Priority Level
              </label>
              <select
                className="form-select py-2"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
              Detailed Description &amp; Reproduction Steps
            </label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Provide error logs, screenshots, or context..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" onClick={onClose} className="btn btn-light px-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4 fw-semibold">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
