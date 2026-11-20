import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CRMDailyTasksPage = () => {
  const { pendingTasks, students } = useCRM();
  const [tasksList, setTasksList] = useState([
    ...pendingTasks,
    {
      id: 'TASK-109',
      taskName: 'Implement Transformer Attention Mechanism from Scratch',
      studentName: 'Rohan Mehta',
      studentId: 'IAI-STU-102',
      course: 'AI & Machine Learning',
      assignedDate: '2026-11-18',
      dueDate: '2026-11-25',
      status: 'Assigned',
      priority: 'High'
    },
    {
      id: 'TASK-110',
      taskName: 'Microfrontend Architecture with Module Federation',
      studentName: 'Ananya Verma',
      studentId: 'IAI-STU-101',
      course: 'Full Stack Development',
      assignedDate: '2026-11-19',
      dueDate: '2026-11-26',
      status: 'Assigned',
      priority: 'Urgent'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: '',
    studentName: 'Ananya Verma',
    course: 'Full Stack Development',
    dueDate: '2026-11-28',
    priority: 'High',
    description: ''
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.taskName.trim()) return;

    const matchedStudent = students.find(s => s.name === newTask.studentName) || students[0];

    const created = {
      id: `TASK-${Math.floor(200 + Math.random() * 800)}`,
      taskName: newTask.taskName,
      studentName: matchedStudent.name,
      studentId: matchedStudent.id,
      course: newTask.course,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: newTask.dueDate,
      status: 'Assigned',
      priority: newTask.priority
    };

    setTasksList([created, ...tasksList]);
    setShowCreateModal(false);
    setNewTask({
      taskName: '',
      studentName: 'Ananya Verma',
      course: 'Full Stack Development',
      dueDate: '2026-11-28',
      priority: 'High',
      description: ''
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Daily Tasks & Assignment Board
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Assign hands-on industry tasks, track student implementation, and monitor completion timelines
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={15} />
          <span>Assign New Task</span>
        </button>
      </div>

      <div className="crm-card">
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Student Assigned</th>
                <th>Course</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasksList.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className="font-monospace text-primary fw-bold" style={{ fontSize: '11px' }}>
                      {t.id}
                    </span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{t.taskName}</div>
                  </td>
                  <td>
                    <div className="fw-medium text-dark">{t.studentName}</div>
                    <div className="text-muted font-monospace" style={{ fontSize: '11px' }}>{t.studentId}</div>
                  </td>
                  <td>
                    <span className="badge bg-light text-secondary border" style={{ fontSize: '11px' }}>
                      {t.course}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: t.priority === 'Urgent' ? '#fef2f2' : t.priority === 'High' ? '#fff7ed' : '#eff6ff',
                        color: t.priority === 'Urgent' ? '#ef4444' : t.priority === 'High' ? '#ea580c' : '#2563eb'
                      }}
                    >
                      {t.priority || 'Medium'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '12px' }}>
                      <Calendar size={13} />
                      <span>{t.dueDate}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`crm-badge ${t.status === 'Approved' ? 'active' : 'on-leave'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="crm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '17px', color: '#1e1b4b' }}>
                Assign Task to Student
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)} />
            </div>
            <form onSubmit={handleCreateTask}>
              <div className="crm-modal-body">
                <div className="crm-form-group mb-3">
                  <label className="crm-form-label">Task Title *</label>
                  <input
                    type="text"
                    className="crm-form-control"
                    placeholder="e.g. Fine-tune BERT on Legal QA Dataset"
                    value={newTask.taskName}
                    onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="crm-form-label">Assign to Student</label>
                    <select
                      className="crm-form-control"
                      value={newTask.studentName}
                      onChange={(e) => setNewTask({ ...newTask, studentName: e.target.value })}
                    >
                      {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.course})</option>)}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="crm-form-label">Priority</label>
                    <select
                      className="crm-form-control"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="crm-form-group mb-3">
                  <label className="crm-form-label">Due Date</label>
                  <input
                    type="date"
                    className="crm-form-control"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>

                <div className="crm-form-group mb-2">
                  <label className="crm-form-label">Description & Instructions</label>
                  <textarea
                    className="crm-form-control"
                    rows="3"
                    placeholder="Specify project goals, acceptance criteria, and repository submission guidelines..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="crm-modal-footer">
                <button type="button" className="crm-btn crm-btn-outline crm-btn-sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMDailyTasksPage;
