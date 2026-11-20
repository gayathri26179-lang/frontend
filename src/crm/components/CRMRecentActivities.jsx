import React from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Activity,
  UserPlus,
  FileCheck,
  Award,
  CreditCard,
  Clock,
  ArrowRight
} from 'lucide-react';

const CRMRecentActivities = ({ onViewAll }) => {
  const { activities } = useCRM();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return <UserPlus size={16} className="text-primary" />;
      case 'submission':
        return <FileCheck size={16} className="text-secondary" />;
      case 'certificate':
        return <Award size={16} className="text-success" />;
      case 'payment':
        return <CreditCard size={16} className="text-warning" />;
      default:
        return <Activity size={16} className="text-info" />;
    }
  };

  return (
    <div className="crm-card h-100 mb-0">
      <div className="crm-card-header">
        <div>
          <h2 className="crm-card-title">
            <Activity size={18} className="text-primary" />
            <span>Recent Activities</span>
          </h2>
          <div className="crm-card-subtitle">Live events and student milestone achievements</div>
        </div>
        {onViewAll && (
          <button
            type="button"
            className="btn btn-sm btn-link text-decoration-none p-0 d-flex align-items-center gap-1"
            style={{ fontSize: '12px', color: 'var(--crm-primary)' }}
            onClick={onViewAll}
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      <div className="crm-activity-list">
        {activities.slice(0, 5).map((act) => (
          <div key={act.id} className="crm-activity-item">
            <img
              src={act.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
              alt={act.title}
              className="crm-activity-avatar"
            />
            <div className="crm-activity-details">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="d-flex align-items-center gap-2">
                  <span className="p-1 rounded-2 bg-light d-flex align-items-center justify-content-center">
                    {getActivityIcon(act.type)}
                  </span>
                  <span className="crm-activity-title">{act.title}</span>
                </div>
                <span className="crm-activity-time d-flex align-items-center gap-1">
                  <Clock size={11} />
                  <span>{act.timestamp}</span>
                </span>
              </div>
              <p className="crm-activity-desc mb-0">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRMRecentActivities;
