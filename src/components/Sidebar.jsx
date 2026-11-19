import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import {
  Home,
  LayoutDashboard,
  Users,
  GraduationCap,
  BookmarkCheck,
  Activity,
  ClipboardList,
  UserCheck,
  Ticket,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const { currentUser, logout, switchRole } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to end your session and log out?')) {
      logout();
      navigate('/login');
    }
  };

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Courses', path: '/courses', icon: GraduationCap },
    { name: 'My Courses', path: '/my-courses', icon: BookmarkCheck },
    { name: 'Activities', path: '/activities', icon: Activity },
    { name: 'Tasks & Orders', path: '/tasks', icon: ClipboardList },
    { name: 'Assignments', path: '/assignments', icon: UserCheck },
    { name: 'Tickets', path: '/tickets', icon: Ticket },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={closeMobileSidebar}
        />
      )}

      {/* Main Dark Navy Sidebar */}
      <aside
        className={`d-flex flex-column position-fixed top-0 start-0 h-100 text-white ${
          isMobileOpen ? 'd-flex' : 'd-none d-lg-flex'
        }`}
        style={{
          width: '260px',
          background: 'linear-gradient(180deg, #0b1329 0%, #0f172a 60%, #111e3b 100%)',
          zIndex: 1050,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Brand Header */}
        <div
          className="d-flex align-items-center px-4"
          style={{ height: '76px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <Logo size="md" light={true} />
        </div>

        {/* Quick Role Switcher (For Demo & Testing) */}
        <div className="px-3 pt-3 pb-2">
          <div
            className="p-2 rounded-3 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active View
              </span>
              <span
                className={`badge px-2 py-1 ${
                  currentUser?.role === 'Admin'
                    ? 'bg-danger bg-opacity-25 text-danger'
                    : currentUser?.role === 'Manager'
                    ? 'bg-warning bg-opacity-25 text-warning'
                    : 'bg-primary bg-opacity-25 text-primary'
                }`}
                style={{ fontSize: '10px' }}
              >
                {currentUser?.role || 'Guest'}
              </span>
            </div>
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn btn-xs py-1 text-white border-0 ${currentUser?.role === 'Admin' ? 'bg-primary' : 'bg-transparent text-secondary'}`}
                style={{ fontSize: '11px' }}
                onClick={() => switchRole('admin')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`btn btn-xs py-1 text-white border-0 ${currentUser?.role === 'Manager' ? 'bg-primary' : 'bg-transparent text-secondary'}`}
                style={{ fontSize: '11px' }}
                onClick={() => switchRole('manager')}
              >
                Manager
              </button>
              <button
                type="button"
                className={`btn btn-xs py-1 text-white border-0 ${currentUser?.role === 'Staff Member' ? 'bg-primary' : 'bg-transparent text-secondary'}`}
                style={{ fontSize: '11px' }}
                onClick={() => switchRole('staff')}
              >
                Staff
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu List */}
        <div className="flex-grow-1 overflow-y-auto px-3 py-2 custom-scrollbar">
          <ul className="nav flex-column gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center justify-content-between px-3 py-2 rounded-3 text-decoration-none transition-all ${
                        isActive
                          ? 'active-nav-link text-white shadow-sm'
                          : 'text-secondary hover-nav-link'
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? '#2563eb' : 'transparent',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      fontWeight: isActive ? '600' : '500',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    })}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <IconComponent size={18} strokeWidth={2} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-50" />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Footer Profile & Logout Button */}
        <div
          className="p-3"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          {currentUser && (
            <div className="d-flex align-items-center gap-3 mb-2 px-1">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="rounded-circle border border-2 border-primary"
                style={{ width: '38px', height: '38px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1 overflow-hidden">
                <div className="fw-semibold text-white text-truncate" style={{ fontSize: '13px' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }} className="text-truncate">
                  {currentUser.title || currentUser.role}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 border-0 py-2 rounded-3"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#f87171',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <LogOut size={16} />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
