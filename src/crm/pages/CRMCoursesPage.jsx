import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  BookOpen,
  Users,
  Clock,
  Star,
  CheckCircle,
  Plus,
  Layers,
  ArrowRight
} from 'lucide-react';

const CRMCoursesPage = () => {
  const { courses } = useCRM();
  const [showAddCourse, setShowAddCourse] = useState(false);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Specialization Tracks & Course Catalog
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Industry-aligned curricula engineered for software engineering, deep learning and data mastery
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={() => setShowAddCourse(true)}
        >
          <Plus size={15} />
          <span>Create New Course</span>
        </button>
      </div>

      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-xl-3">
            <div className="crm-card h-100 mb-0 d-flex flex-column justify-content-between">
              <div>
                {/* Course Header Banner */}
                <div
                  className="rounded-3 p-3 mb-3 text-white position-relative"
                  style={{
                    backgroundColor: course.color,
                    background: `linear-gradient(135deg, ${course.color} 0%, #1e1b4b 100%)`
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-white bg-opacity-20 text-white" style={{ fontSize: '11px' }}>
                      {course.code}
                    </span>
                    <div className="d-flex align-items-center gap-1 text-warning" style={{ fontSize: '12px' }}>
                      <Star size={13} fill="#f59e0b" />
                      <span className="text-white fw-bold">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="fw-bold fs-5 text-white mb-1">{course.title}</h3>
                  <div className="text-light opacity-75" style={{ fontSize: '12px' }}>
                    {course.category}
                  </div>
                </div>

                <p className="text-muted mb-3" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  {course.description}
                </p>

                <div className="d-flex align-items-center justify-content-between py-2 border-top border-bottom mb-3" style={{ fontSize: '12px' }}>
                  <div className="d-flex align-items-center gap-1 text-muted">
                    <Clock size={13} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted">
                    <Layers size={13} />
                    <span>{course.modulesCount} Modules</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 fw-bold text-primary">
                    <Users size={13} />
                    <span>{course.enrolledStudents}</span>
                  </div>
                </div>

                <div className="text-muted mb-3" style={{ fontSize: '12px' }}>
                  <strong>Lead Instructor:</strong> {course.instructor}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="crm-btn crm-btn-secondary w-100 crm-btn-sm justify-content-center"
                >
                  <span>View Syllabus & Enrolled</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddCourse && (
        <div className="crm-modal-backdrop" onClick={() => setShowAddCourse(false)}>
          <div className="crm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '17px', color: '#1e1b4b' }}>
                Add New Specialization Track
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowAddCourse(false)} />
            </div>
            <div className="crm-modal-body">
              <div className="alert alert-info py-2" style={{ fontSize: '12px' }}>
                Create structured learning paths with automated milestone checkpoints and certificate criteria.
              </div>
              <div className="crm-form-group mb-2">
                <label className="crm-form-label">Course Title</label>
                <input type="text" className="crm-form-control" placeholder="e.g. Generative AI & LLM Systems" />
              </div>
              <div className="crm-form-group mb-2">
                <label className="crm-form-label">Course Code</label>
                <input type="text" className="crm-form-control" placeholder="e.g. GAI-2026" />
              </div>
              <div className="crm-form-group mb-2">
                <label className="crm-form-label">Duration</label>
                <input type="text" className="crm-form-control" placeholder="e.g. 6 Months" />
              </div>
              <div className="crm-form-group mb-2">
                <label className="crm-form-label">Lead Mentor</label>
                <input type="text" className="crm-form-control" placeholder="e.g. Dr. Maya Raman" />
              </div>
            </div>
            <div className="crm-modal-footer">
              <button type="button" className="crm-btn crm-btn-outline crm-btn-sm" onClick={() => setShowAddCourse(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="crm-btn crm-btn-primary crm-btn-sm"
                onClick={() => {
                  alert('New course successfully configured in Incredible AI curriculum database!');
                  setShowAddCourse(false);
                }}
              >
                Save Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMCoursesPage;
