import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Award,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const CRMStudentTable = ({ onOpenStudentProfile, onEditStudent, onAddStudent, onGenerateCert }) => {
  const { students, deleteStudent } = useCRM();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const coursesList = ['All', 'Full Stack Development', 'AI & Machine Learning', 'Data Science', 'Python'];
  const statusList = ['All', 'Active', 'Completed', 'On Leave'];

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCourse = selectedCourse === 'All' || student.course === selectedCourse;
      const matchStatus = selectedStatus === 'All' || student.status === selectedStatus;

      return matchSearch && matchCourse && matchStatus;
    });
  }, [students, searchTerm, selectedCourse, selectedStatus]);

  // Pagination Calculation
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'crm-badge active';
      case 'Completed': return 'crm-badge completed';
      case 'On Leave': return 'crm-badge on-leave';
      default: return 'crm-badge pending';
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from Incredible AI Solutions CRM?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div className="crm-card mb-4">
      <div className="crm-card-header flex-column flex-md-row align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="crm-card-title">
            <span>Student Management</span>
            <span className="badge bg-primary bg-opacity-10 text-primary ms-2" style={{ fontSize: '12px' }}>
              {filteredStudents.length} Students
            </span>
          </h2>
          <div className="crm-card-subtitle">
            Manage cohort enrollments, track learning milestones, and generate certificates
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 w-100 w-md-auto justify-content-end">
          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={onAddStudent}
          >
            <UserPlus size={15} />
            <span>New Student</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-5">
          <div className="position-relative">
            <Search size={15} className="position-absolute text-muted" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control form-control-sm ps-5 rounded-3 border"
              placeholder="Search by student name, ID or email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="d-flex align-items-center gap-2">
            <Filter size={15} className="text-muted d-none d-sm-block" />
            <select
              className="form-select form-select-sm rounded-3 border"
              value={selectedCourse}
              onChange={(e) => { setSelectedCourse(e.target.value); setCurrentPage(1); }}
            >
              {coursesList.map(c => <option key={c} value={c}>{c === 'All' ? 'All Courses' : c}</option>)}
            </select>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <select
            className="form-select form-select-sm rounded-3 border"
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
          >
            {statusList.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <span className="fw-bold font-monospace text-primary" style={{ fontSize: '12px' }}>
                      {student.id}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="rounded-circle border"
                        style={{ width: '34px', height: '34px', objectFit: 'cover' }}
                      />
                      <div>
                        <div className="fw-semibold text-dark">{student.name}</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="fw-medium text-dark">{student.course}</span>
                    <div className="text-muted" style={{ fontSize: '11px' }}>{student.duration}</div>
                  </td>
                  <td style={{ minWidth: '150px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="fw-bold" style={{ fontSize: '12px' }}>{student.progress}%</span>
                      <span className="text-muted" style={{ fontSize: '11px' }}>
                        {student.tasksCompleted}/{student.totalTasks} Tasks
                      </span>
                    </div>
                    <div className="crm-progress-track">
                      <div className="crm-progress-fill" style={{ width: `${student.progress}%` }} />
                    </div>
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(student.status)}>
                      {student.status === 'Active' && <CheckCircle size={12} />}
                      {student.status === 'Completed' && <Award size={12} />}
                      {student.status === 'On Leave' && <Clock size={12} />}
                      <span>{student.status}</span>
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="d-inline-flex align-items-center gap-1">
                      <button
                        type="button"
                        className="crm-action-btn"
                        title="View Full Profile"
                        onClick={() => onOpenStudentProfile(student)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        className="crm-action-btn"
                        title="Edit Details"
                        onClick={() => onEditStudent(student)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        className="crm-action-btn"
                        title={student.certificateIssued ? "View Certificate" : "Generate Certificate"}
                        style={{ color: '#8b5cf6' }}
                        onClick={() => onGenerateCert(student)}
                      >
                        <Award size={15} />
                      </button>
                      <button
                        type="button"
                        className="crm-action-btn delete"
                        title="Delete Student"
                        onClick={() => handleDelete(student.id, student.name)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
        <div className="text-muted" style={{ fontSize: '12px' }}>
          Showing{' '}
          <span className="fw-semibold text-dark">
            {filteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
          </span>
          {' '}to{' '}
          <span className="fw-semibold text-dark">
            {Math.min(currentPage * itemsPerPage, filteredStudents.length)}
          </span>
          {' '}of{' '}
          <span className="fw-semibold text-dark">{filteredStudents.length}</span> students
        </div>

        <div className="d-flex align-items-center gap-1">
          <button
            type="button"
            className="crm-action-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-2 fw-semibold text-dark" style={{ fontSize: '12px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="crm-action-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRMStudentTable;
