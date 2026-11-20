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
  ExternalLink,
  Plus,
  Award,
  ChevronDown
} from 'lucide-react';

const CRMHeader = ({ activeTab, onToggleSidebar, onAddStudent, onGenerateCert, onReturnToMain, onLogout }) => {
  const { currentAdmin, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useCRM();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Title formatting
  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Incredible CRM Dashboard';
      case 'students': return 'Student & Intern Management';
      case 'courses': return 'Curriculum & Courses';
      case 'daily-tasks': return 'Daily Tasks & Assignments';
      case 'submissions': return 'Task Submissions & Reviews';
      case 'certificates': return 'Digital Certificate Registry';
      case 'attendance': return 'Daily Attendance Tracking';
      case 'progress': return 'Cohort Velocity & Progress';
      case 'payments': return 'Fee & Payment Management';
      case 'messages': return 'Communications & Chats';
      case 'reports': return 'Analytics & Reports';
      case 'settings': return 'CRM & Platform Settings';
      default: return 'CRM Overview';
    }
  };

  // Click outside to close dropdowns
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
            <span>Incredible AI Solutions</span>
            <span>/</span>
            <span style={{ color: 'var(--crm-primary)', fontWeight: '600' }}>
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
          placeholder="Search students, tasks, certificates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="crm-header-right">
        {/* Quick Add Student Button */}
        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm d-none d-sm-inline-flex"
          onClick={onAddStudent}
        >
          <Plus size={16} />
          <span>Add Student</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="position-relative" ref={notifRef}>
          <button
            type="button"
            className="crm-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="crm-notification-dot" />}
          </button>

          {showNotifications && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg border p-3"
              style={{
                width: '320px',
                zIndex: 1050,
                borderColor: 'var(--crm-lavender-border)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <span className="fw-bold" style={{ fontSize: '14px' }}>
                  Notifications ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="btn btn-link btn-sm text-decoration-none p-0"
                    style={{ fontSize: '11px', color: 'var(--crm-primary)' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationAsRead(notif.id)}
                    className="p-2 rounded-3 mb-1 cursor-pointer"
                    style={{
                      backgroundColor: notif.unread ? 'var(--crm-lavender-subtle)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-semibold" style={{ fontSize: '12px' }}>
                        {notif.title}
                      </span>
                      <span className="text-muted" style={{ fontSize: '10px' }}>
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-muted mb-0 mt-1" style={{ fontSize: '11px', lineHeight: '1.4' }}>
                      {notif.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Switch Portal Button */}
        <button
          type="button"
          onClick={onReturnToMain}
          className="btn btn-sm btn-outline-secondary d-none d-xl-inline-flex align-items-center gap-1 rounded-3 px-2 py-1"
          style={{ fontSize: '12px' }}
          title="Return to InternTrack Main App"
        >
          <ExternalLink size={13} />
          <span>InternTrack Portal</span>
        </button>

        {/* Profile Pill Dropdown */}
        <div className="position-relative" ref={profileRef}>
          <div
            className="crm-admin-pill"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src={currentAdmin.avatar}
              alt={currentAdmin.name}
              className="crm-admin-avatar"
            />
            <div className="crm-admin-info d-none d-md-flex">
              <span className="crm-admin-name">{currentAdmin.name}</span>
              <span className="crm-admin-role">Super Admin</span>
            </div>
            <ChevronDown size={14} className="text-muted ms-1" />
          </div>

          {showProfileMenu && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-2"
              style={{
                width: '210px',
                zIndex: 1050,
                borderColor: 'var(--crm-lavender-border)'
              }}
            >
              <div className="px-3 py-2 border-bottom mb-1">
                <div className="fw-bold" style={{ fontSize: '13px' }}>{currentAdmin.name}</div>
                <div className="text-muted" style={{ fontSize: '11px' }}>{currentAdmin.email}</div>
              </div>
              <button
                type="button"
                className="w-100 btn btn-light btn-sm text-start d-flex align-items-center gap-2 mb-1"
                onClick={() => { setShowProfileMenu(false); onReturnToMain(); }}
              >
                <User size={14} />
                <span>Switch Portal</span>
              </button>
              <button
                type="button"
                className="w-100 btn btn-light btn-sm text-start d-flex align-items-center gap-2 mb-1"
                onClick={() => { setShowProfileMenu(false); onGenerateCert(); }}
              >
                <Award size={14} />
                <span>Certificate Studio</span>
              </button>
              <button
                type="button"
                className="w-100 btn btn-outline-danger btn-sm text-start d-flex align-items-center gap-2 mt-2"
                onClick={() => { setShowProfileMenu(false); onLogout(); }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CRMHeader;
