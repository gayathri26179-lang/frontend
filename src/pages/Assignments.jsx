import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Assignments = () => {
  const { employees, tasks, toggleTaskStatus } = useApp();
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Task Assignment &amp; Workload Matrix</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Workload distribution, assigned tickets, and progress across cohort engineers.
          </p>
        </div>
        <button
          onClick={() => navigate('/tasks')}
          className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
          style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
        >
          <Plus size={16} />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Member Assignment Columns */}
      <div className="row g-4">
        {employees.map((emp) => {
          const empTasks = tasks.filter(t => t.assignedTo === emp.name);

          return (
            <div key={emp.id} className="col-12 col-md-6 col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                {/* Employee Header */}
                <div className="d-flex align-items-center gap-3 pb-3 border-bottom mb-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="rounded-circle border border-2 border-primary"
                    style={{ width: '46px', height: '46px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="fw-bold text-dark m-0">{emp.name}</h6>
                    <small className="text-muted">{emp.department}</small>
                  </div>
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    {empTasks.length} Tasks
                  </span>
                </div>

                {/* Task List under Member */}
                <div className="d-flex flex-column gap-2 flex-grow-1">
                  {empTasks.length === 0 ? (
                    <div className="text-center py-4 text-muted" style={{ fontSize: '13px' }}>
                      No active assignments.
                    </div>
                  ) : (
                    empTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-3 border bg-light d-flex justify-content-between align-items-center transition-all"
                      >
                        <div className="overflow-hidden pe-2">
                          <span className="fw-bold text-primary font-monospace" style={{ fontSize: '11px' }}>
                            {t.id}
                          </span>
                          <div className="fw-semibold text-dark text-truncate" style={{ fontSize: '13px' }}>
                            {t.name}
                          </div>
                          <small className="text-muted" style={{ fontSize: '11px' }}>
                            Due: {t.dueDate}
                          </small>
                        </div>

                        <button
                          onClick={() => toggleTaskStatus(t.id)}
                          className={`btn btn-sm px-2 py-1 border-0 ${
                            t.status === 'Completed'
                              ? 'bg-success bg-opacity-10 text-success'
                              : t.status === 'In Progress'
                              ? 'bg-primary bg-opacity-10 text-primary'
                              : 'bg-warning bg-opacity-10 text-warning'
                          }`}
                          style={{ fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}
                          title="Click to toggle status"
                        >
                          {t.status}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Assignments;
