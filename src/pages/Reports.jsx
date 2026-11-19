import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Ticket,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const Reports = () => {
  const { reports, addReport, updateReportStatus, currentUser } = useApp();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Operations');

  // Metrics
  const totalReports = reports.length;
  const approvedReports = reports.filter(r => r.status === 'Approved').length;
  const pendingReports = reports.filter(r => r.status !== 'Approved').length;

  // Chart Data (Inspired by Reference Image 1)
  const reportChartData = [
    { month: 'Jul', approved: 12, submitted: 14 },
    { month: 'Aug', approved: 18, submitted: 20 },
    { month: 'Sep', approved: 24, submitted: 26 },
    { month: 'Oct', approved: 22, submitted: 25 },
    { month: 'Nov', approved: 29, submitted: 32 }
  ];

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addReport({
      title: newTitle,
      category: newCategory,
      submittedBy: currentUser ? currentUser.name : 'Staff Member'
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const filteredReports = reports.filter(r => {
    if (filterStatus === 'All') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Reports &amp; Cohort Analytics</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Reference 1: Cohort performance audits, compliance reviews, and submission reports overview.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            onClick={() => navigate('/tickets')}
            className="btn btn-outline-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold bg-white"
            style={{ fontSize: '13px' }}
          >
            <Ticket size={16} />
            <span>Go to Tickets Hub</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
            style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
          >
            <Plus size={16} />
            <span>Submit Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Reference Image 1) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Total Reports</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-dark m-0">{totalReports}</h2>
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                <FileText size={22} />
              </div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Total cohort audits compiled</div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Approved Reports</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-success m-0">{approvedReports}</h2>
              <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                <CheckCircle2 size={22} />
              </div>
            </div>
            <div className="text-success fw-semibold mt-2" style={{ fontSize: '12px' }}>✓ Supervisor signed &amp; verified</div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Pending Reports</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-warning m-0">{pendingReports}</h2>
              <div className="p-2 rounded-3 bg-warning bg-opacity-10 text-warning">
                <Clock size={22} />
              </div>
            </div>
            <div className="text-warning fw-semibold mt-2" style={{ fontSize: '12px' }}>Under supervisor review</div>
          </div>
        </div>
      </div>

      {/* Reports Overview Chart (Reference 1) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-bold text-dark m-0">Reports Overview &amp; Verification Trend</h6>
            <small className="text-muted">Monthly report submissions vs manager sign-off rate</small>
          </div>
          <button onClick={() => window.print()} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 rounded-2">
            <Download size={14} /> <span>Export PDF</span>
          </button>
        </div>

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={reportChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="approvedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stop-color="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="submittedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stop-color="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="submitted" name="Submitted" stroke="#10b981" fillOpacity={1} fill="url(#submittedGrad)" />
              <Area type="monotone" dataKey="approved" name="Approved" stroke="#2563eb" fillOpacity={1} fill="url(#approvedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reports Table (Reference Image 1) */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold text-dark m-0">Recent Reports Table</h5>
            <small className="text-muted">Audit submissions, dates, and sign-off status</small>
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
                <th className="ps-4">REPORT ID</th>
                <th>REPORT TITLE</th>
                <th>SUBMITTED BY</th>
                <th>DATE</th>
                <th>CATEGORY</th>
                <th>STATUS</th>
                <th className="text-end pe-4">ACTION</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '13px' }}>
              {filteredReports.map((r) => (
                <tr key={r.id}>
                  <td className="ps-4">
                    <span className="fw-bold text-primary font-monospace">{r.id}</span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{r.title}</div>
                  </td>
                  <td>
                    <span className="text-dark fw-semibold">{r.submittedBy}</span>
                  </td>
                  <td className="text-muted">{r.date}</td>
                  <td>
                    <span className="badge bg-light text-dark border">{r.category || 'General'}</span>
                  </td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        r.status === 'Approved'
                          ? 'bg-success bg-opacity-10 text-success'
                          : 'bg-warning bg-opacity-10 text-warning'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {r.status !== 'Approved' ? (
                      <button
                        onClick={() => updateReportStatus(r.id, 'Approved')}
                        className="btn btn-sm btn-outline-success py-1 px-2 rounded-2"
                        style={{ fontSize: '12px' }}
                      >
                        Approve Report
                      </button>
                    ) : (
                      <span className="text-success fw-semibold" style={{ fontSize: '12px' }}>✓ Signed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Report Modal */}
      {showAddModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1100 }}
        >
          <div className="bg-white rounded-4 shadow-lg w-100 p-4" style={{ maxWidth: '480px' }}>
            <h5 className="fw-bold text-dark mb-3">Submit Audit / Cohort Report</h5>
            <form onSubmit={handleCreateReport}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Report Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Q4 Task SLA Compliance Review"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Category</label>
                <select className="form-select" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  <option value="Operations">Operations</option>
                  <option value="Technical">Technical</option>
                  <option value="Academics">Academics</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-light">Cancel</button>
                <button type="submit" className="btn btn-primary fw-semibold">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
