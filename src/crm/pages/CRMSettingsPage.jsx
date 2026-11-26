import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import Logo from '../../components/Logo';
import {
  Settings,
  Building,
  User,
  Lock,
  Bell,
  Save,
  CheckCircle,
  Database,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Download
} from 'lucide-react';

const CRMSettingsPage = ({ onLogout }) => {
  const {
    currentUser,
    setCurrentUser,
    syncInternshipWebsiteRegistrations,
    isSyncing,
    showToast
  } = useCRM();

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    avatar: currentUser.avatar
  });

  // Company Information Form
  const [companyForm, setCompanyForm] = useState({
    companyName: 'AR IT COMPANY',
    tagline: 'Center of Excellence in Software Engineering & IT Training',
    email: 'contact@aritcompany.com',
    phone: '+91 (080) 4123-8900',
    website: 'https://aritcompany.com',
    taxId: 'ARIT-BLR-REG-2026-9042',
    address: 'Cyber Tower, Tech Park Phase 2, Whitefield, Bangalore - 560066, Karnataka, India'
  });

  // Change Password Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Toggles
  const [notifPreferences, setNotifPreferences] = useState({
    emailRegistrations: true,
    emailDailyLogs: true,
    paymentAlerts: true,
    smsAlerts: false,
    systemSound: true
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, ...profileForm }));
    showToast('Administrator profile updated successfully.');
  };

  const handleCompanySave = (e) => {
    e.preventDefault();
    showToast('AR IT COMPANY corporate details updated.');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    showToast('Administrator password updated successfully.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleExportBackup = () => {
    const backupData = {
      backupDate: new Date().toISOString(),
      company: 'AR IT COMPANY',
      version: '2.0.0',
      data: {
        students: JSON.parse(localStorage.getItem('arit_students') || '[]'),
        courses: JSON.parse(localStorage.getItem('arit_courses') || '[]'),
        internships: JSON.parse(localStorage.getItem('arit_internships') || '[]'),
        payments: JSON.parse(localStorage.getItem('arit_payments') || '[]'),
        certificates: JSON.parse(localStorage.getItem('arit_certificates') || '[]')
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AR_IT_COMPANY_CRM_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('CRM full system backup exported.');
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            CRM &amp; Platform Settings
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Manage company branding, administrative profile, credentials, notifications, and shared backend integration
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Admin Profile & Company Information */}
        <div className="col-12 col-lg-7">
          {/* Admin Profile Card */}
          <div className="crm-card mb-4">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <User size={18} style={{ color: 'var(--crm-purple)' }} />
                <span>Administrator Profile</span>
              </h3>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src={profileForm.avatar}
                  alt={profileForm.name}
                  className="rounded-circle border"
                  style={{ width: '64px', height: '64px', objectFit: 'cover', borderColor: 'var(--crm-purple)' }}
                />
                <div className="flex-grow-1">
                  <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Avatar Image URL</label>
                  <input
                    type="url"
                    className="form-control form-control-sm"
                    value={profileForm.avatar}
                    onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Work Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Administrative Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <Save size={14} />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          </div>

          {/* Company Information Card */}
          <div className="crm-card mb-4">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <Building size={18} style={{ color: 'var(--crm-navy)' }} />
                <span>AR IT COMPANY Information</span>
              </h3>
            </div>

            <form onSubmit={handleCompanySave}>
              {/* Logo Preview */}
              <div className="p-3 bg-light rounded-3 border mb-3 d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                    Corporate Brand Logo
                  </span>
                  <div className="mt-1">
                    <Logo size="md" light={false} />
                  </div>
                </div>
                <span className="badge bg-white text-dark border px-2.5 py-1" style={{ fontSize: '11px' }}>
                  Primary Identity
                </span>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Company Legal Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyForm.companyName}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Official Tax / Reg ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyForm.taxId}
                    onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Support Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={companyForm.email}
                    onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Contact Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={companyForm.phone}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Official Headquarters Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <Save size={14} />
                  <span>Save Company Information</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Password, Notifications, Backup, Shared Integration */}
        <div className="col-12 col-lg-5">
          {/* Change Password Card */}
          <div className="crm-card mb-4">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <Lock size={18} style={{ color: 'var(--crm-purple)' }} />
                <span>Change Password</span>
              </h3>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-2">
                <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Min 6 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="crm-btn crm-btn-outline crm-btn-sm w-100 justify-content-center">
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="crm-card mb-4">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <Bell size={18} style={{ color: 'var(--crm-navy)' }} />
                <span>Notification Preferences</span>
              </h3>
            </div>

            <div className="d-flex flex-column gap-3">
              <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                <label className="form-check-label text-dark" style={{ fontSize: '13px' }}>
                  New Student Registration Email
                </label>
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={notifPreferences.emailRegistrations}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, emailRegistrations: e.target.checked })}
                />
              </div>

              <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                <label className="form-check-label text-dark" style={{ fontSize: '13px' }}>
                  Daily Activity Submission Alerts
                </label>
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={notifPreferences.emailDailyLogs}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, emailDailyLogs: e.target.checked })}
                />
              </div>

              <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                <label className="form-check-label text-dark" style={{ fontSize: '13px' }}>
                  Fee Payment &amp; Receipt Notifications
                </label>
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={notifPreferences.paymentAlerts}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, paymentAlerts: e.target.checked })}
                />
              </div>

              <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                <label className="form-check-label text-dark" style={{ fontSize: '13px' }}>
                  SMS Critical Alerts
                </label>
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  checked={notifPreferences.smsAlerts}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, smsAlerts: e.target.checked })}
                />
              </div>
            </div>
          </div>

          {/* Backend Integration & Backup */}
          <div className="crm-card mb-4" style={{ backgroundColor: '#FAF5FF', borderColor: 'var(--crm-purple-border)' }}>
            <h4 className="fw-bold mb-1" style={{ color: 'var(--crm-navy)', fontSize: '15px' }}>
              Shared Backend Integration
            </h4>
            <p className="text-secondary mb-3" style={{ fontSize: '12.5px', lineHeight: '1.6' }}>
              Connected to the AR IT COMPANY shared backend API. Registrations submitted through the separate Internship Website automatically appear in this CRM database.
            </p>

            <button
              type="button"
              className="crm-btn crm-btn-primary crm-btn-sm w-100 justify-content-center mb-2"
              onClick={syncInternshipWebsiteRegistrations}
              disabled={isSyncing}
            >
              <RefreshCw size={13} className={isSyncing ? 'spin-animation' : ''} />
              <span>{isSyncing ? 'Connecting to Registration API...' : 'Simulate Website Sync'}</span>
            </button>

            <button
              type="button"
              className="crm-btn crm-btn-outline crm-btn-sm w-100 justify-content-center"
              onClick={handleExportBackup}
            >
              <Download size={13} />
              <span>Export System Backup (JSON)</span>
            </button>
          </div>

          {/* Sign Out Card */}
          <div className="crm-card p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <strong className="text-dark d-block" style={{ fontSize: '13px' }}>Sign Out</strong>
                <span className="text-muted" style={{ fontSize: '11px' }}>End administrator workstation session</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={onLogout}
                style={{ fontSize: '12px' }}
              >
                <LogOut size={13} className="me-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMSettingsPage;
