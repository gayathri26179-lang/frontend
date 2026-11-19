import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  Activity,
  Ticket,
  BarChart3,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert
} from 'lucide-react';

const Home = () => {
  const { currentUser, tasks, courses, tickets, activities } = useApp();
  const navigate = useNavigate();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;

  const quickLinks = [
    { title: 'Main Dashboard', desc: 'KPI summaries, team velocity & live status', path: '/dashboard', icon: LayoutDashboard, color: '#2563eb' },
    { title: 'Tasks & Orders', desc: 'Manage assignments, deadlines & triage', path: '/tasks', icon: ClipboardList, color: '#059669' },
    { title: 'Courses Hub', desc: 'Enroll in full-stack & DevOps tracks', path: '/courses', icon: GraduationCap, color: '#7c3aed' },
    { title: 'Daily Activities', desc: 'Log work hours, checklist & achievements', path: '/activities', icon: Activity, color: '#d97706' },
    { title: 'Support Tickets', desc: 'Resolve technical blockers & queries', path: '/tickets', icon: Ticket, color: '#dc2626' },
    { title: 'Reports & Graphs', desc: 'Cohort audits, SLA rates & charts', path: '/reports', icon: BarChart3, color: '#0284c7' }
  ];

  return (
    <div className="container-fluid p-4">
      {/* Welcome Banner */}
      <div
        className="rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 60%, #2563eb 100%)'
        }}
      >
        <div className="position-relative" style={{ zIndex: 2, maxWidth: '750px' }}>
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white bg-opacity-20 text-white mb-3">
            <Sparkles size={16} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Work Smarter Together</span>
          </div>
          <h1 className="display-6 fw-bold mb-2">
            Welcome, {currentUser ? currentUser.name : 'Team Member'}!
          </h1>
          <p className="text-white opacity-75 mb-4" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            InternTrack is your central command for tracking tasks, advancing technical courses, logging daily internship achievements, and resolving team blocker tickets.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-light px-4 py-2 fw-bold text-primary rounded-3 shadow-sm d-flex align-items-center gap-2"
            >
              <span>Go to {currentUser?.role} Dashboard</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/tasks')}
              className="btn btn-outline-light px-4 py-2 fw-semibold rounded-3"
            >
              View Active Tasks ({inProgressTasks})
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Active Tasks</span>
              <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                <ClipboardList size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">{tasks.length} Total</h3>
            <div className="text-success fw-semibold" style={{ fontSize: '12px' }}>
              ✓ {completedTasks} Tasks Completed
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Courses Available</span>
              <div className="p-2 rounded-3 bg-info bg-opacity-10 text-info">
                <GraduationCap size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">{courses.length} Tracks</h3>
            <div className="text-primary fw-semibold" style={{ fontSize: '12px' }}>
              📚 {courses.filter(c => c.enrolled).length} Active Enrolled
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Open Blocker Tickets</span>
              <div className="p-2 rounded-3 bg-danger bg-opacity-10 text-danger">
                <Ticket size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1 text-danger">{openTickets} Open</h3>
            <div className="text-muted" style={{ fontSize: '12px' }}>
              {tickets.filter(t => t.status === 'Resolved').length} resolved this week
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Activity Submissions</span>
              <div className="p-2 rounded-3 bg-warning bg-opacity-10 text-warning">
                <Activity size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">{activities.length} Entries</h3>
            <div className="text-success fw-semibold" style={{ fontSize: '12px' }}>
              ⭐ 100% On-Time Logged
            </div>
          </div>
        </div>
      </div>

      {/* Modules Quick Access Grid */}
      <div className="mb-4">
        <h5 className="fw-bold text-dark mb-3">Quick Navigation Modules</h5>
        <div className="row g-3">
          {quickLinks.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.title} className="col-12 col-md-6 col-lg-4">
                <div
                  onClick={() => navigate(mod.path)}
                  className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white transition-all cursor-pointer hover-card"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center"
                      style={{ background: mod.color, width: '48px', height: '48px' }}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="fw-bold m-0 text-dark">{mod.title}</h6>
                        <ArrowRight size={16} className="text-muted" />
                      </div>
                      <p className="text-muted m-0" style={{ fontSize: '13px' }}>
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
