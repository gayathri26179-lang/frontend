import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import crmApiService from '../services/api';
import {
  User,
  Mail,
  Phone,
  Building,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Briefcase
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: 'AR IT COMPANY',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Feedback
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid corporate email address.';
    }

    const phoneRegex = /^[0-9+\s\-()]{7,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (digits only).';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the Terms & Conditions to register.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. Call Backend Registration API
      const res = await crmApiService.adminRegister({
        fullName: formData.fullName.trim(),
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        companyName: formData.companyName.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (res && res.success) {
        setIsLoading(false);
        setSuccessMessage('Administrator account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login', {
            state: {
              registeredEmail: formData.email.trim().toLowerCase(),
              justRegistered: true
            }
          });
        }, 1200);
        return;
      }

      if (res && res.success === false && !res.isNetworkError) {
        setIsLoading(false);
        setServerError(res.message || 'Registration failed. Please check your details.');
        return;
      }

      // 2. Local fallback if server unreachable
      const existingAdmins = JSON.parse(localStorage.getItem('arit_registered_admins') || '[]');
      const defaultEmail = 'admin@aritcompany.com';

      const isDuplicate = existingAdmins.some(
        admin => admin.email.toLowerCase() === formData.email.trim().toLowerCase()
      ) || formData.email.trim().toLowerCase() === defaultEmail.toLowerCase();

      if (isDuplicate) {
        setIsLoading(false);
        setServerError('This email address is already registered. Please login or use a different email.');
        return;
      }

      const newAdmin = {
        id: `ADM-${Date.now().toString().slice(-4)}`,
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        companyName: formData.companyName.trim(),
        password: formData.password,
        role: 'Administrator',
        registeredAt: new Date().toISOString()
      };

      existingAdmins.push(newAdmin);
      localStorage.setItem('arit_registered_admins', JSON.stringify(existingAdmins));

      setIsLoading(false);
      setSuccessMessage('Administrator account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', {
          state: {
            registeredEmail: formData.email.trim().toLowerCase(),
            justRegistered: true
          }
        });
      }, 1200);
    } catch (err) {
      setIsLoading(false);
      setServerError('An unexpected error occurred during registration.');
    }
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
          maxWidth: '1080px',
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
                  Official Administrator Portal
                </span>
              </div>
            </div>

            {/* Middle Feature Highlights */}
            <div className="my-5 position-relative" style={{ zIndex: 2 }}>
              <h2 className="fw-bold mb-3" style={{ fontSize: '26px', lineHeight: '1.3' }}>
                Join the AR IT COMPANY CRM Platform
              </h2>
              <p className="text-white text-opacity-80 mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Create your administrative profile to manage university cohorts, assign mentors, audit daily activities, and issue verified digital certificates.
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
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Seamless Internship Sync</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Direct integration with candidate registrations</div>
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
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Role-Based Access Control</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Separate Admin and Mentor privilege tiers</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(236, 154, 199, 0.2)' }}
                  >
                    <Briefcase size={18} color="#EC9AC7" />
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>Automated Certificate Generation</div>
                    <div className="text-white text-opacity-70" style={{ fontSize: '11px' }}>Pink, Navy &amp; Violet verified templates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-3 border-top border-white border-opacity-10 position-relative" style={{ zIndex: 2 }}>
              <div className="text-white text-opacity-70" style={{ fontSize: '12px' }}>
                AR IT COMPANY &copy; {new Date().getFullYear()} &bull; All Rights Reserved.
              </div>
            </div>
          </div>

          {/* Right Registration Form */}
          <div className="col-lg-7 p-4 p-md-5">
            <div className="d-lg-none mb-4">
              <Logo size="md" />
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="fw-bold mb-1" style={{ color: '#172554', fontSize: '24px' }}>
                  Admin Registration
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                  Register a new administrator account for AR IT COMPANY CRM
                </p>
              </div>
              <span
                className="badge px-3 py-2 rounded-pill fw-bold d-none d-sm-inline-block"
                style={{
                  backgroundColor: '#F3E8FF',
                  color: '#7C3AED',
                  border: '1px solid #DDD6FE',
                  fontSize: '11px'
                }}
              >
                Admin Tier
              </span>
            </div>

            {/* Success Message Banner */}
            {successMessage && (
              <div
                className="alert alert-success d-flex align-items-center gap-3 rounded-3 p-3 mb-4 shadow-sm"
                style={{ backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', color: '#065F46' }}
              >
                <CheckCircle2 size={20} className="flex-shrink-0" />
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{successMessage}</div>
              </div>
            )}

            {/* Error Message Banner */}
            {serverError && (
              <div
                className="alert alert-danger d-flex align-items-center gap-3 rounded-3 p-3 mb-4 shadow-sm"
                style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA', color: '#991B1B' }}
              >
                <AlertCircle size={20} className="flex-shrink-0" />
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{serverError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Full Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: errors.fullName ? '#ef4444' : '#E2E8F0' }}>
                      <User size={16} color="#7C3AED" />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Maya Raman"
                      className={`form-control border-start-0 ${errors.fullName ? 'is-invalid' : ''}`}
                      style={{ fontSize: '13px', borderColor: errors.fullName ? '#ef4444' : '#E2E8F0', padding: '10px 12px' }}
                    />
                  </div>
                  {errors.fullName && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.fullName}</div>}
                </div>

                {/* Email Address */}
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                    Corporate Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: errors.email ? '#ef4444' : '#E2E8F0' }}>
                      <Mail size={16} color="#7C3AED" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@aritcompany.com"
                      className={`form-control border-start-0 ${errors.email ? 'is-invalid' : ''}`}
                      style={{ fontSize: '13px', borderColor: errors.email ? '#ef4444' : '#E2E8F0', padding: '10px 12px' }}
                    />
                  </div>
                  {errors.email && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.email}</div>}
                </div>

                {/* Phone Number */}
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: errors.phone ? '#ef4444' : '#E2E8F0' }}>
                      <Phone size={16} color="#7C3AED" />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`form-control border-start-0 ${errors.phone ? 'is-invalid' : ''}`}
                      style={{ fontSize: '13px', borderColor: errors.phone ? '#ef4444' : '#E2E8F0', padding: '10px 12px' }}
                    />
                  </div>
                  {errors.phone && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.phone}</div>}
                </div>

                {/* Company Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                    Company Name <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: errors.companyName ? '#ef4444' : '#E2E8F0' }}>
                      <Building size={16} color="#7C3AED" />
                    </span>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="AR IT COMPANY"
                      className={`form-control border-start-0 ${errors.companyName ? 'is-invalid' : ''}`}
                      style={{ fontSize: '13px', borderColor: errors.companyName ? '#ef4444' : '#E2E8F0', padding: '10px 12px' }}
                    />
                  </div>
                  {errors.companyName && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.companyName}</div>}
                </div>

                {/* Password */}
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: errors.password ? '#ef4444' : '#E2E8F0' }}>
                      <Lock size={16} color="#7C3AED" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      className={`form-control border-start-0 border-end-0 ${errors.password ? 'is-invalid' : ''}`}
                      style={{ fontSize: '13px', borderColor: errors.password ? '#ef4444' : '#E2E8F0', padding: '10px 12px' }}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-white text-muted border-start-0"
                      style={{ borderColor: errors.password ? '#ef4444' : '#E2E8F0' }}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ fontSize: '12px', color: '#172554' }}>
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderColor: errors.confirmPassword ? '#ef4444' : '#E2E8F0' }}>
                      <Lock size={16} color="#7C3AED" />
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-type password"
                      className={`form-control border-start-0 border-end-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      style={{ fontSize: '13px', borderColor: errors.confirmPassword ? '#ef4444' : '#E2E8F0', padding: '10px 12px' }}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-white text-muted border-start-0"
                      style={{ borderColor: errors.confirmPassword ? '#ef4444' : '#E2E8F0' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.confirmPassword}</div>}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="col-12 mt-3">
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      style={{
                        borderColor: errors.agreeTerms ? '#ef4444' : '#7C3AED',
                        accentColor: '#7C3AED',
                        width: '18px',
                        height: '18px'
                      }}
                    />
                    <label className="form-check-label text-muted" htmlFor="agreeTerms" style={{ fontSize: '12px' }}>
                      I agree to the AR IT COMPANY{' '}
                      <button
                        type="button"
                        className="btn btn-link p-0 fw-semibold text-decoration-none"
                        style={{ color: '#7C3AED', fontSize: '12px' }}
                        onClick={() => setShowTermsModal(true)}
                      >
                        Terms and Conditions &amp; Privacy Policy
                      </button>
                    </label>
                  </div>
                  {errors.agreeTerms && <div className="text-danger mt-1" style={{ fontSize: '11px' }}>{errors.agreeTerms}</div>}
                </div>

                {/* Submit Button */}
                <div className="col-12 mt-4">
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
                        <span>Creating Administrator Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Administrator Account</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Links Section */}
            <div className="mt-4 pt-3 border-top text-center" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                Already have an administrator account?{' '}
                <Link
                  to="/login"
                  className="fw-bold text-decoration-none"
                  style={{ color: '#7C3AED' }}
                >
                  Sign In Here &rarr;
                </Link>
              </p>

              <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                <span className="text-muted" style={{ fontSize: '12px' }}>Are you an appointed mentor?</span>
                <Link
                  to="/mentor-login"
                  className="fw-bold text-decoration-none"
                  style={{ color: '#EC9AC7' }}
                >
                  Mentor Login Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 9999 }}
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white rounded-4 p-4 shadow-lg w-100 position-relative"
            style={{ maxWidth: '540px', maxHeight: '85vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <h5 className="fw-bold mb-0" style={{ color: '#172554' }}>AR IT COMPANY – Terms of Service</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowTermsModal(false)}
              />
            </div>
            <div className="text-muted" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              <p><strong>1. Administrative Confidentiality:</strong> As a verified AR IT COMPANY Administrator, you agree to safeguard intern records, assessment scores, and payment audit logs.</p>
              <p><strong>2. Data Integrity:</strong> Certificate generation is only authorized for students who have satisfied attendance and activity completion thresholds.</p>
              <p><strong>3. Security:</strong> Passwords and API tokens must remain strictly confidential and never shared with unauthorized individuals.</p>
              <p><strong>4. Role Boundaries:</strong> Administrative rights allow managing mentors, approving student enrollments, and exporting official performance audits.</p>
            </div>
            <div className="text-end pt-3 border-top mt-3">
              <button
                type="button"
                className="btn text-white px-4 py-2 rounded-3 fw-bold"
                style={{ backgroundColor: '#7C3AED' }}
                onClick={() => {
                  setFormData(prev => ({ ...prev, agreeTerms: true }));
                  setShowTermsModal(false);
                }}
              >
                Accept &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
