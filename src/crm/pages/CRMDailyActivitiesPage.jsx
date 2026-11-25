import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CalendarDays,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Plus,
  Calendar,
  User,
  ArrowRight,
  List,
  GitCommit
} from 'lucide-react';

const CRMDailyActivitiesPage = () => {
  const { dailyActivities, students, addDailyActivity, addMentorFeedback } = useCRM();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Pending Review' | 'Approved' | 'Needs Revision'
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'table'

  // Modals
  const [feedbackModalAct, setFeedbackModalAct] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('Approved');

  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simForm, setSimForm] = useState({
    studentId: students[0]?.id || '',
    dayNumber: `Day ${dailyActivities.length + 1}`,
    activityDate: new Date().toISOString().split('T')[0],
    taskTitle: 'Day 5 – Mini Project Development',
    workDescription: 'Architected complete frontend state tree with React Context and LocalStorage persistence.'
  });

  const filteredActivities = useMemo(() => {
    return dailyActivities.filter(act => {
      const matchTab =
        activeTab === 'All' ||
        (activeTab === 'Pending' && act.taskStatus === 'Pending Review') ||
        (activeTab === 'Approved' && act.taskStatus === 'Approved') ||
        (activeTab === 'Revision' && act.taskStatus === 'Needs Revision');

      const matchStudent = selectedStudentFilter === 'All' || act.studentId === selectedStudentFilter;
      const matchDate = !selectedDateFilter || act.activityDate === selectedDateFilter;
      const matchSearch =
        act.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.workDescription.toLowerCase().includes(searchTerm.toLowerCase());

      return matchTab && matchStudent && matchDate && matchSearch;
    });
  }, [dailyActivities, activeTab, selectedStudentFilter, selectedDateFilter, searchTerm]);

  const handleOpenFeedback = (act) => {
    setFeedbackModalAct(act);
    setFeedbackText(act.mentorFeedback || '');
    setFeedbackStatus(act.taskStatus || 'Approved');
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    if (!feedbackModalAct) return;
    addMentorFeedback(feedbackModalAct.id, feedbackText, feedbackStatus);
    setFeedbackModalAct(null);
  };

  const handleSimulateSubmit = (e) => {
    e.preventDefault();
    const matched = students.find(s => s.id === simForm.studentId) || students[0];
    addDailyActivity({
      studentName: matched.name,
      studentId: matched.id,
      course: matched.course,
      dayNumber: simForm.dayNumber,
      activityDate: simForm.activityDate,
      taskTitle: simForm.taskTitle,
      workDescription: simForm.workDescription,
      mentorName: matched.mentor
    });
    setShowSimulateModal(false);
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Daily Activities Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Monitor daily student submissions, evaluate work progress, and provide mentor feedback
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* View Toggle */}
          <div className="btn-group bg-light p-1 rounded-3 border">
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-2 ${viewMode === 'timeline' ? 'btn-primary text-white' : 'btn-light'}`}
              style={{
                backgroundColor: viewMode === 'timeline' ? 'var(--crm-purple)' : 'transparent',
                border: 'none',
                fontSize: '12px'
              }}
              onClick={() => setViewMode('timeline')}
            >
              <GitCommit size={14} className="me-1" />
              Timeline View
            </button>
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-2 ${viewMode === 'table' ? 'btn-primary text-white' : 'btn-light'}`}
              style={{
                backgroundColor: viewMode === 'table' ? 'var(--crm-purple)' : 'transparent',
                border: 'none',
                fontSize: '12px'
              }}
              onClick={() => setViewMode('table')}
            >
              <List size={14} className="me-1" />
              Table View
            </button>
          </div>

          {/* Simulate Submission Button */}
          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={() => setShowSimulateModal(true)}
          >
            <Plus size={14} />
            <span>Log Daily Activity</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Badges */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="crm-stat-card navy py-3">
            <div>
              <div className="crm-stat-label">Total Submissions</div>
              <div className="crm-stat-value fs-4">{dailyActivities.length}</div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-navy">
              <CalendarDays size={20} />
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="crm-stat-card warning py-3">
            <div>
              <div className="crm-stat-label">Pending Review</div>
              <div className="crm-stat-value fs-4">
                {dailyActivities.filter(a => a.taskStatus === 'Pending Review').length}
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-warning">
              <Clock size={20} />
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="crm-stat-card success py-3">
            <div>
              <div className="crm-stat-label">Approved Tasks</div>
              <div className="crm-stat-value fs-4">
                {dailyActivities.filter(a => a.taskStatus === 'Approved').length}
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-success">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="crm-stat-card pink py-3">
            <div>
              <div className="crm-stat-label">Needs Revision</div>
              <div className="crm-stat-value fs-4">
                {dailyActivities.filter(a => a.taskStatus === 'Needs Revision').length}
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-pink">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Header */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom">
          <div className="crm-tabs-nav mb-0">
            {[
              { id: 'All', label: 'All Activities' },
              { id: 'Pending', label: 'Pending Review' },
              { id: 'Approved', label: 'Approved Tasks' },
              { id: 'Revision', label: 'Needs Revision' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`crm-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 bg-light border-bottom">
          <div className="row g-2">
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search task title, student name, or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div className="col-6 col-md-4">
              <select
                className="form-select bg-white"
                value={selectedStudentFilter}
                onChange={(e) => setSelectedStudentFilter(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="All">All Students</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-3">
              <input
                type="date"
                className="form-control bg-white"
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
                style={{ fontSize: '13px' }}
              />
            </div>
          </div>
        </div>

        {/* Content Body: Timeline or Table View */}
        <div className="p-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <AlertCircle size={36} className="mb-2 text-warning" />
              <h6 className="fw-semibold">No daily activity records match your filter.</h6>
              <p className="mb-0" style={{ fontSize: '12.5px' }}>
                Try adjusting the status or student filters, or click "Log Daily Activity" to create one.
              </p>
            </div>
          ) : viewMode === 'timeline' ? (
            /* Clean Daily Activity Timeline */
            <div className="timeline-container position-relative ps-4" style={{ borderLeft: '2px dashed var(--crm-purple-border)' }}>
              {filteredActivities.map((act) => (
                <div key={act.id} className="position-relative mb-4">
                  {/* Timeline Bullet Node */}
                  <div
                    className="position-absolute rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      left: '-28px',
                      top: '0px',
                      width: '24px',
                      height: '24px',
                      backgroundColor: act.taskStatus === 'Approved' ? 'var(--crm-success)' : act.taskStatus === 'Needs Revision' ? 'var(--crm-danger)' : 'var(--crm-warning)',
                      boxShadow: '0 0 0 4px #FFFFFF'
                    }}
                  >
                    {act.taskStatus === 'Approved' ? <CheckCircle size={13} /> : <Clock size={13} />}
                  </div>

                  {/* Activity Card */}
                  <div className="p-3.5 rounded-3 border bg-white shadow-sm" style={{ borderColor: 'var(--crm-border)' }}>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="badge px-2 py-1 rounded-pill"
                          style={{ backgroundColor: 'var(--crm-navy)', color: '#FFFFFF', fontSize: '11px' }}
                        >
                          {act.dayNumber}
                        </span>
                        <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '15px' }}>
                          {act.taskTitle}
                        </h5>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                          <Calendar size={12} />
                          {act.activityDate}
                        </span>
                        <span
                          className={`crm-badge ${act.taskStatus === 'Approved' ? 'crm-badge-active' : act.taskStatus === 'Needs Revision' ? 'crm-badge-rejected' : 'crm-badge-pending'}`}
                          style={{ fontSize: '10.5px' }}
                        >
                          {act.taskStatus}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: '12px' }}>
                      <strong className="text-dark">{act.studentName}</strong>
                      <span>({act.studentId})</span>
                      <span>&bull;</span>
                      <span style={{ color: 'var(--crm-purple)' }}>{act.course}</span>
                    </div>

                    <p className="text-secondary mb-3" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      {act.workDescription}
                    </p>

                    {/* Mentor Feedback Box */}
                    <div
                      className="p-3 rounded-3 border mb-2 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2"
                      style={{ backgroundColor: '#FAF5FF', borderColor: 'var(--crm-purple-border)' }}
                    >
                      <div>
                        <div className="d-flex align-items-center gap-1.5 fw-semibold mb-1" style={{ color: 'var(--crm-navy)', fontSize: '12px' }}>
                          <MessageSquare size={13} style={{ color: 'var(--crm-purple)' }} />
                          <span>Mentor Feedback ({act.mentorName}):</span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: '12.5px' }}>
                          {act.mentorFeedback}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary text-nowrap"
                        style={{ fontSize: '11.5px', borderRadius: '6px' }}
                        onClick={() => handleOpenFeedback(act)}
                      >
                        Update Feedback
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="crm-table-container">
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Day &amp; Title</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Activity Date</th>
                    <th>Status</th>
                    <th>Mentor Feedback</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map(act => (
                    <tr key={act.id}>
                      <td>
                        <strong className="text-dark d-block" style={{ fontSize: '12.5px' }}>
                          {act.dayNumber}: {act.taskTitle}
                        </strong>
                        <span className="text-muted d-block text-truncate" style={{ fontSize: '11px', maxWidth: '280px' }}>
                          {act.workDescription}
                        </span>
                      </td>
                      <td>
                        <strong className="text-dark d-block" style={{ fontSize: '12px' }}>
                          {act.studentName}
                        </strong>
                        <span className="text-muted" style={{ fontSize: '10.5px' }}>
                          {act.studentId}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px' }}>{act.course}</td>
                      <td style={{ fontSize: '11.5px' }}>{act.activityDate}</td>
                      <td>
                        <span className={`crm-badge ${act.taskStatus === 'Approved' ? 'crm-badge-active' : act.taskStatus === 'Needs Revision' ? 'crm-badge-rejected' : 'crm-badge-pending'}`} style={{ fontSize: '10.5px' }}>
                          {act.taskStatus}
                        </span>
                      </td>
                      <td style={{ fontSize: '11.5px', maxWidth: '240px' }} className="text-truncate">
                        {act.mentorFeedback}
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border py-1 px-2 text-primary"
                          style={{ fontSize: '11.5px' }}
                          onClick={() => handleOpenFeedback(act)}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Mentor Feedback & Status Modal */}
      {feedbackModalAct && (
        <div className="crm-modal-backdrop" onClick={() => setFeedbackModalAct(null)}>
          <div className="crm-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Mentor Feedback: {feedbackModalAct.dayNumber}
              </h3>
              <button type="button" className="btn-close" onClick={() => setFeedbackModalAct(null)} />
            </div>

            <form onSubmit={handleSaveFeedback}>
              <div className="crm-modal-body">
                <div className="p-3 bg-light rounded-3 border mb-3">
                  <div className="fw-bold text-dark" style={{ fontSize: '13.5px' }}>
                    {feedbackModalAct.taskTitle}
                  </div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>
                    Student: {feedbackModalAct.studentName} ({feedbackModalAct.course})
                  </div>
                  <p className="text-secondary mt-2 mb-0" style={{ fontSize: '12px' }}>
                    "{feedbackModalAct.workDescription}"
                  </p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>
                    Evaluation Status
                  </label>
                  <select
                    className="form-select"
                    value={feedbackStatus}
                    onChange={(e) => setFeedbackStatus(e.target.value)}
                  >
                    <option value="Approved">Approved (Distinction)</option>
                    <option value="Needs Revision">Needs Revision / Corrections</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>
                    Mentor Written Feedback &amp; Suggestions
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter actionable remarks, code review comments, or approval notes..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setFeedbackModalAct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <CheckCircle size={14} />
                  <span>Submit Mentor Evaluation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Daily Activity Modal (Simulation) */}
      {showSimulateModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowSimulateModal(false)}>
          <div className="crm-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Log Daily Activity (Portal Submission)
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowSimulateModal(false)} />
            </div>

            <form onSubmit={handleSimulateSubmit}>
              <div className="crm-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Student</label>
                  <select
                    className="form-select"
                    value={simForm.studentId}
                    onChange={(e) => setSimForm({ ...simForm, studentId: e.target.value })}
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name} - {s.course}</option>
                    ))}
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Day Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={simForm.dayNumber}
                      onChange={(e) => setSimForm({ ...simForm, dayNumber: e.target.value })}
                      placeholder="e.g. Day 5"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={simForm.activityDate}
                      onChange={(e) => setSimForm({ ...simForm, activityDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Task Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={simForm.taskTitle}
                    onChange={(e) => setSimForm({ ...simForm, taskTitle: e.target.value })}
                    placeholder="e.g. Day 5 – Mini Project Development"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Work Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={simForm.workDescription}
                    onChange={(e) => setSimForm({ ...simForm, workDescription: e.target.value })}
                    placeholder="Describe tasks completed, code pushed, and APIs built..."
                    required
                  />
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowSimulateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <Plus size={14} />
                  <span>Submit Activity Log</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMDailyActivitiesPage;
