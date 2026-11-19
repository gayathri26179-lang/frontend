import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, DEMO_USERS } from '../context/AppContext';
import Logo from '../components/Logo';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('staff@interntrack.com');
  const [password, setPassword] = useState('staff123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('staff');

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const user = DEMO_USERS[roleKey];
    if (user) {
      setEmail(user.email);
      setPassword(`${roleKey}123`);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email address and password.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please select one of the demo roles.');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: 'radial-gradient(circle at 10% 20%, #eff6ff 0%, #f8fafc 50%, #e2e8f0 100%)'
      }}
    >
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="row g-0 rounded-4 overflow-hidden shadow-lg border bg-white">
          {/* Left Hero Branding Column */}
          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 text-white"
            style={{
              background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 60%, #1e3a8a 100%)'
            }}
          >
            <div>
              <Logo size="lg" light={true} />
              <div className="mt-5">
                <span className="badge bg-primary bg-opacity-25 text-info px-3 py-2 rounded-pill fw-semibold mb-3">
                  🚀 Enterprise Platform 2.0
                </span>
                <h2 className="display-6 fw-bold text-white lh-sm mb-3">
                  Work Smarter,<br />Track Better.
                </h2>
                <p className="text-light opacity-75" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                  The unified workspace for course completion, ticket resolution, task delegation, and daily cohort activity tracking.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="d-flex align-items-center gap-2 mb-2 text-info">
                <ShieldCheck size={18} />
                <span className="fw-semibold" style={{ fontSize: '13px' }}>Role-Based Access Protected</span>
              </div>
              <ul className="list-unstyled m-0 text-secondary" style={{ fontSize: '12px' }}>
                <li className="mb-1 d-flex align-items-center gap-2 text-light opacity-75">
                  <CheckCircle2 size={13} className="text-success" /> Admin: Full system governance &amp; logs
                </li>
                <li className="mb-1 d-flex align-items-center gap-2 text-light opacity-75">
                  <CheckCircle2 size={13} className="text-success" /> Manager: Team supervision &amp; approvals
                </li>
                <li className="d-flex align-items-center gap-2 text-light opacity-75">
                  <CheckCircle2 size={13} className="text-success" /> Staff: Personal tasks, activities &amp; courses
                </li>
              </ul>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-center">
            <div className="d-lg-none mb-4">
              <Logo size="md" light={false} />
            </div>

            <div className="mb-4">
              <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                Sign in to your InternTrack workspace or select a demo account
              </p>
            </div>

            {/* Quick Demo Role Switcher Tabs */}
            <div className="mb-4">
              <label className="form-label text-muted fw-semibold" style={{ fontSize: '12px', textTransform: 'uppercase' }}>
                Select Demo Role
              </label>
              <div className="btn-group w-100 p-1 bg-light rounded-3" role="group">
                <button
                  type="button"
                  className={`btn py-2 fw-semibold rounded-2 transition-all ${
                    selectedRole === 'admin' ? 'bg-primary text-white shadow-sm' : 'text-secondary'
                  }`}
                  style={{ fontSize: '13px' }}
                  onClick={() => handleRoleSelect('admin')}
                >
                  👔 Admin
                </button>
                <button
                  type="button"
                  className={`btn py-2 fw-semibold rounded-2 transition-all ${
                    selectedRole === 'manager' ? 'bg-primary text-white shadow-sm' : 'text-secondary'
                  }`}
                  style={{ fontSize: '13px' }}
                  onClick={() => handleRoleSelect('manager')}
                >
                  👩‍💼 Manager
                </button>
                <button
                  type="button"
                  className={`btn py-2 fw-semibold rounded-2 transition-all ${
                    selectedRole === 'staff' ? 'bg-primary text-white shadow-sm' : 'text-secondary'
                  }`}
                  style={{ fontSize: '13px' }}
                  onClick={() => handleRoleSelect('staff')}
                >
                  👩‍💻 Staff Member
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3 rounded-3 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                <span>✕</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>
                  Email or Username
                </label>
                <div className="position-relative">
                  <Mail
                    size={18}
                    className="position-absolute top-50 translate-middle-y text-secondary"
                    style={{ left: '14px' }}
                  />
                  <input
                    type="email"
                    className="form-control ps-5 py-2 rounded-3"
                    placeholder="name@interntrack.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-semibold text-dark mb-0" style={{ fontSize: '13px' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert(`Demo password for ${selectedRole}: ${selectedRole}123`)}
                    className="btn btn-link p-0 text-decoration-none text-primary"
                    style={{ fontSize: '12px' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="position-relative">
                  <Lock
                    size={18}
                    className="position-absolute top-50 translate-middle-y text-secondary"
                    style={{ left: '14px' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control ps-5 pe-5 py-2 rounded-3"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 translate-middle-y p-0 text-secondary"
                    style={{ right: '14px' }}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ fontSize: '13px' }}>
                    Remember me for 30 days
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-semibold shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #1e40af, #2563eb)',
                  fontSize: '15px'
                }}
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-4 pt-3 border-top text-center text-muted" style={{ fontSize: '12px' }}>
              InternTrack Systems © 2026. Certified Course &amp; Task Management.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
