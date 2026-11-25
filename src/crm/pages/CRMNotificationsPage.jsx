import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Bell,
  CheckCircle,
  Clock,
  UserPlus,
  Briefcase,
  CreditCard,
  Award,
  CheckCheck,
  Trash2,
  CalendarCheck
} from 'lucide-react';

const CRMNotificationsPage = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useCRM();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'registration':
        return <UserPlus size={18} style={{ color: 'var(--crm-purple)' }} />;
      case 'activity':
        return <CheckCircle size={18} className="text-primary" />;
      case 'payment':
        return <CreditCard size={18} className="text-success" />;
      case 'internship':
        return <Briefcase size={18} style={{ color: 'var(--crm-navy)' }} />;
      case 'certificate':
        return <Award size={18} style={{ color: 'var(--crm-pink)' }} />;
      default:
        return <Bell size={18} className="text-secondary" />;
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Notifications Center
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Real-time automated alerts for registrations, payments, daily logs, and internship completions
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-outline crm-btn-sm"
          onClick={markAllNotificationsAsRead}
        >
          <CheckCheck size={14} />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="btn-group bg-light p-1 rounded-3 border">
            <button
              type="button"
              className={`btn btn-sm py-1 px-3 ${filter === 'all' ? 'btn-primary text-white' : 'btn-light'}`}
              style={{
                backgroundColor: filter === 'all' ? 'var(--crm-purple)' : 'transparent',
                border: 'none',
                fontSize: '12.5px'
              }}
              onClick={() => setFilter('all')}
            >
              All Alerts ({notifications.length})
            </button>
            <button
              type="button"
              className={`btn btn-sm py-1 px-3 ${filter === 'unread' ? 'btn-primary text-white' : 'btn-light'}`}
              style={{
                backgroundColor: filter === 'unread' ? 'var(--crm-purple)' : 'transparent',
                border: 'none',
                fontSize: '12.5px'
              }}
              onClick={() => setFilter('unread')}
            >
              Unread ({notifications.filter(n => n.unread).length})
            </button>
          </div>

          <span className="text-muted" style={{ fontSize: '12px' }}>
            Auto-dispatched from AR IT CRM Service
          </span>
        </div>

        {/* Notifications List */}
        <div className="p-4">
          <div className="d-flex flex-column gap-2.5">
            {filteredNotifs.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <Bell size={36} className="mb-2 text-secondary opacity-50" />
                <h6 className="fw-semibold">No notifications under this filter.</h6>
                <p className="mb-0" style={{ fontSize: '12.5px' }}>
                  All system alerts are up to date.
                </p>
              </div>
            ) : (
              filteredNotifs.map(n => (
                <div
                  key={n.id}
                  className={`p-3 rounded-3 border d-flex align-items-start gap-3 transition-all ${n.unread ? 'bg-light' : 'bg-white'}`}
                  style={{
                    borderColor: n.unread ? 'var(--crm-purple-border)' : 'var(--crm-border)',
                    boxShadow: n.unread ? '0 2px 8px rgba(112, 69, 181, 0.08)' : 'none'
                  }}
                >
                  <div
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      backgroundColor: n.unread ? 'var(--crm-purple-soft)' : '#f1f5f9'
                    }}
                  >
                    {getNotifIcon(n.type)}
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <strong className="text-dark" style={{ fontSize: '13.5px' }}>
                          {n.title}
                        </strong>
                        {n.unread && (
                          <span
                            className="badge rounded-pill"
                            style={{ backgroundColor: 'var(--crm-pink)', color: 'var(--crm-navy)', fontSize: '10px' }}
                          >
                            New
                          </span>
                        )}
                      </div>

                      <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                        <Clock size={11} />
                        {n.timestamp}
                      </span>
                    </div>

                    <p className="text-secondary mb-0" style={{ fontSize: '12.5px', lineHeight: '1.5' }}>
                      {n.message}
                    </p>
                  </div>

                  {n.unread && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-decoration-none p-1 text-muted flex-shrink-0"
                      title="Mark as read"
                      onClick={() => markNotificationAsRead(n.id)}
                    >
                      <CheckCircle size={15} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMNotificationsPage;
