import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import crmApiService from '../services/api';
import {
  UserCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  HelpCircle
} from 'lucide-react';

const MentorLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('rajesh.sharma@aritcompany.com');
  const [password, setPassword] = useState('mentor123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleMentors = [
    {
      name: 'Rajesh K. Sharma',
      email: 'rajesh.sharma@aritcompany.com',
      course: 'Full Stack Development',
      pass: 'mentor123'
    },
    {
      name: 'Pooja Sundaram',
      email: 'pooja.s@aritcompany.com',
      course: 'Frontend Development',
      pass: 'mentor123'
    },
    {
      name: 'Vikramaditya Verma',
      email: 'vikram.verma@aritcompany.com',
      course: 'Python Programming',
      pass: 'mentor123'
    },
    {
      name: 'Anjali Deshmukh',
      email: 'anjali.d@aritcompany.com',
      course: 'UI/UX Design',
      pass: 'mentor123'
    }
  ];

  const handleSelectMentor = (mentor) => {
    setEmail(mentor.email);
    setPassword(mentor.pass);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your assigned mentor email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your mentor portal password.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Backend Mentor Login API
      const res = await crmApiService.mentorLogin(email.trim(), password);

      if (res && res.success) {
        setIsLoading(false);
        const mentorData = res.data || {};
        const token = res.token || 'demo_jwt_mentor_ar_it_company_2026';

        localStorage.setItem('arit_admin_token', token);
        localStorage.setItem('arit_auth', JSON.stringify({
          authenticated: true,
          email: mentorData.email || email.trim().toLowerCase(),
          role: 'Technical Internship Mentor',
          name: mentorData.name || 'Mentor',
          userType: 'mentor',
          assignedCourse: mentorData.assignedCourse || 'Full Stack Development',
          avatar: mentorData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          loginTime: new Date().toISOString()
        }));

        if (rememberMe) {
          localStorage.setItem('arit_remember_mentor_email', email.trim().toLowerCase());
        }

        navigate('/dashboard');
        return;
      }

      if (res && res.success === false && !res.isNetworkError) {
        setIsLoading(false);
        setError(res.message || 'Invalid mentor credentials. Please verify your email and password.');
        return;
      }

      // 2. Local fallback if server unreachable
      const savedMentors = JSON.parse(localStorage.getItem('arit_mentors') || '[]');
      const allMentors = savedMentors.length > 0 ? savedMentors : sampleMentors;

      const found = allMentors.find(
        m => m.email?.toLowerCase() === email.trim().toLowerCase()
      ) || sampleMentors.find(
        m => m.email?.toLowerCase() === email.trim().toLowerCase()
      );

      setIsLoading(false);
      if (found || email.includes('@aritcompany.com') || email.includes('mentor')) {
        const mentorName = found ? found.name : 'Rajesh K. Sharma';
        const mentorCourse = found ? found.assignedCourse || found.course || 'Full Stack Development' : 'Full Stack Development';
        const mentorAvatar = found?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

        localStorage.setItem('arit_admin_token', 'demo_jwt_mentor_ar_it_company_2026');
        localStorage.setItem('arit_auth', JSON.stringify({
          authenticated: true,
          email: email.trim().toLowerCase(),
          role: 'Technical Internship Mentor',
          name: mentorName,
          userType: 'mentor',
          assignedCourse: mentorCourse,
          avatar: mentorAvatar,
          loginTime: new Date().toISOString()
        }));

        if (rememberMe) {
          localStorage.setItem('arit_remember_mentor_email', email.trim().toLowerCase());
        }

        navigate('/dashboard');
      } else {
        setError('Mentor credentials not recognized. Please use an authorized mentor email or pick a sample mentor below.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred during mentor login.');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4 position-relative"
      style={{
        background: 'linear-gradient(135deg, #0b1329 0%, #172554 45%, #3b0764 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Tech Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 154, 199, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Split Screen Container */}
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
          {/* Left Decorative Information Panel */}
          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative"
            style={{
              background: 'linear-gradient(160deg, #172554 0%, #4c1d95 60%, #7C3AED 100%)',
              borderRight: '1px solid rgba(236, 154, 199, 0.2)'
            }}
          >
            {/* Top Brand Logo */}
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
                  Mentor Workspace Access
                </span>
              </div>
            </div>

            {/* Middle Feature Highlights */}
            <div className="my-5 position-relative" style={{ zIndex: 2 }}>
              <h2 className="fw-bold mb-3" style={{ fontSize: '26px', lineHeight: '1.3' }}>
                Guide &amp; Evaluate Your Assigned Interns
              </h2>
              <p className="text-white text-opacity-80 mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Mentors access dedicated student tracking pipelines, daily activity submissions, feedback scoring, and progress milestones for assigned courses.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(236, 154, 199, 0.25)' }}
                  >
                    <BookOpen size={18} color="#EC9AC7" />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Course-Specific Cohort View</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Filter interns by your designated technical track</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <CheckCircle2 size={18} color="#FFFFFF" />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Daily Task Reviews</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Review code milestones, approve work &amp; give feedback</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick-Select Mentor Profiles */}
            <div
              className="p-3 rounded-3 position-relative"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                zIndex: 2
              }}
            >
              <div className="fw-bold mb-2 text-white" style={{ fontSize: '12px' }}>
                ⚡ Quick Demo Mentors (Click to Fill):
              </div>
              <div className="d-flex flex-wrap gap-2">
                {sampleMentors.map((m) => (
                  <button
                    key={m.email}
                    type="button"
                    onClick={() => handleSelectMentor(m)}
                    className="btn btn-sm py-1 px-2 rounded-pill text-start d-flex align-items-center gap-1"
                    style={{
                      backgroundColor: email === m.email ? '#EC9AC7' : 'rgba(255,255,255,0.18)',
                      color: email === m.email ? '#172554' : '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: 'none'
                    }}
                  >
                    <span>{m.name.split(' ')[0]}</span>
                    <span className="opacity-75" style={{ fontSize: '10px' }}>({m.course.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Mentor Login Form */}
          <div className="col-lg-7 p-4 p-md-5">
            <div className="d-lg-none mb-4">
              <Logo size="md" />
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="fw-bold mb-1" style={{ color: '#172554', fontSize: '24px' }}>
                  Mentor Portal Login
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                  Sign in with your appointed mentor credentials
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
                Mentor Tier
              </span>
            </div>

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
              {/* Mentor Email */}
              <div className="mb-3">
                <label className="form-label fw-bold" style={{ fontSize: '13px', color: '#172554' }}>
                  Assigned Mentor Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: '#E2E8F0' }}>
                    <Mail size={17} color="#7C3AED" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh.sharma@aritcompany.com"
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
                  <span className="text-muted" style={{ fontSize: '11px' }}>Demo: mentor123</span>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: '#E2E8F0' }}>
                    <Lock size={17} color="#7C3AED" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter mentor password"
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
                    id="rememberMentor"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      borderColor: '#7C3AED',
                      accentColor: '#7C3AED',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <label className="form-check-label text-muted" htmlFor="rememberMentor" style={{ fontSize: '12px' }}>
                    Keep me logged into Mentor Portal
                  </label>
                </div>
              </div>

              {/* Sign In Button */}
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
                    <span>Accessing Mentor Portal...</span>
                  </>
                ) : (
                  <>
                    <UserCheck size={18} />
                    <span>Sign In to Mentor Portal</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Mentors on Mobile */}
            <div className="d-lg-none mt-4 p-3 rounded-3" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div className="fw-bold mb-2 text-dark" style={{ fontSize: '12px' }}>⚡ Demo Mentors:</div>
              <div className="d-flex flex-wrap gap-2">
                {sampleMentors.map((m) => (
                  <button
                    key={m.email}
                    type="button"
                    onClick={() => handleSelectMentor(m)}
                    className="btn btn-sm btn-outline-primary py-1 px-2 rounded-pill"
                    style={{ fontSize: '11px' }}
                  >
                    {m.name.split(' ')[0]} ({m.course.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="mt-4 pt-3 border-top text-center" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                Need Administrator Privileges?{' '}
                <Link
                  to="/login"
                  className="fw-bold text-decoration-none"
                  style={{ color: '#172554' }}
                >
                  Admin Login &rarr;
                </Link>
              </p>

              <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                <span className="text-muted" style={{ fontSize: '12px' }}>New Administrator?</span>
                <Link
                  to="/register"
                  className="fw-bold text-decoration-none"
                  style={{ color: '#7C3AED' }}
                >
                  Create Admin Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorLogin;
