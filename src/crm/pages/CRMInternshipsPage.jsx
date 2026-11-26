import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Calendar,
  Eye,
  Award,
  AlertCircle
} from 'lucide-react';

const CRMInternshipsPage = ({ onOpenStudentProfile }) => {
  const { internships, students, mentors, updateInternshipStatus } = useCRM();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'New Application' | 'Approved' | 'Rejected' | 'Ongoing' | 'Completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Modal State for Details / Mentor Assignment
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [assignMentorModal, setAssignMentorModal] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState('');

  const tabs = [
    { id: 'All', label: 'All Internships' },
    { id: 'New Application', label: 'New Applications' },
    { id: 'Approved', label: 'Approved' },
    { id: 'Ongoing', label: 'Ongoing Internships' },
    { id: 'Completed', label: 'Completed Internships' },
    { id: 'Rejected', label: 'Rejected Applications' }
  ];

  const filteredInternships = useMemo(() => {
    return internships.filter(item => {
      const matchTab = activeTab === 'All' || item.status === activeTab;
      const matchSearch =
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = selectedCourse === 'All' || item.course === selectedCourse;
      return matchTab && matchSearch && matchCourse;
    });
  }, [internships, activeTab, searchTerm, selectedCourse]);

  const handleApprove = (item) => {
    setAssignMentorModal(item);
    setSelectedMentor(mentors[0]?.name || 'Rajesh K. Sharma');
  };

  const handleConfirmApproval = () => {
    if (!assignMentorModal) return;
    updateInternshipStatus(assignMentorModal.id, 'Ongoing', selectedMentor);
    setAssignMentorModal(null);
  };

  const handleReject = (item) => {
    if (window.confirm(`Are you sure you want to reject the internship application for ${item.studentName}?`)) {
      updateInternshipStatus(item.id, 'Rejected');
    }
  };

  const handleMarkCompleted = (item) => {
    if (window.confirm(`Mark ${item.studentName}'s internship as Completed? This qualifies them for official certification.`)) {
      updateInternshipStatus(item.id, 'Completed');
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Internship Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Review candidate applications, assign senior mentors, track start/end timelines, and govern completion
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge px-3 py-2 rounded-pill" style={{ backgroundColor: 'var(--crm-navy)', color: '#fff', fontSize: '12px' }}>
            {internships.filter(i => i.status === 'Ongoing').length} Active Interns
          </span>
          <span className="badge px-3 py-2 rounded-pill" style={{ backgroundColor: 'var(--crm-purple)', color: '#fff', fontSize: '12px' }}>
            {internships.filter(i => i.status === 'New Application').length} Pending Review
          </span>
        </div>
      </div>

      {/* Tabs Filter Header */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom">
          <div className="crm-tabs-nav mb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`crm-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                <span
                  className="badge ms-1 rounded-pill"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--crm-purple)' : '#f1f5f9',
                    color: activeTab === tab.id ? '#fff' : '#64748b',
                    fontSize: '10px'
                  }}
                >
                  {tab.id === 'All' ? internships.length : internships.filter(i => i.status === tab.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-3 bg-light border-bottom">
          <div className="row g-2">
            <div className="col-12 col-md-7">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by intern name, student ID, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div className="col-12 col-md-5">
              <select
                className="form-select bg-white"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="All">All Courses</option>
                <option value="Full Stack Development">Full Stack Development</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Python Programming">Python Programming</option>
                <option value="Java Programming">Java Programming</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>
          </div>
        </div>

        {/* Internships Table */}
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Student Information</th>
                <th>Selected Course</th>
                <th>Timeline (Start &ndash; End)</th>
                <th>Assigned Mentor</th>
                <th>College / Institute</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInternships.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="text-muted">
                      <AlertCircle size={32} className="mb-2 text-warning" />
                      <p className="mb-0 fw-semibold">No internship applications found under this view.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInternships.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <strong className="text-dark d-block" style={{ fontSize: '13px' }}>
                          {item.studentName}
                        </strong>
                        <span className="badge px-1.5 py-0.5 text-white" style={{ backgroundColor: 'var(--crm-navy)', fontSize: '9.5px' }}>
                          {item.studentId}
                        </span>
                      </div>
                    </td>

                    <td style={{ fontSize: '12.5px' }}>
                      <span className="fw-medium text-dark">{item.course}</span>
                    </td>

                    <td style={{ fontSize: '11.5px' }}>
                      <div className="text-muted">
                        <Calendar size={11} className="me-1 d-inline text-secondary" />
                        {item.startDate} &rarr; {item.endDate}
                      </div>
                    </td>

                    <td>
                      <span className="fw-semibold" style={{ color: 'var(--crm-purple)', fontSize: '12.5px' }}>
                        {item.mentor}
                      </span>
                    </td>

                    <td style={{ fontSize: '12px', color: '#475569' }}>
                      {item.college}
                    </td>

                    <td>
                      <span
                        className={`crm-badge ${
                          item.status === 'Completed' ? 'crm-badge-completed' :
                          item.status === 'Ongoing' ? 'crm-badge-active' :
                          item.status === 'Approved' ? 'crm-badge-approved' :
                          item.status === 'Rejected' ? 'crm-badge-rejected' : 'crm-badge-pending'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="text-end">
                      <div className="d-inline-flex align-items-center gap-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border p-1.5 text-secondary"
                          title="View Details"
                          onClick={() => setSelectedInternship(item)}
                        >
                          <Eye size={14} />
                        </button>

                        {/* Approve Action */}
                        {(item.status === 'New Application' || item.status === 'Approved') && (
                          <button
                            type="button"
                            className="btn btn-sm btn-light border p-1.5 text-success"
                            title="Approve & Assign Mentor"
                            onClick={() => handleApprove(item)}
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}

                        {/* Complete Action */}
                        {item.status === 'Ongoing' && (
                          <button
                            type="button"
                            className="btn btn-sm btn-light border p-1.5 text-primary"
                            title="Mark as Completed"
                            onClick={() => handleMarkCompleted(item)}
                          >
                            <Award size={14} />
                          </button>
                        )}

                        {/* Reject Action */}
                        {item.status === 'New Application' && (
                          <button
                            type="button"
                            className="btn btn-sm btn-light border p-1.5 text-danger"
                            title="Reject Application"
                            onClick={() => handleReject(item)}
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Internship Details Modal */}
      {selectedInternship && (
        <div className="crm-modal-backdrop" onClick={() => setSelectedInternship(null)}>
          <div className="crm-modal-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Internship Details: {selectedInternship.studentName}
              </h3>
              <button type="button" className="btn-close" onClick={() => setSelectedInternship(null)} />
            </div>
            <div className="crm-modal-body">
              <div className="p-3 bg-light rounded-3 border mb-3">
                <div className="row g-2" style={{ fontSize: '13px' }}>
                  <div className="col-6"><strong>Student ID:</strong> {selectedInternship.studentId}</div>
                  <div className="col-6"><strong>Status:</strong> {selectedInternship.status}</div>
                  <div className="col-6"><strong>Course:</strong> {selectedInternship.course}</div>
                  <div className="col-6"><strong>Mentor:</strong> {selectedInternship.mentor}</div>
                  <div className="col-6"><strong>Start Date:</strong> {selectedInternship.startDate}</div>
                  <div className="col-6"><strong>End Date:</strong> {selectedInternship.endDate}</div>
                  <div className="col-12"><strong>College:</strong> {selectedInternship.college}</div>
                </div>
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ fontSize: '13px' }}>Evaluation Notes &amp; Project Scope</h6>
                <p className="text-secondary mb-0" style={{ fontSize: '12.5px', lineHeight: '1.6' }}>
                  {selectedInternship.notes || 'Full stack enterprise sprint development following Agile/Scrum ceremony standards.'}
                </p>
              </div>
            </div>
            <div className="crm-modal-footer">
              <button
                type="button"
                className="crm-btn crm-btn-outline crm-btn-sm"
                onClick={() => setSelectedInternship(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Mentor & Approve Modal */}
      {assignMentorModal && (
        <div className="crm-modal-backdrop" onClick={() => setAssignMentorModal(null)}>
          <div className="crm-modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Approve &amp; Assign Mentor
              </h3>
              <button type="button" className="btn-close" onClick={() => setAssignMentorModal(null)} />
            </div>
            <div className="crm-modal-body">
              <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                Assign a dedicated senior mentor for <strong>{assignMentorModal.studentName}</strong> ({assignMentorModal.course}).
              </p>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>
                  Choose Mentor
                </label>
                <select
                  className="form-select"
                  value={selectedMentor}
                  onChange={(e) => setSelectedMentor(e.target.value)}
                >
                  {mentors.map(m => (
                    <option key={m.id} value={m.name}>
                      {m.name} &bull; {m.specialization} ({m.activeStudentsCount} active interns)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="crm-modal-footer">
              <button
                type="button"
                className="crm-btn crm-btn-outline crm-btn-sm"
                onClick={() => setAssignMentorModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="crm-btn crm-btn-primary crm-btn-sm"
                onClick={handleConfirmApproval}
              >
                <CheckCircle size={14} />
                <span>Confirm &amp; Start Internship</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMInternshipsPage;
