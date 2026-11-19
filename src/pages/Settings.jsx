import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Database,
  RotateCcw,
  Shield,
  CheckCircle2
} from 'lucide-react';

const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [ticketNotifications, setTicketNotifications] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  const handleResetData = () => {
    if (window.confirm('Reset all tasks, courses, activities, and tickets back to default seed data?')) {
      localStorage.removeItem('it_tasks');
      localStorage.removeItem('it_courses');
      localStorage.removeItem('it_activities');
      localStorage.removeItem('it_reports');
      localStorage.removeItem('it_tickets');
      window.location.reload();
    }
  };

  const handleSave = () => {
    setStatusMsg('System settings saved successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="container-fluid p-3 p-lg-4">
      <div className="mb-4">
        <h4 className="fw-bold text-dark m-0">System &amp; Application Settings</h4>
        <p className="text-muted m-0" style={{ fontSize: '13px' }}>
          Configure notification alerts, local storage persistence, and system preferences.
        </p>
      </div>

      {statusMsg && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4 shadow-sm py-2">
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '13px' }}>{statusMsg}</span>
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {/* Notification Preferences */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <Bell size={18} className="text-primary" />
              <span>Notification Preferences</span>
            </h5>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                <div>
                  <h6 className="fw-semibold text-dark m-0" style={{ fontSize: '14px' }}>Task Due Date Reminders</h6>
                  <small className="text-muted">Receive alerts 24 hours prior to deadline expiration</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={taskReminders}
                    onChange={(e) => setTaskReminders(e.target.checked)}
                    style={{ width: '38px', height: '20px' }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                <div>
                  <h6 className="fw-semibold text-dark m-0" style={{ fontSize: '14px' }}>Ticket Status Updates</h6>
                  <small className="text-muted">Notify immediately when a manager reviews or resolves a ticket</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={ticketNotifications}
                    onChange={(e) => setTicketNotifications(e.target.checked)}
                    style={{ width: '38px', height: '20px' }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-semibold text-dark m-0" style={{ fontSize: '14px' }}>Daily Activity Digest</h6>
                  <small className="text-muted">Daily evening summary of verified timesheet submissions</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    style={{ width: '38px', height: '20px' }}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                onClick={handleSave}
                className="btn btn-primary rounded-3 px-4 py-2 fw-semibold shadow-sm"
                style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
              >
                Save Preferences
              </button>
            </div>
          </div>

          {/* Database Diagnostics & Seed Reset */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <Database size={18} className="text-primary" />
              <span>Data Persistence &amp; Reset</span>
            </h5>
            <p className="text-muted" style={{ fontSize: '13px' }}>
              InternTrack caches active tasks, courses, tickets, and activities in browser <code>localStorage</code>.
              Clicking reset will safely restore initial seed records.
            </p>

            <button
              onClick={handleResetData}
              className="btn btn-outline-danger d-inline-flex align-items-center gap-2 rounded-3 px-4 py-2 fw-semibold"
            >
              <RotateCcw size={16} />
              <span>Reset to Clean Seed Data</span>
            </button>
          </div>
        </div>

        {/* System Information */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">System Specifications</h6>
            <div className="list-group list-group-flush" style={{ fontSize: '13px' }}>
              <div className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Application:</span>
                <strong>InternTrack Web App</strong>
              </div>
              <div className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Version:</span>
                <strong>2.4.0 (Enterprise)</strong>
              </div>
              <div className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Frontend Stack:</span>
                <span>React 19 + Bootstrap 5</span>
              </div>
              <div className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Icons &amp; Charts:</span>
                <span>Lucide React + Recharts</span>
              </div>
              <div className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Database Engine:</span>
                <span className="text-success fw-semibold">Local &amp; MySQL Compatible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
