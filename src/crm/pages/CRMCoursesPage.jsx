import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  BookOpen,
  Users,
  Clock,
  Plus,
  Layers,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  CreditCard,
  DollarSign
} from 'lucide-react';

const CRMCoursesPage = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCRM();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Development',
    duration: '3 Months',
    fee: 20000,
    status: 'Active',
    modulesCount: 16,
    image: '',
    description: ''
  });

  const categories = ['All', 'Full Stack', 'Web Development', 'Backend & Cloud', 'Programming & Data', 'Enterprise Software', 'Product Design'];

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      name: '',
      category: 'Web Development',
      duration: '3 Months',
      fee: 20000,
      status: 'Active',
      modulesCount: 16,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      description: ''
    });
    setShowCourseModal(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      category: course.category,
      duration: course.duration,
      fee: course.fee,
      status: course.status,
      modulesCount: course.modulesCount,
      image: course.image,
      description: course.description
    });
    setShowCourseModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    setShowCourseModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete course "${name}"?`)) {
      deleteCourse(id);
    }
  };

  const handleToggleStatus = (course) => {
    const newStatus = course.status === 'Active' ? 'Inactive' : 'Active';
    updateCourse(course.id, { status: newStatus });
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Course Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Manage curriculum tracks, course syllabi, fee structures, and enrollment status
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={handleOpenAdd}
        >
          <Plus size={15} />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 text-muted">
              <Search size={15} />
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search courses by name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '13.5px' }}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 text-muted">
              <Filter size={14} />
            </span>
            <select
              className="form-select bg-light border-start-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ fontSize: '13px' }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="row g-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-xl-4">
            <div className="crm-card h-100 mb-0 d-flex flex-column justify-content-between p-0 overflow-hidden">
              {/* Course Image Header with Overlay */}
              <div className="position-relative" style={{ height: '160px' }}>
                <img
                  src={course.image}
                  alt={course.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  className="position-absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(23,37,84,0.3) 0%, rgba(23,37,84,0.85) 100%)'
                  }}
                />
                <div className="position-absolute top-0 start-0 p-3 w-100 d-flex justify-content-between align-items-center">
                  <span
                    className="badge rounded-pill px-2.5 py-1 text-white"
                    style={{ backgroundColor: 'rgba(23, 37, 84, 0.85)', backdropFilter: 'blur(4px)', fontSize: '11px' }}
                  >
                    {course.category}
                  </span>
                  <button
                    type="button"
                    className={`badge rounded-pill border-0 px-2.5 py-1 ${course.status === 'Active' ? 'bg-success text-white' : 'bg-secondary text-white'}`}
                    style={{ cursor: 'pointer', fontSize: '11px' }}
                    onClick={() => handleToggleStatus(course)}
                    title="Click to toggle Active / Inactive"
                  >
                    {course.status}
                  </button>
                </div>

                <div className="position-absolute bottom-0 start-0 p-3 w-100">
                  <h3 className="fw-bold fs-5 text-white mb-0">{course.name}</h3>
                </div>
              </div>

              {/* Course Body Details */}
              <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                <div>
                  <p className="text-secondary mb-3" style={{ fontSize: '12.5px', lineHeight: '1.5' }}>
                    {course.description}
                  </p>

                  <div className="row g-2 py-2 border-top border-bottom mb-3 text-muted" style={{ fontSize: '12px' }}>
                    <div className="col-4 d-flex align-items-center gap-1">
                      <Clock size={13} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="col-4 d-flex align-items-center gap-1">
                      <Layers size={13} />
                      <span>{course.modulesCount} Modules</span>
                    </div>
                    <div className="col-4 d-flex align-items-center gap-1 text-dark fw-semibold">
                      <Users size={13} />
                      <span>{course.enrolledCount} Interns</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="text-muted" style={{ fontSize: '12px' }}>Course Tuition Fee:</span>
                    <strong style={{ color: 'var(--crm-navy)', fontSize: '16px' }}>
                      ₹{course.fee.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Course Card Actions */}
                <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                  <span className="badge bg-light text-muted border" style={{ fontSize: '10.5px' }}>
                    ID: {course.id}
                  </span>
                  <div className="d-flex align-items-center gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border py-1 px-2 text-primary"
                      onClick={() => handleOpenEdit(course)}
                      title="Edit Course Details"
                    >
                      <Edit2 size={13} />
                      <span className="ms-1" style={{ fontSize: '11.5px' }}>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border py-1 px-2 text-danger"
                      onClick={() => handleDelete(course.id, course.name)}
                      title="Delete Course"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      {showCourseModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowCourseModal(false)}>
          <div
            className="crm-modal-card"
            style={{ maxWidth: '580px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                {editingCourse ? `Edit Course: ${editingCourse.name}` : 'Create New Course (AR IT COMPANY)'}
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowCourseModal(false)} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="crm-modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Course Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Full Stack Development"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Category</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.filter(c => c !== 'All').map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Duration</label>
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

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Course Fee (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Course Cover Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Course Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter comprehensive curriculum overview..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowCourseModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <Check size={14} />
                  <span>{editingCourse ? 'Save Changes' : 'Create Course'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMCoursesPage;
