import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, taskToEdit = null }) => {
  const { addTask, updateTask, employees } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    assignedTo: employees[0]?.name || 'Sarah Jenkins',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    status: 'Pending',
    category: 'Frontend UI',
    orderRef: `ORD-${Math.floor(8000 + Math.random() * 1000)}`
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData(taskToEdit);
    } else {
      setFormData({
        name: '',
        assignedTo: employees[0]?.name || 'Sarah Jenkins',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        status: 'Pending',
        category: 'Frontend UI',
        orderRef: `ORD-${Math.floor(8000 + Math.random() * 1000)}`
      });
    }
  }, [taskToEdit, employees, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (taskToEdit) {
      updateTask(taskToEdit.id, formData);
    } else {
      addTask(formData);
    }
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1100 }}
    >
      <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden" style={{ maxWidth: '520px' }}>
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
          <h5 className="m-0 fw-bold text-dark">
            {taskToEdit ? `Edit Task #${taskToEdit.id}` : 'Create New Task & Order'}
          </h5>
          <button onClick={onClose} className="btn btn-sm btn-light rounded-circle p-1">
            <X size={20} className="text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
              Task Title / Deliverable <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="e.g. Implement OAuth 2.0 Auth Flow"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Assign To Member
              </label>
              <select
                className="form-select py-2"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name} ({emp.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Due Date
              </label>
              <input
                type="date"
                className="form-control py-2"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Priority Level
              </label>
              <select
                className="form-select py-2"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Status
              </label>
              <select
                className="form-select py-2"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                Category
              </label>
              <select
                className="form-select py-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Frontend UI">Frontend UI</option>
                <option value="Backend Security">Backend Security</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Data Engineering">Data Engineering</option>
                <option value="Quality Assurance">Quality Assurance</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" onClick={onClose} className="btn btn-light px-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4 fw-semibold">
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
