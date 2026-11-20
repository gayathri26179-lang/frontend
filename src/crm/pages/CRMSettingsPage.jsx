import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Settings,
  Building,
  ShieldCheck,
  Bell,
  Award,
  User,
  Save,
  CheckCircle,
  Key,
  Globe
} from 'lucide-react';

const CRMSettingsPage = () => {
  const { currentAdmin } = useCRM();

  const [companySettings, setCompanySettings] = useState({
    companyName: 'Incredible AI Solutions',
    tagline: 'Premier IT Training & Applied Enterprise AI Internships',
    supportEmail: 'contact@incredibleai.solutions',
    website: 'https://incredibleai.solutions',
    headOffice: 'Tech Park Cyber City, Suite 800, Innovation Boulevard',
    certificatePrefix: 'IAI-2026',
    passGradePercentage: 80,
    enableAutoCertificates: true,
    emailAlertsOnSubmission: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            CRM & Platform Configurations
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Manage corporate identity, certificate authorization keys, and academic threshold policies
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={handleSave}
        >
          <Save size={14} />
          <span>Save Configuration</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3 rounded-3" style={{ fontSize: '13px' }}>
          <CheckCircle size={16} />
          <span>Settings successfully updated in local CRM registry.</span>
        </div>
      )}

      <div className="row g-4">
        {/* Left Column: Organization & Branding */}
        <div className="col-12 col-lg-7">
          <div className="crm-card mb-4">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <Building size={18} className="text-primary" />
                <span>Company & Training Identity</span>
              </h3>
            </div>

            <div className="crm-form-group mb-3">
              <label className="crm-form-label">Organization Legal Name</label>
              <input
                type="text"
                className="crm-form-control"
                value={companySettings.companyName}
                onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
              />
            </div>

            <div className="crm-form-group mb-3">
              <label className="crm-form-label">Corporate Tagline / Mission</label>
              <input
                type="text"
                className="crm-form-control"
                value={companySettings.tagline}
                onChange={(e) => setCompanySettings({ ...companySettings, tagline: e.target.value })}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="crm-form-label">Official Domain / Website</label>
                <input
                  type="text"
                  className="crm-form-control"
                  value={companySettings.website}
                  onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="crm-form-label">Support & Inquiries Email</label>
                <input
                  type="email"
                  className="crm-form-control"
                  value={companySettings.supportEmail}
                  onChange={(e) => setCompanySettings({ ...companySettings, supportEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="crm-form-group mb-0">
              <label className="crm-form-label">Global Headquarters Address</label>
              <textarea
                className="crm-form-control"
                rows="2"
                value={companySettings.headOffice}
                onChange={(e) => setCompanySettings({ ...companySettings, headOffice: e.target.value })}
              />
            </div>
          </div>

          {/* Certificate Authorization */}
          <div className="crm-card">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <Award size={18} className="text-primary" />
                <span>Certificate Issuance & Security</span>
              </h3>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="crm-form-label">Certificate Serial Code Prefix</label>
                <input
                  type="text"
                  className="crm-form-control font-monospace"
                  value={companySettings.certificatePrefix}
                  onChange={(e) => setCompanySettings({ ...companySettings, certificatePrefix: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="crm-form-label">Min. Pass Requirement (%)</label>
                <input
                  type="number"
                  className="crm-form-control"
                  value={companySettings.passGradePercentage}
                  onChange={(e) => setCompanySettings({ ...companySettings, passGradePercentage: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="autoCert"
                checked={companySettings.enableAutoCertificates}
                onChange={(e) => setCompanySettings({ ...companySettings, enableAutoCertificates: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="autoCert" style={{ fontSize: '13px' }}>
                Enable automatic verifiable certificate generation upon 100% course milestone completion
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Administrator Profile */}
        <div className="col-12 col-lg-5">
          <div className="crm-card mb-4">
            <div className="crm-card-header">
              <h3 className="crm-card-title">
                <User size={18} className="text-primary" />
                <span>Executive Admin Account</span>
              </h3>
            </div>

            <div className="text-center mb-3">
              <img
                src={currentAdmin.avatar}
                alt={currentAdmin.name}
                className="rounded-circle shadow-sm border mb-2"
                style={{ width: '90px', height: '90px', objectFit: 'cover' }}
              />
              <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '16px' }}>
                {currentAdmin.name}
              </h4>
              <div className="text-primary fw-semibold" style={{ fontSize: '12px' }}>
                {currentAdmin.role}
              </div>
              <div className="text-muted" style={{ fontSize: '11px' }}>
                {currentAdmin.email}
              </div>
            </div>

            <div className="p-3 rounded-3 bg-light border mb-3" style={{ fontSize: '12px' }}>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Security Role:</span>
                <span className="fw-bold text-dark">Super Administrator</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Access Level:</span>
                <span className="fw-bold text-success">Full System Read/Write</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Two-Factor Authentication:</span>
                <span className="badge bg-success bg-opacity-10 text-success">Active</span>
              </div>
            </div>

            <button
              type="button"
              className="crm-btn crm-btn-secondary w-100 crm-btn-sm justify-content-center"
              onClick={() => alert('Password reset link sent to registered email.')}
            >
              <Key size={14} />
              <span>Update Credentials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMSettingsPage;
