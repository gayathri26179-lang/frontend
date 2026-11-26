import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { X, UserPlus, Check, Building, MapPin, Mail, Phone, Calendar } from 'lucide-react';

const CRMStudentModal = ({ isOpen, onClose, studentToEdit }) => {
  const { addStudent, updateStudent, courses, mentors } = useCRM();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    college: '',
    course: 'Full Stack Development',
    duration: '6 Months',
    registrationDate: new Date().toISOString().split('T')[0],
    internshipStatus: 'Active',
    totalFee: 35000,
    paidAmount: 35000,
    mentor: 'Rajesh K. Sharma',
    mode: 'Hybrid (Bangalore Campus + Online)'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        address: studentToEdit.address || '',
        college: studentToEdit.college || '',
        course: studentToEdit.course || 'Full Stack Development',
        duration: studentToEdit.duration || '6 Months',
        registrationDate: studentToEdit.registrationDate || new Date().toISOString().split('T')[0],
        internshipStatus: studentToEdit.internshipStatus || 'Active',
        totalFee: studentToEdit.totalFee || 35000,
        paidAmount: studentToEdit.paidAmount || 35000,
        mentor: studentToEdit.mentor || 'Rajesh K. Sharma',
        mode: studentToEdit.mode || 'Hybrid (Bangalore Campus + Online)'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        college: '',
        course: 'Full Stack Development',
        duration: '6 Months',
        registrationDate: new Date().toISOString().split('T')[0],
        internshipStatus: 'Active',
        totalFee: 35000,
        paidAmount: 35000,
        mentor: 'Rajesh K. Sharma',
        mode: 'Hybrid (Bangalore Campus + Online)'
      });
    }
    setError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide student full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
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
      <div
        className="crm-modal-card"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crm-modal-header">
          <h3 className="fw-bold mb-0" style={{ fontSize: '17px', color: 'var(--crm-navy)' }}>
            {studentToEdit ? `Edit Student: ${studentToEdit.name}` : 'Register New Student (AR IT COMPANY)'}
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
              {/* Full Name */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="aarav.sharma@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* College / University */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  College / Institute
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. RV College of Engineering"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
              </div>

              {/* Residential Address */}
              <div className="col-12">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Residential Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 42, Brigade Road, Shanthi Nagar, Bangalore - 560025"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              {/* Selected Course */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Selected Course *
                </label>
                <select
                  className="form-select"
                  value={formData.course}
                  onChange={(e) => {
                    const cName = e.target.value;
                    const matched = courses.find(c => c.name === cName);
                    setFormData({
                      ...formData,
                      course: cName,
                      totalFee: matched ? matched.fee : formData.totalFee,
                      duration: matched ? matched.duration : formData.duration
                    });
                  }}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Course Duration */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Duration
                </label>
                <select
                  className="form-select"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option value="3 Months">3 Months</option>
                  <option value="4 Months">4 Months</option>
                  <option value="5 Months">5 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
              </div>

              {/* Registration Date */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Registration Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.registrationDate}
                  onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                />
              </div>

              {/* Internship Status */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Internship Status
                </label>
                <select
                  className="form-select"
                  value={formData.internshipStatus}
                  onChange={(e) => setFormData({ ...formData, internshipStatus: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>

              {/* Assigned Mentor */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Assigned Mentor
                </label>
                <select
                  className="form-select"
                  value={formData.mentor}
                  onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                >
                  {mentors.map(m => (
                    <option key={m.id} value={m.name}>{m.name} ({m.specialization})</option>
                  ))}
                </select>
              </div>

              {/* Learning Mode */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Learning Mode
                </label>
                <select
                  className="form-select"
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                >
                  <option value="Hybrid (Bangalore Campus + Online)">Hybrid (Bangalore Campus + Online)</option>
                  <option value="Online Live">Online Live</option>
                  <option value="On-Campus In-Person">On-Campus In-Person</option>
                </select>
              </div>

              {/* Fees */}
              <div className="col-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Total Fee (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.totalFee}
                  onChange={(e) => setFormData({ ...formData, totalFee: Number(e.target.value) })}
                />
              </div>

              <div className="col-6">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12.5px' }}>
                  Amount Paid (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.paidAmount}
                  onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div className="crm-modal-footer">
            <button
              type="button"
              className="crm-btn crm-btn-outline crm-btn-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="crm-btn crm-btn-primary crm-btn-sm"
            >
              <Check size={14} />
              <span>{studentToEdit ? 'Save Changes' : 'Register Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CRMStudentModal;
