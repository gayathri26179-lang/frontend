import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  UserCheck,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Users,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  Award
} from 'lucide-react';

const CRMMentorsPage = () => {
  const { mentors, students, addMentor, updateMentor, deleteMentor } = useCRM();

  const [showMentorModal, setShowMentorModal] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [selectedMentorForView, setSelectedMentorForView] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: 'Full Stack & Cloud Architecture',
    assignedCourse: 'Full Stack Development',
    experience: '6+ Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const handleOpenAdd = () => {
    setEditingMentor(null);
    setFormData({
      name: '',
      email: '',
      phone: '+91 98000 11223',
      specialization: 'Full Stack & Cloud Architecture',
      assignedCourse: 'Full Stack Development',
      experience: '6+ Years',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    });
    setShowMentorModal(true);
  };

  const handleOpenEdit = (mentor) => {
    setEditingMentor(mentor);
    setFormData({
      name: mentor.name,
      email: mentor.email,
      phone: mentor.phone,
      specialization: mentor.specialization,
      assignedCourse: mentor.assignedCourse,
      experience: mentor.experience,
      avatar: mentor.avatar
    });
    setShowMentorModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingMentor) {
      updateMentor(editingMentor.id, formData);
    } else {
      addMentor(formData);
    }
    setShowMentorModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove mentor ${name}?`)) {
      deleteMentor(id);
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Mentor Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Faculty supervision, mentor allocations, student assignments, and evaluation activity tracking
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={handleOpenAdd}
        >
          <Plus size={15} />
          <span>Add Mentor</span>
        </button>
      </div>

      {/* Mentors Grid */}
      <div className="row g-4 mb-4">
        {mentors.map((mentor) => {
          const assignedStudents = students.filter(s => s.mentor === mentor.name);

          return (
            <div key={mentor.id} className="col-12 col-md-6 col-xl-4">
              <div className="crm-card h-100 mb-0 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="rounded-circle border"
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderColor: 'var(--crm-purple)' }}
                    />
                    <div>
                      <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '16px' }}>
                        {mentor.name}
                      </h4>
                      <span className="badge rounded-pill text-white mt-1" style={{ backgroundColor: 'var(--crm-purple)', fontSize: '10.5px' }}>
                        {mentor.specialization}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-3 bg-light border mb-3" style={{ fontSize: '12px' }}>
                    <div className="d-flex align-items-center gap-1 mb-1 text-muted">
                      <Mail size={13} />
                      <span className="text-truncate">{mentor.email}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 mb-1 text-muted">
                      <Phone size={13} />
                      <span>{mentor.phone}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-muted">
                      <BookOpen size={13} />
                      <span>Assigned Course: <strong>{mentor.assignedCourse}</strong></span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between py-2 border-top border-bottom mb-3" style={{ fontSize: '12px' }}>
                    <span className="text-muted">Experience: <strong>{mentor.experience}</strong></span>
                    <span className="fw-bold text-dark d-flex align-items-center gap-1">
                      <Users size={14} style={{ color: 'var(--crm-purple)' }} />
                      <span>{assignedStudents.length} Active Mentees</span>
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary py-1 px-2.5"
                    style={{ fontSize: '12px' }}
                    onClick={() => setSelectedMentorForView(mentor)}
                  >
                    <Eye size={13} className="me-1" />
                    View Mentees
                  </button>

                  <div className="d-flex align-items-center gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border p-1 text-primary"
                      onClick={() => handleOpenEdit(mentor)}
                      title="Edit Mentor"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border p-1 text-danger"
                      onClick={() => handleDelete(mentor.id, mentor.name)}
                      title="Delete Mentor"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Mentor Modal */}
      {showMentorModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowMentorModal(false)}>
          <div className="crm-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                {editingMentor ? `Edit Mentor: ${editingMentor.name}` : 'Onboard New Faculty Mentor'}
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowMentorModal(false)} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="crm-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Mentor Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Rajesh K. Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Specialization</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Full Stack & Cloud Architecture"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Assigned Primary Course</label>
                    <select
                      className="form-select"
                      value={formData.assignedCourse}
                      onChange={(e) => setFormData({ ...formData, assignedCourse: e.target.value })}
                    >
                      <option value="Full Stack Development">Full Stack Development</option>
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="Backend Development">Backend Development</option>
                      <option value="Python Programming">Python Programming</option>
                      <option value="Java Programming">Java Programming</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Web Development">Web Development</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Experience</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 8+ Years"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Avatar Photo URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  />
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowMentorModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <CheckCircle size={14} />
                  <span>{editingMentor ? 'Save Changes' : 'Onboard Mentor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Mentor's Mentees Modal */}
      {selectedMentorForView && (
        <div className="crm-modal-backdrop" onClick={() => setSelectedMentorForView(null)}>
          <div className="crm-modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Assigned Students: {selectedMentorForView.name}
              </h3>
              <button type="button" className="btn-close" onClick={() => setSelectedMentorForView(null)} />
            </div>

            <div className="crm-modal-body">
              <div className="d-flex flex-column gap-2">
                {students.filter(s => s.mentor === selectedMentorForView.name).length === 0 ? (
                  <div className="p-4 text-center text-muted">
                    No students currently assigned to this mentor.
                  </div>
                ) : (
                  students
                    .filter(s => s.mentor === selectedMentorForView.name)
                    .map(student => (
                      <div key={student.id} className="p-3 rounded-3 border d-flex align-items-center justify-content-between bg-light">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="rounded-circle"
                            style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong className="text-dark d-block" style={{ fontSize: '13px' }}>{student.name}</strong>
                            <span className="text-muted" style={{ fontSize: '11px' }}>{student.id} &bull; {student.course}</span>
                          </div>
                        </div>

                        <div className="text-end">
                          <span className="badge bg-primary text-white" style={{ fontSize: '11px' }}>
                            {student.progress}% Progress
                          </span>
                          <div className="text-muted" style={{ fontSize: '10.5px' }}>
                            {student.attendance}% Attendance
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="crm-modal-footer">
              <button
                type="button"
                className="crm-btn crm-btn-outline crm-btn-sm"
                onClick={() => setSelectedMentorForView(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMMentorsPage;
