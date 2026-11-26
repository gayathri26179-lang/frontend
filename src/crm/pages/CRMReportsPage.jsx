import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  FileSpreadsheet,
  TrendingUp,
  Award,
  CreditCard,
  CalendarCheck,
  CheckCircle,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const CRMReportsPage = () => {
  const { students, courses, payments, attendance, dailyActivities, internships } = useCRM();

  const [activeReportTab, setActiveReportTab] = useState('registration');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [dateRange, setDateRange] = useState('30D');

  const reportTabs = [
    { id: 'registration', label: 'Registration Reports', icon: TrendingUp },
    { id: 'enrollment', label: 'Course Enrollment', icon: Layers },
    { id: 'payments', label: 'Payment Reports', icon: CreditCard },
    { id: 'attendance', label: 'Attendance Reports', icon: CalendarCheck },
    { id: 'completion', label: 'Internship Completion', icon: Award },
    { id: 'progress', label: 'Student Progress', icon: BarChart3 },
    { id: 'activity', label: 'Daily Activities', icon: CheckCircle }
  ];

  // Chart Sample Data
  const monthlyTrends = [
    { period: 'Jun 2026', registrations: 34, revenue: 350000, completions: 12, attendanceRate: 95 },
    { period: 'Jul 2026', registrations: 48, revenue: 480000, completions: 18, attendanceRate: 94 },
    { period: 'Aug 2026', registrations: 62, revenue: 620000, completions: 24, attendanceRate: 96 },
    { period: 'Sep 2026', registrations: 75, revenue: 750000, completions: 31, attendanceRate: 93 },
    { period: 'Oct 2026', registrations: 89, revenue: 890000, completions: 45, attendanceRate: 97 },
    { period: 'Nov 2026', registrations: 104, revenue: 1040000, completions: 52, attendanceRate: 96 }
  ];

  const handleExportCurrentReport = () => {
    let headers = '';
    let rows = '';

    if (activeReportTab === 'registration' || activeReportTab === 'progress') {
      headers = 'ID,Name,Course,RegistrationDate,InternshipStatus,Progress,Attendance\n';
      rows = students.map(s => `"${s.id}","${s.name}","${s.course}","${s.registrationDate}","${s.internshipStatus}",${s.progress}%,${s.attendance}%\n`).join('');
    } else if (activeReportTab === 'payments') {
      headers = 'TransactionID,StudentID,StudentName,Course,AmountPaid,PendingAmount,PaymentStatus,Date\n';
      rows = payments.map(p => `"${p.id}","${p.studentId}","${p.studentName}","${p.course}",${p.amountPaid},${p.pendingAmount},"${p.paymentStatus}","${p.paymentDate}"\n`).join('');
    } else if (activeReportTab === 'activity') {
      headers = 'Day,TaskTitle,StudentID,StudentName,Status,Date,MentorFeedback\n';
      rows = dailyActivities.map(a => `"${a.dayNumber}","${a.taskTitle}","${a.studentId}","${a.studentName}","${a.taskStatus}","${a.activityDate}","${a.mentorFeedback}"\n`).join('');
    } else {
      headers = 'ID,Title,Category,Duration,EnrolledCount,Fee\n';
      rows = courses.map(c => `"${c.id}","${c.name}","${c.category}","${c.duration}",${c.enrolledCount},${c.fee}\n`).join('');
    }

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AR_IT_COMPANY_${activeReportTab.toUpperCase()}_REPORT_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Reports &amp; Analytics
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Comprehensive executive metrics, cohort audits, financial statements, and completion analytics
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={handleExportCurrentReport}
        >
          <Download size={14} />
          <span>Export Active Report (CSV)</span>
        </button>
      </div>

      {/* Report Tabs Card */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom overflow-x-auto">
          <div className="crm-tabs-nav mb-0">
            {reportTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`crm-tab-btn ${activeReportTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveReportTab(tab.id)}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select form-select-sm bg-white"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{ width: '180px', fontSize: '12.5px' }}
            >
              <option value="All">All Course Domains</option>
              {courses.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>

            <select
              className="form-select form-select-sm bg-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ width: '150px', fontSize: '12.5px' }}
            >
              <option value="30D">Last 30 Days</option>
              <option value="90D">Last Quarter (90 Days)</option>
              <option value="1Y">Full Year 2026</option>
            </select>
          </div>

          <span className="text-muted" style={{ fontSize: '12px' }}>
            Generated for: <strong>AR IT COMPANY Internal Audit</strong>
          </span>
        </div>

        {/* Interactive Analytics Chart */}
        <div className="p-4 border-bottom">
          <h5 className="fw-bold mb-3 text-dark" style={{ fontSize: '15px' }}>
            Trend &amp; Growth Trajectory &ndash; {reportTabs.find(t => t.id === activeReportTab)?.label}
          </h5>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {activeReportTab === 'payments' ? (
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="revenue" name="Total Revenue (₹)" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : activeReportTab === 'attendance' ? (
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="attendanceRate" name="Attendance %" stroke="#172554" strokeWidth={3} />
                </LineChart>
              ) : (
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="registrations" name="New Registrations" fill="#7045B5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completions" name="Internship Completions" fill="#E9A4C4" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Summary Grid */}
        <div className="p-4">
          <h5 className="fw-bold mb-3 text-dark" style={{ fontSize: '15px' }}>
            Audit Summary Breakdown
          </h5>

          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted d-block" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Total Cohort Enrollment
                </span>
                <strong className="fs-4 text-dark">{students.length} Candidates</strong>
                <div className="text-success mt-1" style={{ fontSize: '11.5px' }}>
                  +100% verified registry
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted d-block" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Internship Completion Rate
                </span>
                <strong className="fs-4" style={{ color: 'var(--crm-purple)' }}>
                  {Math.round((students.filter(s => s.internshipStatus === 'Completed').length / students.length) * 100)}%
                </strong>
                <div className="text-muted mt-1" style={{ fontSize: '11.5px' }}>
                  Excellence standards met
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted d-block" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Average Daily Participation
                </span>
                <strong className="fs-4 text-success">
                  {Math.round(students.reduce((a, b) => a + b.attendance, 0) / students.length)}%
                </strong>
                <div className="text-muted mt-1" style={{ fontSize: '11.5px' }}>
                  Above 80% threshold
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMReportsPage;
