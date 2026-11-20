import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CheckSquare,
  FileCheck,
  Award,
  CalendarCheck,
  TrendingUp,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  ArrowLeft,
  X
} from 'lucide-react';

const CRMSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout, onReturnToMain }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'students', label: 'Students', icon: Users, badge: '1,248' },
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: '4' },
    { id: 'daily-tasks', label: 'Daily Tasks', icon: CheckSquare, badge: '18' },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, badge: '5 New', isNew: true },
    { id: 'certificates', label: 'Certificates', icon: Award, badge: '642' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: '96%' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, badge: null },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: null },
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
              <Sparkles size={22} />
            </div>
            <div>
              <div className="crm-brand-title">Incredible AI</div>
              <div className="crm-brand-subtitle">Solutions CRM</div>
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

        {/* Navigation Menu */}
        <ul className="crm-sidebar-menu">
          <div className="crm-nav-section-label">Main Navigation</div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="crm-nav-item">
                <button
                  type="button"
                  className={`crm-nav-link w-100 text-start border-0 bg-transparent ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelect(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`crm-nav-badge ${item.isNew ? 'primary' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}

          <div className="crm-nav-section-label mt-3">Account & Session</div>
          <li className="crm-nav-item">
            <button
              type="button"
              className="crm-nav-link w-100 text-start border-0 bg-transparent text-danger-emphasis"
              onClick={onLogout}
            >
              <LogOut size={18} className="text-danger" />
              <span className="text-danger">Logout</span>
            </button>
          </li>
        </ul>

        {/* Footer Link to InternTrack Company Portal */}
        <div className="crm-sidebar-footer">
          <button
            type="button"
            onClick={onReturnToMain}
            className="btn btn-sm w-100 d-flex align-items-center justify-content-center gap-2 text-white border-0 py-2 rounded-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: '12px',
              backdropFilter: 'blur(5px)'
            }}
          >
            <ArrowLeft size={14} />
            <span>Company Management Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default CRMSidebar;
