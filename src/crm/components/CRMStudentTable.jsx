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
  RefreshCw,
  Download,
  AlertCircle
} from 'lucide-react';

const CRMStudentTable = ({ onOpenStudentProfile, onEditStudent, onAddStudent, onGenerateCert }) => {
  const { students, deleteStudent, syncInternshipWebsiteRegistrations, isSyncing } = useCRM();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const coursesList = [
    'All',
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'Python Programming',
    'Java Programming',
    'UI/UX Design',
    'Web Development'
  ];

  const statusList = ['All', 'Active', 'Completed', 'Pending', 'On Leave'];

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.phone && student.phone.includes(searchTerm));

      const matchCourse = selectedCourse === 'All' || student.course === selectedCourse;
      const matchStatus = selectedStatus === 'All' || student.internshipStatus === selectedStatus;

      return matchSearch && matchCourse && matchStatus;
    });
  }, [students, searchTerm, selectedCourse, selectedStatus]);

  // Pagination
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} (${id}) from AR IT COMPANY records?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div className="crm-card mb-4">
      {/* Header with Title & Action Controls */}
      <div className="crm-card-header flex-column flex-md-row align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="crm-card-title">
            <span>Student &amp; Intern Management</span>
            <span
              className="badge ms-2"
              style={{ backgroundColor: 'var(--crm-purple-soft)', color: 'var(--crm-purple)', fontSize: '12px' }}
            >
              {filteredStudents.length} Students Enrolled
            </span>
          </h2>
          <div className="crm-card-subtitle">
            Search, filter, view 7-tab student profiles, and manage cohort lifecycle
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* External Website Integration Simulation */}
          <button
            type="button"
            className="crm-btn crm-btn-outline crm-btn-sm"
            onClick={syncInternshipWebsiteRegistrations}
            disabled={isSyncing}
            title="Import student registrations submitted via the AR IT COMPANY Internship Website"
            style={{ borderColor: 'var(--crm-purple-border)', color: 'var(--crm-purple)' }}
          >
            <RefreshCw size={13} className={isSyncing ? 'spin-animation' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync from Website'}</span>
          </button>

          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={onAddStudent}
          >
            <UserPlus size={14} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 text-muted">
              <Search size={15} />
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search by student name, ID, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{ fontSize: '13.5px' }}
            />
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 text-muted">
              <Filter size={14} />
            </span>
            <select
              className="form-select bg-light border-start-0"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setCurrentPage(1);
              }}
              style={{ fontSize: '13px' }}
            >
              {coursesList.map((course, idx) => (
                <option key={idx} value={course}>
                  {course === 'All' ? 'All Courses' : course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <select
            className="form-select bg-light"
            value={selectedStatus}
            onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
            }}
            style={{ fontSize: '13px' }}
          >
            {statusList.map((st, idx) => (
              <option key={idx} value={st}>
                {st === 'All' ? 'All Statuses' : st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Students Table */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Selected Course</th>
              <th>Registration Date</th>
              <th>Attendance</th>
              <th>Progress</th>
              <th>Fee Status</th>
              <th>Internship Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <div className="text-muted">
                    <AlertCircle size={32} className="mb-2 text-warning" />
                    <p className="mb-0 fw-semibold">No students match your filter criteria.</p>
                    <small>Try clearing search filters or add a new student.</small>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedStudents.map((student) => (
                <tr key={student.id}>
                  {/* Student Details */}
                  <td>
                    <div className="d-flex align-items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="rounded-circle"
                        style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong className="text-dark d-block" style={{ fontSize: '13px' }}>
                          {student.name}
                        </strong>
                        <div className="d-flex align-items-center gap-2" style={{ fontSize: '11px', color: '#64748b' }}>
                          <span className="badge px-1.5 py-0.5 text-white" style={{ backgroundColor: 'var(--crm-navy)', fontSize: '9.5px' }}>
                            {student.id}
                          </span>
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Selected Course */}
                  <td>
                    <span className="fw-medium text-dark d-block" style={{ fontSize: '12.5px' }}>
                      {student.course}
                    </span>
                    <span className="text-muted" style={{ fontSize: '11px' }}>
                      Mentor: {student.mentor}
                    </span>
                  </td>

                  {/* Registration Date */}
                  <td style={{ fontSize: '12px' }}>
                    {student.registrationDate}
                  </td>

                  {/* Attendance */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold text-dark" style={{ fontSize: '12.5px' }}>
                        {student.attendance}%
                      </span>
                      <div className="crm-progress-track" style={{ width: '50px', height: '5px' }}>
                        <div
                          className={`crm-progress-fill ${student.attendance >= 90 ? 'success' : ''}`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Progress */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold" style={{ color: 'var(--crm-purple)', fontSize: '12.5px' }}>
                        {student.progress}%
                      </span>
                      <div className="crm-progress-track" style={{ width: '60px', height: '6px' }}>
                        <div
                          className={`crm-progress-fill ${student.progress === 100 ? 'success' : ''}`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-muted" style={{ fontSize: '10.5px' }}>
                      {student.tasksCompleted}/{student.totalTasks} Tasks
                    </span>
                  </td>

                  {/* Fee Status */}
                  <td>
                    <span
                      className={`crm-badge ${student.feeStatus === 'Paid' ? 'crm-badge-paid' : student.feeStatus === 'Partially Paid' ? 'crm-badge-partial' : 'crm-badge-pending'}`}
                      style={{ fontSize: '11px' }}
                    >
                      {student.feeStatus}
                    </span>
                    <div className="text-muted" style={{ fontSize: '10px', marginTop: '2px' }}>
                      Paid: ₹{student.paidAmount?.toLocaleString('en-IN')}
                    </div>
                  </td>

                  {/* Internship Status */}
                  <td>
                    <span
                      className={`crm-badge ${student.internshipStatus === 'Completed' ? 'crm-badge-completed' : student.internshipStatus === 'Active' ? 'crm-badge-active' : 'crm-badge-pending'}`}
                      style={{ fontSize: '11px' }}
                    >
                      {student.internshipStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-end">
                    <div className="d-inline-flex align-items-center gap-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-light border p-1.5 text-secondary"
                        title="View Complete 7-Tab Profile"
                        onClick={() => onOpenStudentProfile(student)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-light border p-1.5 text-primary"
                        title="Edit Student Info"
                        onClick={() => onEditStudent(student)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm border p-1.5 ${student.internshipStatus === 'Completed' ? 'btn-light text-purple' : 'btn-light text-muted'}`}
                        style={{ color: student.internshipStatus === 'Completed' ? 'var(--crm-purple)' : '#94a3b8' }}
                        title={student.internshipStatus === 'Completed' ? 'View/Generate Certificate' : 'Certificate requires Completed status'}
                        onClick={() => onGenerateCert(student)}
                      >
                        <Award size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-light border p-1.5 text-danger"
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex align-items-center justify-content-between pt-3 mt-2 border-top">
          <span className="text-muted" style={{ fontSize: '12px' }}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
          </span>
          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary py-1 px-2"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`btn btn-sm py-1 px-2.5 ${currentPage === pageNum ? 'btn-primary' : 'btn-light border'}`}
                style={{
                  backgroundColor: currentPage === pageNum ? 'var(--crm-purple)' : 'transparent',
                  borderColor: currentPage === pageNum ? 'var(--crm-purple)' : 'var(--crm-border)',
                  fontSize: '12px'
                }}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary py-1 px-2"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMStudentTable;
