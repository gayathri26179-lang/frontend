import React, { useState, useRef, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Menu,
  Search,
  Bell,
  Check,
  User,
  Settings,
  LogOut,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const CRMHeader = ({ activeTab, setActiveTab, onToggleSidebar, onAddStudent, onLogout }) => {
  const {
    currentUser,
    activeRole,
    setActiveRole,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    syncInternshipWebsiteRegistrations,
    isSyncing
  } = useCRM();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Executive CRM Dashboard';
      case 'students': return 'Student & Intern Management';
      case 'courses': return 'Curriculum & Courses Management';
      case 'internships': return 'Internship Applications & Status';
      case 'daily-activities': return 'Daily Internship Activities & Feedback';
      case 'attendance': return 'Student Attendance Tracking';
      case 'progress': return 'Cohort Progress & Velocity';
      case 'payments': return 'Student Fee & Payment Records';
      case 'certificates': return 'Digital Certificate Registry';
      case 'mentors': return 'Mentor & Faculty Supervision';
      case 'communication': return 'Student & Cohort Announcements';
      case 'reports': return 'Analytics & Compliance Reports';
      case 'notifications': return 'System Notifications Center';
      case 'settings': return 'CRM & Company Settings';
      default: return 'AR IT COMPANY CRM';
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="crm-header">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="crm-header-left">
        <button
          className="d-lg-none btn btn-light p-2 rounded-3 me-2"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="crm-page-title-box">
          <h1>{getTabTitle(activeTab)}</h1>
          <div className="crm-breadcrumb">
            <span>AR IT COMPANY</span>
            <span>/</span>
            <span className="crm-breadcrumb-current">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="crm-search-wrapper d-none d-md-block">
        <Search size={16} className="crm-search-icon" />
        <input
          type="text"
          className="crm-search-input"
          placeholder="Search students, courses, IDs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right: Actions, Sync, Notifications & Profile */}
      <div className="crm-header-right">
        {/* Shared Website Integration Simulation Sync Button */}
        <button
          type="button"
          className="crm-btn crm-btn-outline crm-btn-sm d-none d-sm-inline-flex"
          onClick={syncInternshipWebsiteRegistrations}
          disabled={isSyncing}
          title="Simulate pulling new student registrations submitted from the AR IT COMPANY Internship Website"
          style={{ borderColor: 'var(--crm-purple-border)', color: 'var(--crm-purple)' }}
        >
          <RefreshCw size={14} className={isSyncing ? 'spin-animation' : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Website Registrations'}</span>
        </button>

        {/* Quick Add Student Button */}
        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={onAddStudent}
        >
          <Plus size={15} />
          <span className="d-none d-sm-inline">Add Student</span>
        </button>

        {/* Role Toggle Pill (Admin / Mentor) */}
        <div
          className="d-none d-xl-flex align-items-center bg-light rounded-pill p-1 border"
          style={{ fontSize: '11.5px', fontWeight: 600 }}
        >
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-2.5 py-0.5 border-0 ${activeRole === 'Admin' ? 'text-white' : 'text-muted'}`}
            style={{
              backgroundColor: activeRole === 'Admin' ? 'var(--crm-navy)' : 'transparent',
              fontSize: '11.5px'
            }}
            onClick={() => setActiveRole('Admin')}
          >
            Admin View
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-2.5 py-0.5 border-0 ${activeRole === 'Mentor' ? 'text-white' : 'text-muted'}`}
            style={{
              backgroundColor: activeRole === 'Mentor' ? 'var(--crm-purple)' : 'transparent',
              fontSize: '11.5px'
            }}
            onClick={() => setActiveRole('Mentor')}
          >
            Mentor View
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="position-relative" ref={notifRef}>
          <button
            type="button"
            className="crm-btn crm-btn-outline crm-btn-icon position-relative"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View Notifications"
          >
            <Bell size={18} color="var(--crm-navy)" />
            {unreadCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ backgroundColor: 'var(--crm-pink)', color: 'var(--crm-navy)', fontSize: '10px' }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-0 overflow-hidden"
              style={{ width: '340px', zIndex: 1050 }}
            >
              <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14px' }}>Notifications</h6>
                  <span className="text-muted" style={{ fontSize: '11.5px' }}>{unreadCount} unread alerts</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    className="btn btn-link btn-sm p-0 text-decoration-none"
                    style={{ fontSize: '12px', color: 'var(--crm-purple)' }}
                    onClick={markAllNotificationsAsRead}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted" style={{ fontSize: '13px' }}>
                    No notifications yet.
                  </div>
                ) : (
                  notifications.slice(0, 5).map(n => (
                    <div
                      key={n.id}
                      className={`p-3 border-bottom d-flex align-items-start gap-2 ${n.unread ? 'bg-light bg-opacity-50' : ''}`}
                      style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.link) {
                          const tab = n.link.replace('/', '');
                          if (tab) setActiveTab(tab);
                        }
                        setShowNotifications(false);
                      }}
                    >
                      <div
                        className="rounded-circle p-1.5 mt-0.5 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: n.unread ? 'var(--crm-purple-soft)' : '#f1f5f9',
                          color: n.unread ? 'var(--crm-purple)' : '#64748b'
                        }}
                      >
                        <Bell size={13} />
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong className="text-dark d-block text-truncate" style={{ fontSize: '12.5px' }}>
                            {n.title}
                          </strong>
                          <span className="text-muted" style={{ fontSize: '10.5px' }}>{n.timestamp}</span>
                        </div>
                        <p className="text-secondary mb-0 text-truncate" style={{ fontSize: '12px' }}>
                          {n.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 text-center bg-light border-top">
                <button
                  type="button"
                  className="btn btn-link btn-sm text-decoration-none fw-semibold p-0"
                  style={{ color: 'var(--crm-purple)', fontSize: '12px' }}
                  onClick={() => {
                    setActiveTab('notifications');
                    setShowNotifications(false);
                  }}
                >
                  View All Notifications &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="position-relative" ref={profileRef}>
          <button
            type="button"
            className="d-flex align-items-center gap-2 p-1 pe-2 bg-light border rounded-pill"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="rounded-circle"
              style={{ width: '32px', height: '32px', objectFit: 'cover' }}
            />
            <div className="d-none d-md-block text-start lh-1">
              <span className="d-block fw-bold text-dark" style={{ fontSize: '12.5px' }}>
                {currentUser.name}
              </span>
              <span className="text-muted" style={{ fontSize: '10px' }}>
                {activeRole}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-2"
              style={{ width: '220px', zIndex: 1050 }}
            >
              <div className="p-2 border-bottom mb-1">
                <strong className="d-block text-dark" style={{ fontSize: '13px' }}>{currentUser.name}</strong>
                <span className="text-muted d-block" style={{ fontSize: '11px' }}>{currentUser.email}</span>
                <span className="badge mt-1" style={{ backgroundColor: 'var(--crm-purple)', fontSize: '10px' }}>
                  {currentUser.role}
                </span>
              </div>
              <button
                className="dropdown-item d-flex align-items-center gap-2 p-2 rounded text-secondary"
                style={{ fontSize: '13px', border: 'none', background: 'transparent', width: '100%', textAlign: 'left' }}
                onClick={() => {
                  setActiveTab('settings');
                  setShowProfileMenu(false);
                }}
              >
                <Settings size={15} />
                <span>Account Settings</span>
              </button>
              <div className="dropdown-divider my-1" />
              <button
                className="dropdown-item d-flex align-items-center gap-2 p-2 rounded text-danger"
                style={{ fontSize: '13px', border: 'none', background: 'transparent', width: '100%', textAlign: 'left' }}
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CRMHeader;
