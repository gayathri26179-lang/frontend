import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  BookmarkCheck,
  PlayCircle,
  Award,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const MyCourses = () => {
  const { courses, updateCourseProgress } = useApp();
  const navigate = useNavigate();

  const enrolledCourses = courses.filter(c => c.enrolled);

  const handleAdvance = (courseId) => {
    updateCourseProgress(courseId, 15);
  };

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">My Learning Dashboard &amp; Enrolled Courses</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Resume active lessons, advance module completion, and download verified certificates.
          </p>
        </div>
        <button
          onClick={() => navigate('/courses')}
          className="btn btn-outline-primary rounded-3 d-flex align-items-center gap-2 py-2 px-3 fw-semibold bg-white"
          style={{ fontSize: '13px' }}
        >
          <BookOpen size={16} />
          <span>Browse All Courses</span>
        </button>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <BookOpen size={48} className="text-muted mx-auto mb-3" />
          <h5 className="fw-bold text-dark">No Enrolled Courses Yet</h5>
          <p className="text-muted">You are not currently enrolled in any curriculum tracks.</p>
          <button
            onClick={() => navigate('/courses')}
            className="btn btn-primary mx-auto px-4 py-2 rounded-3 fw-semibold"
          >
            Explore Available Courses
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex gap-3 mb-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="rounded-3"
                      style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="d-flex justify-content-between align-items-start">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-1" style={{ fontSize: '11px' }}>
                          {course.id}
                        </span>
                        {course.progress === 100 ? (
                          <span className="badge bg-success bg-opacity-10 text-success d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                            <CheckCircle2 size={12} /> Completed
                          </span>
                        ) : (
                          <span className="badge bg-warning bg-opacity-10 text-warning" style={{ fontSize: '11px' }}>
                            In Progress
                          </span>
                        )}
                      </div>
                      <h6 className="fw-bold text-dark mb-1 text-truncate">{course.title}</h6>
                      <small className="text-muted d-block text-truncate">{course.description}</small>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="p-3 bg-light rounded-3 mb-3 border">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted fw-semibold" style={{ fontSize: '12px' }}>
                        Lesson Progress: {course.completedLessons} of {course.lessonsCount} Completed
                      </span>
                      <span className="fw-bold text-primary" style={{ fontSize: '14px' }}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between mt-2 text-muted" style={{ fontSize: '11px' }}>
                      <span>Pending: {course.lessonsCount - course.completedLessons} Lessons</span>
                      <span>Total Track: {course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <button
                    onClick={() => handleAdvance(course.id)}
                    className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold"
                    style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
                  >
                    <PlayCircle size={16} />
                    <span>{course.progress === 100 ? 'Review Lessons' : 'Continue Learning (+15%)'}</span>
                  </button>

                  {course.progress === 100 && (
                    <button
                      onClick={() => alert(`Official Certificate verified for ${course.title} (Certificate ID: IT-2026-8942)`)}
                      className="btn btn-outline-success d-flex align-items-center gap-1 rounded-3 px-3 py-2 fw-semibold"
                      style={{ fontSize: '13px' }}
                    >
                      <Award size={16} />
                      <span>Certificate Ready</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
