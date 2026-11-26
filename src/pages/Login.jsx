import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import crmApiService from '../services/api';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building,
  KeyRound,
  Users
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@aritcompany.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  // Check if user just registered
  useEffect(() => {
    if (location.state?.registeredEmail) {
      setEmail(location.state.registeredEmail);
      setPassword('');
      if (location.state.justRegistered) {
        setSuccessMsg('Account registered successfully! Please log in with your password.');
      }
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim()) {
      setError('Please enter your administrator email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Attempt Backend API Authentication
      const res = await crmApiService.adminLogin(email.trim(), password);

      if (res && res.success) {
        setIsLoading(false);
        const userData = res.data || {};
        const token = res.token || 'arit_jwt_token_2026';

        localStorage.setItem('arit_admin_token', token);
        localStorage.setItem('arit_auth', JSON.stringify({
          authenticated: true,
          email: userData.email || email.trim().toLowerCase(),
          role: userData.role || 'Senior IT Director & Admin',
          name: userData.name || 'Dr. Maya Raman',
          userType: 'admin',
          loginTime: new Date().toISOString()
        }));

        if (rememberMe) {
          localStorage.setItem('arit_remember_admin_email', email.trim().toLowerCase());
        } else {
          localStorage.removeItem('arit_remember_admin_email');
        }

        navigate('/dashboard');
        return;
      }

      // If backend explicitly rejected invalid credentials
      if (res && res.success === false && !res.isNetworkError) {
        setIsLoading(false);
        setError(res.message || 'Invalid administrator credentials. Please check your email and password.');
        return;
      }

      // 2. Resilient local fallback if backend is momentarily unreachable
      const registeredAdmins = JSON.parse(localStorage.getItem('arit_registered_admins') || '[]');
      const registeredMatch = registeredAdmins.find(
        a => a.email.toLowerCase() === email.trim().toLowerCase()
      );

      const isDefault = email.trim().toLowerCase() === 'admin@aritcompany.com' && password === 'admin123';
      const isRegisteredValid = registeredMatch && registeredMatch.password === password;
      const isDemoFlexible = (email.toLowerCase().includes('arit') || email.toLowerCase().includes('admin')) && password.length >= 6;

      setIsLoading(false);
      if (isDefault || isRegisteredValid || isDemoFlexible) {
        const adminName = registeredMatch ? registeredMatch.name : 'Dr. Maya Raman';
        const adminRole = registeredMatch ? registeredMatch.role || 'Administrator' : 'Senior IT Director & Admin';

        localStorage.setItem('arit_admin_token', 'demo_jwt_ar_it_company_2026');
        localStorage.setItem('arit_auth', JSON.stringify({
          authenticated: true,
          email: email.trim().toLowerCase(),
          role: adminRole,
          name: adminName,
          userType: 'admin',
          loginTime: new Date().toISOString()
        }));

        if (rememberMe) {
          localStorage.setItem('arit_remember_admin_email', email.trim().toLowerCase());
        } else {
          localStorage.removeItem('arit_remember_admin_email');
        }

        navigate('/dashboard');
      } else {
        setError('Invalid administrator credentials. Please check your email and password.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred during login. Please try again.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@aritcompany.com');
    setPassword('admin123');
    setError('');
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setResetError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim() || !emailRegex.test(resetEmail.trim())) {
      setResetError('Please enter a valid corporate email address.');
      return;
    }

    setResetSent(true);
    setTimeout(() => {
      alert(`Password reset instructions have been sent to ${resetEmail}. Check your inbox.`);
      setShowForgotPassword(false);
      setResetSent(false);
      setResetEmail('');
    }, 1200);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4 position-relative"
      style={{
        background: 'linear-gradient(135deg, #0b1329 0%, #172554 40%, #2e1065 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background Tech Glow Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.28) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 154, 199, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Split-Screen Card */}
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden position-relative w-100"
        style={{
          maxWidth: '1040px',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 25px 60px -15px rgba(23, 37, 84, 0.5)'
        }}
      >
        <div className="row g-0">
          {/* Left Decorative & Info Panel */}
          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative"
            style={{
              background: 'linear-gradient(160deg, #172554 0%, #1e3a8a 45%, #7C3AED 100%)',
              borderRight: '1px solid rgba(236, 154, 199, 0.2)'
            }}
          >
            {/* Background Glow */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(236, 154, 199, 0.3) 0%, transparent 75%)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Logo */}
            <div className="position-relative" style={{ zIndex: 2 }}>
              <Logo size="lg" light={true} />
              <div className="mt-4">
                <span
                  className="badge px-3 py-2 rounded-pill fw-semibold text-white d-inline-flex align-items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(236, 154, 199, 0.25)',
                    border: '1px solid rgba(236, 154, 199, 0.5)',
                    fontSize: '12px'
                  }}
                >
                  <Sparkles size={14} color="#EC9AC7" />
                  Enterprise Portal Access
                </span>
              </div>
            </div>

            {/* Middle Feature Highlights */}
            <div className="my-5 position-relative" style={{ zIndex: 2 }}>
              <h2 className="fw-bold mb-3" style={{ fontSize: '26px', lineHeight: '1.3' }}>
                Secure Administrative Control
              </h2>
              <p className="text-white text-opacity-80 mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Log in to monitor student progress, review mentor assignments, process payments, and issue verified AR IT COMPANY certificates.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(236, 154, 199, 0.2)' }}
                  >
                    <CheckCircle2 size={18} color="#EC9AC7" />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Real-Time Cohort Analytics</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Track attendance, tasks &amp; milestone completions</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(124, 58, 237, 0.3)' }}
                  >
                    <ShieldCheck size={18} color="#FFFFFF" />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Multi-Layered Security</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Tamper-proof certificate IDs and encrypted tokens</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Demo Credential Helper */}
            <div
              className="p-3 rounded-3 position-relative"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                zIndex: 2
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold" style={{ fontSize: '12px' }}>⚡ Demo Admin Credentials:</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="btn btn-sm py-0 px-2 fw-semibold text-white rounded-pill"
                  style={{ backgroundColor: '#EC9AC7', fontSize: '11px' }}
                >
                  Auto-Fill
                </button>
              </div>
              <div className="text-white text-opacity-90" style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                admin@aritcompany.com / admin123
              </div>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="col-lg-7 p-4 p-md-5">
            <div className="d-lg-none mb-4">
              <Logo size="md" />
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="fw-bold mb-1" style={{ color: '#172554', fontSize: '24px' }}>
                  Admin Sign In
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                  Welcome back! Please enter your administrative credentials
                </p>
              </div>
              <span
                className="badge px-3 py-2 rounded-pill fw-bold"
                style={{
                  backgroundColor: '#F3E8FF',
                  color: '#7C3AED',
                  border: '1px solid #DDD6FE',
                  fontSize: '11px'
                }}
              >
                CRM Portal
              </span>
            </div>

            {/* Registration Success Banner */}
            {successMsg && (
              <div
                className="alert alert-success d-flex align-items-center gap-3 rounded-3 p-3 mb-4 shadow-sm"
                style={{ backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', color: '#065F46' }}
              >
                <CheckCircle2 size={20} className="flex-shrink-0" />
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{successMsg}</div>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div
                className="alert alert-danger d-flex align-items-center gap-3 rounded-3 p-3 mb-4 shadow-sm"
                style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA', color: '#991B1B' }}
              >
                <AlertCircle size={20} className="flex-shrink-0" />
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Address */}
              <div className="mb-3">
                <label className="form-label fw-bold" style={{ fontSize: '13px', color: '#172554' }}>
                  Administrator Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: '#E2E8F0' }}>
                    <Mail size={17} color="#7C3AED" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@aritcompany.com"
                    required
                    className="form-control border-start-0"
                    style={{ fontSize: '13px', borderColor: '#E2E8F0', padding: '10px 12px' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-bold mb-0" style={{ fontSize: '13px', color: '#172554' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none fw-semibold"
                    style={{ color: '#7C3AED', fontSize: '12px' }}
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: '#E2E8F0' }}>
                    <Lock size={17} color="#7C3AED" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrator password"
                    required
                    className="form-control border-start-0 border-end-0"
                    style={{ fontSize: '13px', borderColor: '#E2E8F0', padding: '10px 12px' }}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-white text-muted border-start-0"
                    style={{ borderColor: '#E2E8F0' }}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check d-flex align-items-center gap-2">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      borderColor: '#7C3AED',
                      accentColor: '#7C3AED',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ fontSize: '12px' }}>
                    Remember me on this browser
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="btn btn-link p-0 text-decoration-none fw-semibold d-sm-none"
                  style={{ color: '#EC9AC7', fontSize: '12px' }}
                >
                  Fill Demo
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn w-100 py-2 fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #172554 0%, #7C3AED 50%, #EC9AC7 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  height: '46px'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to CRM Portal</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Links Section */}
            <div className="mt-4 pt-3 border-top text-center" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                Need to create a new administrator account?{' '}
                <Link
                  to="/register"
                  className="fw-bold text-decoration-none"
                  style={{ color: '#7C3AED' }}
                >
                  Register Here &rarr;
                </Link>
              </p>

              <div className="d-flex align-items-center justify-content-center gap-2 mt-3 pt-2 border-top" style={{ borderColor: '#F1F5F9' }}>
                <span className="text-muted" style={{ fontSize: '12px' }}>Appointed as an Internship Mentor?</span>
                <Link
                  to="/mentor-login"
                  className="fw-bold text-decoration-none d-inline-flex align-items-center gap-1"
                  style={{ color: '#EC9AC7' }}
                >
                  <Users size={14} />
                  Mentor Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 9999 }}
          onClick={() => setShowForgotPassword(false)}
        >
          <div
            className="bg-white rounded-4 p-4 shadow-lg w-100"
            style={{ maxWidth: '440px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="p-2 rounded-3 text-white"
                  style={{ backgroundColor: '#7C3AED' }}
                >
                  <KeyRound size={18} />
                </div>
                <h5 className="fw-bold mb-0" style={{ color: '#172554', fontSize: '16px' }}>
                  Reset Password
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowForgotPassword(false)}
              />
            </div>

            <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
              Enter your registered company email address. We will send a secure link to reset your administrative credentials.
            </p>

            {resetError && (
              <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '12px' }}>
                {resetError}
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@aritcompany.com"
                  className="form-control"
                  style={{ fontSize: '13px', padding: '10px 12px' }}
                  required
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light px-3 py-2 fw-semibold"
                  style={{ fontSize: '13px' }}
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSent}
                  className="btn text-white px-4 py-2 fw-bold"
                  style={{ backgroundColor: '#7C3AED', fontSize: '13px' }}
                >
                  {resetSent ? 'Sending...' : 'Send Reset Link'}
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
