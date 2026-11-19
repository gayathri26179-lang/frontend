import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Mail,
  Briefcase,
  CheckCircle2,
  Search,
  Filter,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const { employees, tasks } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Employees &amp; Cohort Members</h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            Directory of active interns, mentors, and system administrators.
          </p>
        </div>
        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold">
          👥 {employees.length} Registered Members
        </span>
      </div>

      {/* Filter and Search */}
      <div className="card border-0 shadow-sm rounded-4 p-3 bg-white mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="position-relative">
              <Search size={18} className="position-absolute top-50 translate-middle-y text-secondary ms-3" />
              <input
                type="text"
                className="form-control rounded-3 ps-5 py-2 bg-light border-0"
                placeholder="Search by name, email or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-md-end gap-2">
            <select
              className="form-select rounded-3 border-0 bg-light w-auto"
              style={{ fontSize: '13px' }}
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Full-Stack Dev">Full-Stack Dev</option>
              <option value="DevOps & Cloud">DevOps &amp; Cloud</option>
              <option value="Data Science & AI">Data Science &amp; AI</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="row g-4">
        {filteredEmployees.map((emp) => {
          const empTasks = tasks.filter(t => t.assignedTo === emp.name);
          const completedCount = empTasks.filter(t => t.status === 'Completed').length;

          return (
            <div key={emp.id} className="col-12 col-md-6 col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="rounded-circle border border-2 border-primary"
                      style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-light text-dark border" style={{ fontSize: '10px' }}>
                          {emp.id}
                        </span>
                        <span
                          className={`badge ${
                            emp.role === 'Admin'
                              ? 'bg-danger bg-opacity-10 text-danger'
                              : emp.role === 'Manager'
                              ? 'bg-warning bg-opacity-10 text-warning'
                              : 'bg-primary bg-opacity-10 text-primary'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          {emp.role}
                        </span>
                      </div>
                      <h6 className="fw-bold text-dark mt-1 mb-0">{emp.name}</h6>
                      <small className="text-muted d-block text-truncate">{emp.department}</small>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 mb-3 border" style={{ fontSize: '12px' }}>
                    <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                      <Mail size={14} className="text-primary" />
                      <span className="text-truncate">{emp.email}</span>
                    </div>
                    <div className="d-flex justify-content-between pt-2 border-top">
                      <span><strong>Active Tasks:</strong> {empTasks.length} Assigned</span>
                      <span className="text-success fw-bold">✓ {completedCount} Done</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="text-muted fw-semibold" style={{ fontSize: '12px' }}>
                    Completion: <strong className="text-primary">{emp.completionRate}</strong>
                  </span>
                  <button
                    onClick={() => navigate(`/tasks?q=${encodeURIComponent(emp.name)}`)}
                    className="btn btn-outline-primary btn-sm rounded-3 d-flex align-items-center gap-1"
                  >
                    <span>View Tasks</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employees;
