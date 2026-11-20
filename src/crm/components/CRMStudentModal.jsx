import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, UserPlus, Check } from 'lucide-react';

const CRMStudentModal = ({ isOpen, onClose, studentToEdit }) => {
  const { addStudent, updateStudent } = useCRM();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Full Stack Development',
    duration: '6 Months',
    status: 'Active',
    totalFee: 1500,
    paidAmount: 1500,
    mentor: 'Alex Carter'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        course: studentToEdit.course || 'Full Stack Development',
        duration: studentToEdit.duration || '6 Months',
        status: studentToEdit.status || 'Active',
        totalFee: studentToEdit.totalFee || 1500,
        paidAmount: studentToEdit.paidAmount || 1500,
        mentor: studentToEdit.mentor || 'Alex Carter'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: 'Full Stack Development',
        duration: '6 Months',
        status: 'Active',
        totalFee: 1500,
        paidAmount: 1500,
        mentor: 'Alex Carter'
      });
    }
    setError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide student name and email.');
      return;
    }

    if (studentToEdit) {
      updateStudent(studentToEdit.id, formData);
    } else {
      addStudent(formData);
    }
    onClose();
  };

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <h3 className="fw-bold mb-0" style={{ fontSize: '17px', color: '#1e1b4b' }}>
            {studentToEdit ? 'Edit Student Details' : 'Register New Student'}
          </h3>
          <button type="button" className="btn-close" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="crm-modal-body">
            {error && (
              <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '13px' }}>
                {error}
              </div>
            )}

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Full Name *</label>
                  <input
                    type="text"
                    className="crm-form-control"
                    placeholder="e.g. Maya Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Email Address *</label>
                  <input
                    type="email"
                    className="crm-form-control"
                    placeholder="maya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Phone Number</label>
                  <input
                    type="text"
                    className="crm-form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Course Track</label>
                  <select
                    className="crm-form-control"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  >
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Python">Python</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Duration</label>
                  <select
                    className="crm-form-control"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="4 Months">4 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Assigned Mentor</label>
                  <select
                    className="crm-form-control"
                    value={formData.mentor}
                    onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                  >
                    <option value="Alex Carter">Alex Carter (Full Stack Lead)</option>
                    <option value="Dr. Maya Raman">Dr. Maya Raman (AI Director)</option>
                    <option value="Priya Sharma">Priya Sharma (Data Science)</option>
                    <option value="Elena Vance">Elena Vance (Curriculum)</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Total Fee ($)</label>
                  <input
                    type="number"
                    className="crm-form-control"
                    value={formData.totalFee}
                    onChange={(e) => setFormData({ ...formData, totalFee: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Status</label>
                  <select
                    className="crm-form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="crm-modal-footer">
            <button type="button" className="crm-btn crm-btn-outline crm-btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
              <Check size={15} />
              <span>{studentToEdit ? 'Save Changes' : 'Register Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CRMStudentModal;
