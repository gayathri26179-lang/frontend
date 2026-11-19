import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TaskModal from '../components/TaskModal';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

const Tasks = () => {
  const { tasks, deleteTask, toggleTaskStatus } = useApp();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedTaskView, setSelectedTaskView] = useState(null);

  // Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.orderRef && t.orderRef.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || t.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete task "${name}" (#${id})?`)) {
      deleteTask(id);
    }
  };

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Task &amp; Order Management</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Reference 3 &amp; 4: Enterprise task triage, team delegation, status filters, and order tracking.
          </p>
        </div>

        <button
          onClick={() => { setTaskToEdit(null); setIsModalOpen(true); }}
          className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
          style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
        >
          <Plus size={16} />
          <span>Create Task</span>
        </button>
      </div>

      {/* KPI Cards (Inspired by Reference Images 3 & 4) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Total Tasks</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-dark m-0">{totalTasks}</h2>
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                <ClipboardList size={22} />
              </div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Tracked in system</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Completed Tasks</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-success m-0">{completedTasks}</h2>
              <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                <CheckCircle2 size={22} />
              </div>
            </div>
            <div className="text-success fw-semibold mt-2" style={{ fontSize: '12px' }}>✓ Verified deliverables</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Pending Tasks</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-warning m-0">{pendingTasks}</h2>
              <div className="p-2 rounded-3 bg-warning bg-opacity-10 text-warning">
                <Clock size={22} />
              </div>
            </div>
            <div className="text-warning fw-semibold mt-2" style={{ fontSize: '12px' }}>Awaiting execution</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>In Progress Tasks</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h2 className="fw-bold text-primary m-0">{inProgressTasks}</h2>
              <div className="p-2 rounded-3 bg-info bg-opacity-10 text-info">
                <AlertCircle size={22} />
              </div>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Under active development</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 bg-white mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-5">
            <div className="position-relative">
              <Search
                size={18}
                className="position-absolute top-50 translate-middle-y text-secondary"
                style={{ left: '14px' }}
              />
              <input
                type="text"
                className="form-control rounded-3 ps-5 py-2 bg-light border-0"
                placeholder="Search by task name, ID, member or order #..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="d-flex align-items-center gap-2">
              <Filter size={16} className="text-muted" />
              <select
                className="form-select py-2 rounded-3 border-0 bg-light"
                style={{ fontSize: '13px' }}
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="col-6 col-md-4">
            <select
              className="form-select py-2 rounded-3 border-0 bg-light"
              style={{ fontSize: '13px' }}
              value={selectedPriority}
              onChange={(e) => { setSelectedPriority(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Table (References 3 & 4) */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: '12px', color: '#64748b' }}>
                <th className="ps-4">TASK ID</th>
                <th>TASK NAME</th>
                <th>ORDER REF</th>
                <th>ASSIGNED TO</th>
                <th>DUE DATE</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th className="text-end pe-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '13px' }}>
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No tasks found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="ps-4">
                      <span className="fw-bold text-primary font-monospace">{task.id}</span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{task.name}</div>
                      <small className="text-muted">{task.category}</small>
                    </td>
                    <td>
                      <code className="text-secondary fw-semibold">{task.orderRef || 'ORD-8941'}</code>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '28px', height: '28px', fontSize: '11px' }}
                        >
                          {task.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{task.assignedTo}</span>
                      </div>
                    </td>
                    <td className="text-muted">{task.dueDate}</td>
                    <td>
                      <span
                        className={`badge px-2 py-1 ${
                          task.priority === 'Urgent'
                            ? 'bg-danger bg-opacity-10 text-danger'
                            : task.priority === 'High'
                            ? 'bg-warning bg-opacity-10 text-dark'
                            : 'bg-info bg-opacity-10 text-info'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`btn btn-sm px-2 py-1 border-0 ${
                          task.status === 'Completed'
                            ? 'bg-success bg-opacity-10 text-success'
                            : task.status === 'In Progress'
                            ? 'bg-primary bg-opacity-10 text-primary'
                            : 'bg-warning bg-opacity-10 text-warning'
                        }`}
                        title="Click to advance status"
                        style={{ fontSize: '12px', fontWeight: '600' }}
                      >
                        {task.status} ↻
                      </button>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          onClick={() => setSelectedTaskView(task)}
                          className="btn btn-sm btn-light p-2 text-secondary rounded-2"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleEdit(task)}
                          className="btn btn-sm btn-light p-2 text-primary rounded-2"
                          title="Edit Task"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id, task.name)}
                          className="btn btn-sm btn-light p-2 text-danger rounded-2"
                          title="Delete Task"
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

        {/* Pagination Bar */}
        <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light">
          <small className="text-muted">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
          </small>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline-secondary p-1 px-2 rounded-2"
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: '12px', fontWeight: '600' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline-secondary p-1 px-2 rounded-2"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal View */}
      {selectedTaskView && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1100 }}
        >
          <div className="bg-white rounded-4 shadow-lg w-100 p-4" style={{ maxWidth: '480px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-primary">{selectedTaskView.id}</span>
              <button onClick={() => setSelectedTaskView(null)} className="btn btn-sm btn-light rounded-circle">✕</button>
            </div>
            <h5 className="fw-bold text-dark">{selectedTaskView.name}</h5>
            <p className="text-muted" style={{ fontSize: '13px' }}>Category: {selectedTaskView.category}</p>

            <div className="p-3 bg-light rounded-3 mb-3 border" style={{ fontSize: '13px' }}>
              <div><strong>Assigned To:</strong> {selectedTaskView.assignedTo}</div>
              <div><strong>Order Reference:</strong> {selectedTaskView.orderRef}</div>
              <div><strong>Due Date:</strong> {selectedTaskView.dueDate}</div>
              <div><strong>Priority:</strong> {selectedTaskView.priority}</div>
              <div><strong>Current Status:</strong> {selectedTaskView.status}</div>
            </div>

            <button onClick={() => setSelectedTaskView(null)} className="btn btn-secondary w-100 rounded-3">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Task Edit/Create Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default Tasks;
