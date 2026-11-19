import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Calendar,
  Clock,
  Users,
  ShoppingBag,
  CheckSquare,
  CheckCircle2,
  Send,
  Filter
} from 'lucide-react';

const Activities = () => {
  const { activities, addActivity, toggleChecklistItem, currentUser } = useApp();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [workSummary, setWorkSummary] = useState('');
  const [hoursWorked, setHoursWorked] = useState('8.0');
  const [peopleContacted, setPeopleContacted] = useState('4');
  const [ordersHandled, setOrdersHandled] = useState('2');
  const [status, setStatus] = useState('Pending');
  const [successMessage, setSuccessMessage] = useState('');

  const [filterStatus, setFilterStatus] = useState('All');

  // Interactive Daily Checklist
  const [dailyChecklist, setDailyChecklist] = useState([
    { id: 1, text: 'Attend 09:30 AM Engineering Standup Sync', done: true },
    { id: 2, text: 'Review & triage high-priority blocker tickets', done: true },
    { id: 3, text: 'Commit unit tests & push branch for code review', done: false },
    { id: 4, text: 'Update milestone progress in course track', done: false },
    { id: 5, text: 'Submit verified timesheet & work accomplishments', done: true }
  ]);

  const toggleLocalChecklist = (id) => {
    setDailyChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!workSummary.trim()) return;

    addActivity({
      date,
      workSummary,
      hoursWorked: parseFloat(hoursWorked) || 8.0,
      peopleContacted: parseInt(peopleContacted) || 0,
      ordersHandled: parseInt(ordersHandled) || 0,
      status: currentUser?.role === 'Manager' ? 'Approved' : 'Pending',
      submittedBy: currentUser ? currentUser.name : 'Staff Member',
      checklist: dailyChecklist
    });

    setWorkSummary('');
    setSuccessMessage('Daily activity update submitted successfully to database!');
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  const filteredActivities = activities.filter(a => {
    if (filterStatus === 'All') return true;
    return a.status === filterStatus;
  });

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Daily Activity Tracking &amp; Work Submissions</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Reference 6: Log work hours, contacts, order processing, and daily task checklists for cohort review.
          </p>
        </div>
        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold">
          📅 Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {successMessage && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4 shadow-sm py-2">
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '13px' }}>{successMessage}</span>
        </div>
      )}

      <div className="row g-4">
        {/* Left Column: Submit Update Form (Reference Image 6) */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                <Activity size={20} />
              </div>
              <h5 className="fw-bold text-dark m-0">Submit Daily Activity Update</h5>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                    Activity Date <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <Calendar size={16} className="position-absolute top-50 translate-middle-y text-secondary ms-3" />
                    <input
                      type="date"
                      className="form-control ps-5 py-2 rounded-3"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                    Hours Worked
                  </label>
                  <div className="position-relative">
                    <Clock size={16} className="position-absolute top-50 translate-middle-y text-secondary ms-3" />
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="16"
                      className="form-control ps-5 py-2 rounded-3"
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                    People Contacted
                  </label>
                  <div className="position-relative">
                    <Users size={16} className="position-absolute top-50 translate-middle-y text-secondary ms-3" />
                    <input
                      type="number"
                      min="0"
                      className="form-control ps-5 py-2 rounded-3"
                      placeholder="e.g. 5"
                      value={peopleContacted}
                      onChange={(e) => setPeopleContacted(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                    Orders / Tickets Handled
                  </label>
                  <div className="position-relative">
                    <ShoppingBag size={16} className="position-absolute top-50 translate-middle-y text-secondary ms-3" />
                    <input
                      type="number"
                      min="0"
                      className="form-control ps-5 py-2 rounded-3"
                      placeholder="e.g. 3"
                      value={ordersHandled}
                      onChange={(e) => setOrdersHandled(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                  Detailed Work Accomplishments &amp; Key Deliverables <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control rounded-3"
                  rows="4"
                  placeholder="Detail module accomplishments, PR reviews, blockers solved, or client communications..."
                  value={workSummary}
                  onChange={(e) => setWorkSummary(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2">
                <span className="text-muted" style={{ fontSize: '12px' }}>
                  Submitting as: <strong>{currentUser?.name || 'Sarah Jenkins'}</strong>
                </span>

                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-4 py-2 fw-semibold shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
                >
                  <Send size={16} />
                  <span>Submit Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Daily Checklist & Quick Stats */}
        <div className="col-12 col-lg-5">
          {/* Daily Checklist Card (Reference 6) */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <CheckSquare size={18} className="text-primary" />
                <span>Daily Milestone Checklist</span>
              </h6>
              <span className="badge bg-primary bg-opacity-10 text-primary">
                {dailyChecklist.filter(c => c.done).length}/{dailyChecklist.length} Done
              </span>
            </div>

            <div className="list-group list-group-flush">
              {dailyChecklist.map((item) => (
                <label
                  key={item.id}
                  className="list-group-item px-0 py-2 border-0 d-flex align-items-center gap-3 cursor-pointer"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input mt-0"
                    checked={item.done}
                    onChange={() => toggleLocalChecklist(item.id)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      textDecoration: item.done ? 'line-through' : 'none',
                      color: item.done ? '#94a3b8' : '#0f172a'
                    }}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Weekly Effort Breakdown</h6>
            <div className="p-3 bg-light rounded-3 border mb-2 d-flex justify-content-between align-items-center">
              <span className="text-muted" style={{ fontSize: '13px' }}>Total Hours (This Week)</span>
              <strong className="text-primary fs-5">38.5 hrs</strong>
            </div>
            <div className="p-3 bg-light rounded-3 border mb-2 d-flex justify-content-between align-items-center">
              <span className="text-muted" style={{ fontSize: '13px' }}>Avg. Orders / Day</span>
              <strong className="text-success fs-5">3.2</strong>
            </div>
            <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
              <span className="text-muted" style={{ fontSize: '13px' }}>Manager Approval SLA</span>
              <strong className="text-dark fs-5">100%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Logs Table (Reference Image 6) */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden mt-4">
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold text-dark m-0">Recent Activity Logs</h5>
            <small className="text-muted">History of submitted work updates and supervisor reviews</small>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => setFilterStatus('All')}
              className={`btn btn-sm rounded-pill px-3 ${filterStatus === 'All' ? 'btn-primary' : 'btn-light'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('Approved')}
              className={`btn btn-sm rounded-pill px-3 ${filterStatus === 'Approved' ? 'btn-primary' : 'btn-light'}`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus('Pending')}
              className={`btn btn-sm rounded-pill px-3 ${filterStatus === 'Pending' ? 'btn-primary' : 'btn-light'}`}
            >
              Pending
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: '12px', color: '#64748b' }}>
                <th className="ps-4">DATE</th>
                <th>SUBMITTED BY</th>
                <th>WORK SUMMARY</th>
                <th>HOURS</th>
                <th>CONTACTS</th>
                <th>ORDERS</th>
                <th className="pe-4">STATUS</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '13px' }}>
              {filteredActivities.map((act) => (
                <tr key={act.id}>
                  <td className="ps-4 fw-semibold text-dark">{act.date}</td>
                  <td>
                    <span className="fw-bold text-primary">{act.submittedBy}</span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark line-clamp-2" style={{ maxWidth: '420px' }}>
                      {act.workSummary}
                    </div>
                  </td>
                  <td><strong>{act.hoursWorked}h</strong></td>
                  <td>{act.peopleContacted} contacts</td>
                  <td>{act.ordersHandled} orders</td>
                  <td className="pe-4">
                    <span
                      className={`badge px-2 py-1 ${
                        act.status === 'Approved'
                          ? 'bg-success bg-opacity-10 text-success'
                          : 'bg-warning bg-opacity-10 text-warning'
                      }`}
                    >
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
