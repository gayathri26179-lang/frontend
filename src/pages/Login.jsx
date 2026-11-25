import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Building, Sparkles } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@aritcompany.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your administrator email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Realistic demo authentication check
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes('arit') || email.toLowerCase().includes('admin') || password.length >= 6) {
        localStorage.setItem('arit_admin_token', 'demo_jwt_ar_it_company_2026');
        localStorage.setItem('arit_auth', JSON.stringify({
          authenticated: true,
          email,
          role: 'Senior IT Director & Admin',
          name: 'Dr. Maya Raman',
          loginTime: new Date().toISOString()
        }));
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Use admin@aritcompany.com / admin123 or click "Demo Admin Login".');
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail('admin@aritcompany.com');
    setPassword('admin123');
    setError('');
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      alert('Please enter a valid company email address.');
      return;
    }
    setResetSent(true);
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetSent(false);
      setResetEmail('');
      alert(`Password reset instructions sent to ${resetEmail}. Check your inbox.`);
    }, 1500);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 position-relative"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #172554 45%, #2a1548 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Tech Shapes */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(112,69,181,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,164,196,0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative z-1" style={{ maxWidth: '1020px' }}>
        <div
          className="row g-0 rounded-4 overflow-hidden shadow-lg border"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: '#FFFFFF'
          }}
        >
          {/* Left Hero Column */}
          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative"
            style={{
              background: 'linear-gradient(180deg, #172554 0%, #111a3b 60%, #1e1338 100%)',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div>
              <Logo size="lg" light={true} />
              
              <div className="mt-5">
                <span
                  className="badge px-3 py-2 rounded-pill fw-semibold mb-3 d-inline-flex align-items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(233, 164, 196, 0.15)',
                    color: '#E9A4C4',
                    border: '1px solid rgba(233, 164, 196, 0.3)'
                  }}
                >
                  <Sparkles size={14} /> Enterprise Management System
                </span>

                <h2 className="display-6 fw-bold text-white lh-sm mb-3" style={{ fontSize: '28px' }}>
                  Student &amp; Internship Governance Portal
                </h2>
                
                <p className="text-light opacity-75" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                  Unified administration console for student enrollments, daily activity evaluation, attendance tracking, cohort velocity, and verifiable certification.
                </p>
              </div>
            </div>

            <div>
              <div
                className="p-3 rounded-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2 text-warning" style={{ color: '#E9A4C4' }}>
                  <ShieldCheck size={18} />
                  <span className="fw-semibold" style={{ fontSize: '13px' }}>
                    AR IT COMPANY Security Standards
                  </span>
                </div>
                <ul className="list-unstyled m-0" style={{ fontSize: '12px' }}>
                  <li className="mb-1 d-flex align-items-center gap-2 text-light opacity-80">
                    <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                    Automated Website Registration Ingestion
                  </li>
                  <li className="mb-1 d-flex align-items-center gap-2 text-light opacity-80">
                    <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                    Multi-Theme Verifiable PDF Certificates
                  </li>
                  <li className="d-flex align-items-center gap-2 text-light opacity-80">
                    <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                    Daily Internship Activity &amp; Feedback Logs
                  </li>
                </ul>
              </div>

              <div className="mt-3 text-white-50" style={{ fontSize: '11px' }}>
                &copy; {new Date().getFullYear()} AR IT COMPANY. All rights reserved.
              </div>
            </div>
          </div>

          {/* Right Login Form Column */}
          <div className="col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
            <div className="d-lg-none mb-4">
              <Logo size="md" light={false} />
            </div>

            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="fw-bold mb-1" style={{ color: '#172554', fontSize: '24px' }}>
                  Admin Portal Login
                </h3>
                <span
                  className="badge px-2.5 py-1 rounded-pill"
                  style={{ backgroundColor: '#f3e8ff', color: '#7045B5', fontSize: '11px', fontWeight: 600 }}
                >
                  Authorized Personnel Only
                </span>
              </div>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                Sign in with your administrative credentials to manage AR IT COMPANY cohorts.
              </p>
            </div>

            {error && (
              <div
                className="alert alert-danger py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2"
                style={{ fontSize: '13.5px' }}
              >
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: '13px' }}>
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0 ps-1"
                    placeholder="admin@aritcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-semibold text-secondary mb-0" style={{ fontSize: '13px' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    style={{ fontSize: '12.5px', color: '#7045B5' }}
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control bg-light border-start-0 border-end-0 ps-1"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label text-secondary" htmlFor="rememberMe" style={{ fontSize: '13px' }}>
                    Remember this workstation
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn w-100 py-2.5 fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2 rounded-3"
                style={{
                  backgroundColor: '#7045B5',
                  borderColor: '#7045B5',
                  fontSize: '14.5px'
                }}
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to CRM Portal</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Quick Demo Credentials Box */}
              <div
                className="mt-4 p-3 rounded-3"
                style={{
                  backgroundColor: '#F5F6FA',
                  border: '1px dashed #CBD5E1'
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-bold d-block" style={{ fontSize: '12px', color: '#172554' }}>
                      Evaluation Quick Fill
                    </span>
                    <span className="text-muted" style={{ fontSize: '11px' }}>
                      admin@aritcompany.com &bull; admin123
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    style={{ fontSize: '11.5px', borderRadius: '6px' }}
                    onClick={handleFillDemo}
                  >
                    Fill Credentials
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="crm-modal-backdrop" onClick={() => setShowForgotPassword(false)}>
          <div
            className="crm-modal-card"
            style={{ maxWidth: '440px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: '#172554' }}>
                Reset Admin Password
              </h3>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowForgotPassword(false)}
              />
            </div>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="crm-modal-body">
                <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                  Enter your registered AR IT COMPANY administrative email address. A secure one-time password reset link will be dispatched.
                </p>
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin@aritcompany.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSent}
                  className="crm-btn crm-btn-primary crm-btn-sm"
                >
                  {resetSent ? 'Dispatching...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
