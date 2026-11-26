import React from 'react';
import CRMPendingTasks from '../components/CRMPendingTasks';
import { FileCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMSubmissionsPage = () => {
  const { pendingTasks } = useCRM();

  const pendingCount = pendingTasks.filter(t => t.status !== 'Approved').length;
  const approvedCount = pendingTasks.filter(t => t.status === 'Approved').length;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Student Submissions & Code Reviews
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Review project deliverables, inspect GitHub repositories, check unit tests, and approve internship milestones
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-semibold">
            {pendingCount} Awaiting Review
          </span>
          <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold">
            {approvedCount} Approved
          </span>
        </div>
      </div>

      <CRMPendingTasks />
    </div>
  );
};

export default CRMSubmissionsPage;
