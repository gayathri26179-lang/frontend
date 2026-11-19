import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

const CourseModal = ({ isOpen, onClose, courseToEdit = null }) => {
  const { addCourse, updateCourse } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: 'Alex Carter',
    duration: '30 Hours (5 Weeks)',
    lessonsCount: 20,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
  });

  useEffect(() => {
    if (courseToEdit) {
      setFormData(courseToEdit);
    } else {
      setFormData({
        title: '',
        description: '',
        instructor: 'Alex Carter',
        duration: '30 Hours (5 Weeks)',
        lessonsCount: 20,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
      });
    }
  }, [courseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (courseToEdit) {
      updateCourse(courseToEdit.id, formData);
    } else {
      addCourse(formData);
    }
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1100 }}
    >
      <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden" style={{ maxWidth: '520px' }}>
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
          <h5 className="m-0 fw-bold text-dark">
            {courseToEdit ? `Edit Course: ${courseToEdit.id}` : 'Add New Cohort Course'}
          </h5>
          <button onClick={onClose} className="btn btn-sm btn-light rounded-circle p-1">
            <X size={20} className="text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
              Course Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="e.g. Next.js 15 & Server Actions Mastery"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
              Course Description
            </label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Summary of learning outcomes, prerequisites, and skills..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Instructor Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Course Duration
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="e.g. 40 Hours (6 Weeks)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Total Lessons
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="form-control py-2"
                value={formData.lessonsCount}
                onChange={(e) => setFormData({ ...formData, lessonsCount: parseInt(e.target.value) || 20 })}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Cover Image URL
              </label>
              <input
                type="url"
                className="form-control py-2"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" onClick={onClose} className="btn btn-light px-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4 fw-semibold">
              {courseToEdit ? 'Save Changes' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
