import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import CRMStudentGrowthChart from '../components/CRMStudentGrowthChart';
import CRMCourseDistributionChart from '../components/CRMCourseDistributionChart';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  FileText,
  CheckCircle,
  Users,
  Award
} from 'lucide-react';

const CRMReportsPage = () => {
  const { students, certificates, payments, courses, metrics } = useCRM();
  const [selectedReportType, setSelectedReportType] = useState('enrollment');

  const handleDownloadFullReport = () => {
    const reportData = `
INCREDIBLE AI SOLUTIONS - COMPREHENSIVE CRM AUDIT REPORT
Generated: ${new Date().toLocaleString()}
------------------------------------------------------------
KEY METRICS:
Total Enrolled Students: ${metrics.totalStudents}
Total Tasks Completed: ${metrics.tasksCompleted}
Certificates Issued: ${metrics.certificatesIssued}
Gross Revenue: $${metrics.totalRevenue}

COURSE DISTRIBUTION:
${courses.map(c => `- ${c.title}: ${c.enrolledStudents} students (${c.percentage}%)`).join('\n')}

RECENT CERTIFIED GRADUATES:
${certificates.map(c => `- ${c.studentName} | ${c.courseName} | ID: ${c.verificationCode} | ${c.grade}`).join('\n')}

RECENT PAYMENTS:
${payments.map(p => `- ${p.studentName} | $${p.amount} | ${p.method} | Inv: ${p.invoice}`).join('\n')}
------------------------------------------------------------
Official Record of Incredible AI Solutions CRM
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Incredible_AI_Audit_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Analytics, Insights & Exportable Reports
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Comprehensive performance audits across cohorts, courses, revenue streams, and completion velocity
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={handleDownloadFullReport}
        >
          <Download size={14} />
          <span>Download Executive Report</span>
        </button>
      </div>

      {/* Reports Filter Tabs */}
      <div className="d-flex gap-2 mb-4 overflow-auto pb-1">
        {[
          { id: 'enrollment', label: 'Enrollment Trends', icon: Users },
          { id: 'academics', label: 'Academic Completion', icon: Award },
          { id: 'revenue', label: 'Financial Velocity', icon: TrendingUp },
          { id: 'compliance', label: 'Credential Audit', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = selectedReportType === tab.id;
          return (
            <button
              key={tab.id}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-light'} d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-semibold`}
              style={{ fontSize: '12px' }}
              onClick={() => setSelectedReportType(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="crm-charts-grid mb-4">
        <div>
          <CRMStudentGrowthChart />
        </div>
        <div>
          <CRMCourseDistributionChart />
        </div>
      </div>

      {/* Performance Summary Table */}
      <div className="crm-card">
        <div className="crm-card-header">
          <h3 className="crm-card-title">
            <BarChart3 size={18} className="text-primary" />
            <span>Specialization Track Performance Matrix</span>
          </h3>
        </div>

        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Specialization Track</th>
                <th>Enrolled</th>
                <th>Completion Rate</th>
                <th>Avg. Grade</th>
                <th>Tuition Generated</th>
                <th>SLA Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="fw-bold text-dark">{c.title}</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>{c.code}</div>
                  </td>
                  <td>
                    <span className="fw-semibold text-dark">{c.enrolledStudents} Students</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold" style={{ fontSize: '12px' }}>{c.percentage + 55}%</span>
                      <div className="crm-progress-track" style={{ width: '80px' }}>
                        <div className="crm-progress-fill" style={{ width: `${c.percentage + 55}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-success bg-opacity-10 text-success fw-bold">
                      Distinction (4.9/5)
                    </span>
                  </td>
                  <td>
                    <span className="fw-bold text-dark">${(c.enrolledStudents * 1500 * 0.2).toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="text-muted" style={{ fontSize: '12px' }}>98.4% On-time</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRMReportsPage;
