import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TicketModal from '../components/TicketModal';
import {
  Ticket,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const Tickets = () => {
  const { tickets, updateTicketStatus } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics (Reference 1)
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;
  const closedCount = tickets.filter(t => t.status === 'Closed').length;

  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Support &amp; Technical Blocker Tickets</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Reference 1: Raise queries, prioritize blockers, and track technical issue SLA resolution.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
          style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
        >
          <Plus size={16} />
          <span>Raise Support Ticket</span>
        </button>
      </div>

      {/* KPI Cards (Reference 1: Open, In Progress, Resolved, Closed) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Open Tickets</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-danger m-0">{openCount}</h2>
              <div className="p-2 rounded-3 bg-danger bg-opacity-10 text-danger">
                <AlertCircle size={22} />
              </div>
            </div>
            <div className="text-danger fw-semibold mt-2" style={{ fontSize: '12px' }}>Needs mentor triage</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>In Progress</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-primary m-0">{inProgressCount}</h2>
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                <Clock size={22} />
              </div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Being addressed by team</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Resolved</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-success m-0">{resolvedCount}</h2>
              <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                <CheckCircle2 size={22} />
              </div>
            </div>
            <div className="text-success fw-semibold mt-2" style={{ fontSize: '12px' }}>✓ SLA criteria met</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Closed</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-secondary m-0">{closedCount}</h2>
              <div className="p-2 rounded-3 bg-secondary bg-opacity-10 text-secondary">
                <XCircle size={22} />
              </div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Archived issues</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 bg-white mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="position-relative">
              <Search
                size={18}
                className="position-absolute top-50 translate-middle-y text-secondary"
                style={{ left: '14px' }}
              />
              <input
                type="text"
                className="form-control rounded-3 ps-5 py-2 bg-light border-0"
                placeholder="Search ticket code, issue or submitter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-md-end gap-2">
            {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-sm rounded-pill px-3 ${filterStatus === st ? 'btn-primary' : 'btn-light'}`}
                style={{ fontSize: '12px' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets Table (Reference 1) */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: '12px', color: '#64748b' }}>
                <th className="ps-4">TICKET ID</th>
                <th>ISSUE SUMMARY</th>
                <th>SUBMITTED BY</th>
                <th>ASSIGNED TO</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th className="text-end pe-4">STATUS ACTION</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '13px' }}>
              {filteredTickets.map((tck) => (
                <tr key={tck.id}>
                  <td className="ps-4">
                    <span className="fw-bold text-primary font-monospace">{tck.id}</span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{tck.issue}</div>
                    <small className="text-muted">Created: {tck.createdAt}</small>
                  </td>
                  <td>{tck.submittedBy}</td>
                  <td>
                    <span className="badge bg-light text-dark border">{tck.assignedTo}</span>
                  </td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        tck.priority === 'Urgent'
                          ? 'bg-danger bg-opacity-10 text-danger'
                          : tck.priority === 'High'
                          ? 'bg-warning bg-opacity-10 text-dark'
                          : 'bg-info bg-opacity-10 text-info'
                      }`}
                    >
                      {tck.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        tck.status === 'Resolved'
                          ? 'bg-success bg-opacity-10 text-success'
                          : tck.status === 'In Progress'
                          ? 'bg-primary bg-opacity-10 text-primary'
                          : tck.status === 'Closed'
                          ? 'bg-secondary bg-opacity-10 text-secondary'
                          : 'bg-danger bg-opacity-10 text-danger'
                      }`}
                    >
                      {tck.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <select
                      className="form-select form-select-sm d-inline-block w-auto border-0 bg-light"
                      value={tck.status}
                      onChange={(e) => updateTicketStatus(tck.id, e.target.value)}
                      style={{ fontSize: '12px' }}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Modal */}
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Tickets;
