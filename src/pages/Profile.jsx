import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  Shield,
  Briefcase,
  CheckCircle2,
  Lock,
  KeyRound,
  Award,
  Clock,
  Save
} from 'lucide-react';

const Profile = () => {
  const { currentUser } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(currentUser?.email || 'staff@interntrack.com');
  const [department, setDepartment] = useState(currentUser?.department || 'Full-Stack Development');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage('Profile information updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="container-fluid p-3 p-lg-4">
      <div className="mb-4">
        <h4 className="fw-bold text-dark m-0">My User Profile</h4>
        <p className="text-muted m-0" style={{ fontSize: '13px' }}>
          Manage your personal details, cohort track, and security credentials.
        </p>
      </div>

      {savedMessage && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4 shadow-sm py-2">
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '13px' }}>{savedMessage}</span>
        </div>
      )}

      <div className="row g-4">
        {/* Left Column: Avatar & Summary Card */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white text-center mb-4">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser?.name}
                className="rounded-circle border border-3 border-primary shadow-sm"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle border border-2 border-white"></span>
            </div>

            <h5 className="fw-bold text-dark mb-1">{currentUser?.name}</h5>
            <p className="text-muted mb-2" style={{ fontSize: '13px' }}>{currentUser?.title || currentUser?.department}</p>
            <span
              className={`badge px-3 py-2 rounded-pill ${
                currentUser?.role === 'Admin'
                  ? 'bg-danger bg-opacity-10 text-danger'
                  : currentUser?.role === 'Manager'
                  ? 'bg-warning bg-opacity-10 text-warning'
                  : 'bg-primary bg-opacity-10 text-primary'
              }`}
            >
              {currentUser?.role} Account
            </span>

            <div className="border-top mt-4 pt-3 text-start">
              <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: '13px' }}>
                <Mail size={16} className="text-primary" />
                <span>{currentUser?.email}</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: '13px' }}>
                <Briefcase size={16} className="text-primary" />
                <span>{currentUser?.department}</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '13px' }}>
                <Shield size={16} className="text-primary" />
                <span>ID: {currentUser?.id}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Credential Milestones</h6>
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-2 border">
              <Award size={24} className="text-warning" />
              <div>
                <div className="fw-semibold text-dark" style={{ fontSize: '13px' }}>Distinction Certificate</div>
                <small className="text-muted">Code: IT-2026-8942</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
              <Clock size={24} className="text-primary" />
              <div>
                <div className="fw-semibold text-dark" style={{ fontSize: '13px' }}>Total Hours Verified</div>
                <small className="text-muted">160.0 Hours Logged</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <h5 className="fw-bold text-dark mb-4">Edit Personal Information</h5>

            <form onSubmit={handleSave}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Full Name</label>
                  <input
                    type="text"
                    className="form-control py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Department / Cohort</label>
                  <input
                    type="text"
                    className="form-control py-2"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>System Access Level</label>
                  <input
                    type="text"
                    className="form-control py-2 bg-light"
                    value={currentUser?.role}
                    disabled
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-4 py-2 fw-semibold shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">Change Security Password</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Current Password</label>
                <input type="password" placeholder="••••••••" className="form-control py-2" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>New Password</label>
                <input type="password" placeholder="••••••••" className="form-control py-2" />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => alert('Password updated successfully in demo session!')}
                className="btn btn-outline-secondary rounded-3 px-4 py-2 fw-semibold"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
