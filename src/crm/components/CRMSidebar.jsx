import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  CheckSquare,
  CalendarCheck,
  TrendingUp,
  CreditCard,
  Award,
  UserCheck,
  MessageSquare,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout }) => {
  const { students, internships, dailyActivities, notifications, currentUser } = useCRM();

  const unreadNotifs = notifications.filter(n => n.unread).length;
  const pendingActivities = dailyActivities.filter(a => a.taskStatus === 'Pending Review').length;
  const newApplications = internships.filter(i => i.status === 'New Application').length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'students', label: 'Students', icon: Users, badge: students.length.toString() },
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: '7' },
    { id: 'internships', label: 'Internships', icon: Briefcase, badge: newApplications > 0 ? `${newApplications} New` : null, isPink: true },
    { id: 'daily-activities', label: 'Daily Activities', icon: CheckSquare, badge: pendingActivities > 0 ? `${pendingActivities}` : null, isPurple: true },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: null },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp, badge: null },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: null },
    { id: 'certificates', label: 'Certificates', icon: Award, badge: null },
    { id: 'mentors', label: 'Mentors', icon: UserCheck, badge: '5' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, badge: null },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs > 0 ? `${unreadNotifs}` : null, isPink: true },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 992) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="crm-sidebar-backdrop d-lg-none"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`crm-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header / Brand */}
        <div className="crm-sidebar-header">
          <div className="crm-brand">
            <div className="crm-brand-icon">
              <span>AR</span>
            </div>
            <div>
              <div className="crm-brand-title">AR IT COMPANY</div>
              <div className="crm-brand-subtitle">Internship CRM</div>
            </div>
          </div>
          <button
            className="d-lg-none btn btn-link text-white p-0"
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* 15 Sidebar Navigation Items */}
        <ul className="crm-sidebar-menu">
          <div className="crm-nav-section-label">Main Navigation</div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="crm-nav-item">
                <button
                  type="button"
                  className={`crm-nav-link border-0 bg-transparent ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelect(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`crm-nav-badge ${item.isPink ? 'pink' : item.isPurple ? 'purple' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}

          <div className="crm-nav-section-label mt-3">Account &amp; Session</div>

          <li className="crm-nav-item">
            <button
              type="button"
              className="crm-nav-link border-0 bg-transparent text-danger w-100"
              onClick={onLogout}
              style={{ color: '#f87171' }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* Sidebar Footer User Info */}
        <div className="crm-sidebar-footer">
          <div className="crm-sidebar-user">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="crm-sidebar-avatar"
            />
            <div className="overflow-hidden">
              <div className="fw-bold text-white text-truncate" style={{ fontSize: '13px' }}>
                {currentUser.name}
              </div>
              <div className="text-truncate" style={{ fontSize: '11px', color: 'var(--crm-pink)' }}>
                {currentUser.role}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CRMSidebar;
