import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  LogOut,
  User as UserIcon,
  Shield,
  ChevronDown
} from 'lucide-react';

const Header = ({ toggleMobileSidebar }) => {
  const { currentUser, logout, switchRole, tasks } = useApp();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'New Task Assigned', desc: 'Implement OAuth 2.0 Auth Flow', time: '10m ago', icon: Clock, type: 'info' },
    { id: 2, title: 'Ticket Resolved', desc: 'TCK-301 database pool connection closed', time: '1h ago', icon: CheckCircle2, type: 'success' },
    { id: 3, title: 'Weekly Report Due', desc: 'Cohort audit submission deadline tomorrow', time: '3h ago', icon: AlertCircle, type: 'warning' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tasks?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className="sticky-top bg-white border-bottom d-flex align-items-center justify-content-between px-3 px-lg-4"
      style={{ height: '76px', zIndex: 1020, borderColor: '#e2e8f0' }}
    >
      {/* Left: Mobile Toggle & Search */}
      <div className="d-flex align-items-center gap-3 flex-grow-1" style={{ maxWidth: '480px' }}>
        <button
          className="btn btn-light d-lg-none p-2 rounded-2"
          onClick={toggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} className="text-dark" />
        </button>

        <form onSubmit={handleSearchSubmit} className="position-relative w-100 d-none d-sm-block">
          <Search
            size={18}
            className="position-absolute top-50 translate-middle-y text-secondary"
            style={{ left: '14px' }}
          />
          <input
            type="text"
            className="form-control rounded-pill ps-5 bg-light border-0 py-2"
            style={{ fontSize: '14px', background: '#f8fafc' }}
            placeholder="Search tasks, courses, tickets, members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="d-flex align-items-center gap-2 gap-md-3">
        {/* Role Pill */}
        <div className="d-none d-md-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light border">
          <Shield size={14} className="text-primary" />
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>
            {currentUser?.role || 'Guest'} Mode
          </span>
        </div>

        {/* Notifications Popover */}
        <div className="position-relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="btn btn-light rounded-circle position-relative p-2"
            style={{ width: '42px', height: '42px', background: '#f8fafc' }}
          >
            <Bell size={20} className="text-secondary" />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
              style={{ fontSize: '10px' }}
            >
              3
            </span>
          </button>

          {showNotifications && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-0"
              style={{ width: '320px', zIndex: 1060 }}
            >
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="m-0 fw-bold">Recent Updates &amp; Alerts</h6>
                <span className="badge bg-primary bg-opacity-10 text-primary">3 New</span>
              </div>
              <div className="list-group list-group-flush" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="list-group-item list-group-item-action p-3">
                      <div className="d-flex align-items-start gap-2">
                        <Icon size={16} className={`mt-1 text-${n.type}`} />
                        <div className="flex-grow-1">
                          <div className="fw-semibold" style={{ fontSize: '13px' }}>{n.title}</div>
                          <div className="text-muted" style={{ fontSize: '12px' }}>{n.desc}</div>
                          <small className="text-secondary" style={{ fontSize: '10px' }}>{n.time}</small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-2 text-center border-top bg-light rounded-bottom-3">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/tickets');
                  }}
                  className="btn btn-link btn-sm text-decoration-none text-primary p-0 fw-semibold"
                  style={{ fontSize: '12px' }}
                >
                  View All Support Tickets →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="position-relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="btn btn-light d-flex align-items-center gap-2 p-1 pe-2 rounded-pill bg-light border-0"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'}
              alt={currentUser?.name}
              className="rounded-circle"
              style={{ width: '34px', height: '34px', objectFit: 'cover' }}
            />
            <span className="d-none d-sm-inline fw-semibold text-dark" style={{ fontSize: '13px' }}>
              {currentUser?.name ? currentUser.name.split(' ')[0] : 'User'}
            </span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {showProfileMenu && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-2"
              style={{ width: '240px', zIndex: 1060 }}
            >
              <div className="p-2 border-bottom">
                <div className="fw-bold text-dark">{currentUser?.name}</div>
                <div className="text-muted text-truncate" style={{ fontSize: '12px' }}>{currentUser?.email}</div>
                <span className="badge bg-primary bg-opacity-10 text-primary mt-1" style={{ fontSize: '10px' }}>
                  {currentUser?.role}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setShowProfileMenu(false); navigate('/profile'); }}
                  className="dropdown-item d-flex align-items-center gap-2 py-2 rounded-2"
                  style={{ fontSize: '13px' }}
                >
                  <UserIcon size={16} /> My Profile
                </button>

                <div className="dropdown-divider my-1"></div>
                <div className="px-2 py-1 text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Switch Demo Account
                </div>
                <button
                  onClick={() => { switchRole('admin'); setShowProfileMenu(false); }}
                  className={`dropdown-item py-1 rounded-2 ${currentUser?.role === 'Admin' ? 'fw-bold text-primary' : ''}`}
                  style={{ fontSize: '12px' }}
                >
                  👔 Admin (Alexander Hayes)
                </button>
                <button
                  onClick={() => { switchRole('manager'); setShowProfileMenu(false); }}
                  className={`dropdown-item py-1 rounded-2 ${currentUser?.role === 'Manager' ? 'fw-bold text-primary' : ''}`}
                  style={{ fontSize: '12px' }}
                >
                  👩‍💼 Manager (Elena Vance)
                </button>
                <button
                  onClick={() => { switchRole('staff'); setShowProfileMenu(false); }}
                  className={`dropdown-item py-1 rounded-2 ${currentUser?.role === 'Staff Member' ? 'fw-bold text-primary' : ''}`}
                  style={{ fontSize: '12px' }}
                >
                  👩‍💻 Staff (Sarah Jenkins)
                </button>

                <div className="dropdown-divider my-1"></div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger rounded-2"
                  style={{ fontSize: '13px' }}
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
