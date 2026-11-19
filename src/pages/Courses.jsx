import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CourseModal from '../components/CourseModal';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  PlayCircle,
  Users
} from 'lucide-react';

const Courses = () => {
  const { courses, currentUser, enrollCourse, deleteCourse } = useApp();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const canManageCourses = currentUser?.role === 'Admin' || currentUser?.role === 'Manager';

  // Metrics
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.enrolled && c.progress < 100).length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const availableCourses = courses.filter(c => !c.enrolled).length;

  const handleEdit = (course) => {
    setCourseToEdit(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete course: "${title}"?`)) {
      deleteCourse(id);
    }
  };

  const handleEnroll = (id) => {
    enrollCourse(id);
    navigate('/my-courses');
  };

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Course Management &amp; Curriculum Hub</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Comprehensive training tracks tailored for software interns, QA, and cloud DevOps cohorts.
          </p>
        </div>

        {canManageCourses && (
          <button
            onClick={() => { setCourseToEdit(null); setIsModalOpen(true); }}
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
            style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
          >
            <Plus size={16} />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Total Courses</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-dark m-0">{totalCourses}</h2>
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                <BookOpen size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Active Courses</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-primary m-0">{activeCourses}</h2>
              <div className="p-2 rounded-3 bg-info bg-opacity-10 text-info">
                <Clock size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Completed Courses</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-success m-0">{completedCourses}</h2>
              <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Available Courses</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-warning m-0">{availableCourses}</h2>
              <div className="p-2 rounded-3 bg-warning bg-opacity-10 text-warning">
                <GraduationCap size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white d-flex flex-column">
              {/* Image & Badges */}
              <div className="position-relative" style={{ height: '170px' }}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-100 h-100 object-fit-cover"
                  style={{ objectFit: 'cover' }}
                />
                <span
                  className="position-absolute top-0 start-0 m-3 badge px-3 py-1 rounded-pill"
                  style={{
                    backgroundColor: course.enrolled ? '#2563eb' : '#0f172a',
                    fontSize: '11px'
                  }}
                >
                  {course.enrolled ? (course.progress === 100 ? 'Completed' : 'Enrolled') : 'Available'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <h6 className="fw-bold text-dark mb-2 line-clamp-2" style={{ lineHeight: '1.4' }}>
                    {course.title}
                  </h6>
                  <p className="text-muted mb-3" style={{ fontSize: '12px', lineHeight: '1.6' }}>
                    {course.description}
                  </p>
                </div>

                <div>
                  {/* Instructor & Duration */}
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top text-muted mb-3" style={{ fontSize: '12px' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '24px', height: '24px' }}>
                        {course.instructor.charAt(0)}
                      </div>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <Clock size={13} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Progress Bar (if enrolled) */}
                  {course.enrolled ? (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '11px' }}>
                        <span>Progress ({course.completedLessons}/{course.lessonsCount} Lessons)</span>
                        <span className="fw-bold text-primary">{course.progress}%</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted mb-3" style={{ fontSize: '12px' }}>
                      📋 {course.lessonsCount} Modules Included
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    {course.enrolled ? (
                      <button
                        onClick={() => navigate('/my-courses')}
                        className="btn btn-outline-primary w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 py-2"
                        style={{ fontSize: '13px', fontWeight: '600' }}
                      >
                        <PlayCircle size={16} />
                        <span>Continue Course</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="btn btn-primary w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold shadow-sm"
                        style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
                      >
                        <GraduationCap size={16} />
                        <span>Enroll Now</span>
                      </button>
                    )}

                    {canManageCourses && (
                      <div className="dropdown">
                        <button
                          onClick={() => handleEdit(course)}
                          className="btn btn-light rounded-3 p-2 text-secondary"
                          title="Edit Course"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id, course.title)}
                          className="btn btn-light rounded-3 p-2 text-danger ms-1"
                          title="Delete Course"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseToEdit={courseToEdit}
      />
    </div>
  );
};

export default Courses;
