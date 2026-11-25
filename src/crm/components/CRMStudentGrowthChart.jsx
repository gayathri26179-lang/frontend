import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const CRMStudentGrowthChart = () => {
  const [timeRange, setTimeRange] = useState('6M');

  // Realistic monthly registration analytics data for AR IT COMPANY
  const data6M = [
    { month: 'Jun 2026', registrations: 34, ongoingInterns: 28, completions: 12 },
    { month: 'Jul 2026', registrations: 48, ongoingInterns: 42, completions: 18 },
    { month: 'Aug 2026', registrations: 62, ongoingInterns: 56, completions: 24 },
    { month: 'Sep 2026', registrations: 75, ongoingInterns: 68, completions: 31 },
    { month: 'Oct 2026', registrations: 89, ongoingInterns: 82, completions: 45 },
    { month: 'Nov 2026', registrations: 104, ongoingInterns: 94, completions: 52 }
  ];

  const data1Y = [
    { month: 'Jan', registrations: 20, ongoingInterns: 18, completions: 8 },
    { month: 'Feb', registrations: 24, ongoingInterns: 22, completions: 10 },
    { month: 'Mar', registrations: 30, ongoingInterns: 26, completions: 14 },
    { month: 'Apr', registrations: 35, ongoingInterns: 30, completions: 15 },
    { month: 'May', registrations: 40, ongoingInterns: 36, completions: 18 },
    ...data6M
  ];

  const currentData = timeRange === '6M' ? data6M : data1Y;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white p-3 rounded-3 shadow-lg border"
          style={{ borderColor: 'var(--crm-border)', fontSize: '12px' }}
        >
          <div className="fw-bold mb-1" style={{ color: 'var(--crm-navy)' }}>{label}</div>
          <div style={{ color: '#7045B5' }}>
            New Registrations: <span className="fw-bold">{payload[0]?.value}</span>
          </div>
          {payload[1] && (
            <div style={{ color: '#172554' }}>
              Ongoing Interns: <span className="fw-bold">{payload[1]?.value}</span>
            </div>
          )}
          {payload[2] && (
            <div style={{ color: '#E9A4C4' }}>
              Completed Internships: <span className="fw-bold">{payload[2]?.value}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="crm-card h-100 mb-0">
      <div className="crm-card-header">
        <div>
          <h2 className="crm-card-title">
            <TrendingUp size={18} style={{ color: 'var(--crm-purple)' }} />
            <span>Monthly Registration Analytics</span>
          </h2>
          <div className="crm-card-subtitle">
            Student registrations and active internship cohort expansion
          </div>
        </div>

        <div className="d-flex align-items-center gap-1 bg-light p-1 rounded-3">
          <button
            type="button"
            className={`btn btn-sm ${timeRange === '6M' ? 'text-white' : 'text-muted'} py-1 px-2.5 rounded-2 fw-semibold`}
            style={{
              backgroundColor: timeRange === '6M' ? 'var(--crm-purple)' : 'transparent',
              fontSize: '11px',
              border: 'none'
            }}
            onClick={() => setTimeRange('6M')}
          >
            Last 6 Months
          </button>
          <button
            type="button"
            className={`btn btn-sm ${timeRange === '1Y' ? 'text-white' : 'text-muted'} py-1 px-2.5 rounded-2 fw-semibold`}
            style={{
              backgroundColor: timeRange === '1Y' ? 'var(--crm-purple)' : 'transparent',
              fontSize: '11px',
              border: 'none'
            }}
            onClick={() => setTimeRange('1Y')}
          >
            Full Year
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7045B5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7045B5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#172554" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#172554" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E9A4C4" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#E9A4C4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11.5px', paddingTop: '10px' }}
              formatter={(value) => <span style={{ color: 'var(--crm-text-secondary)' }}>{value}</span>}
            />
            <Area
              type="monotone"
              name="New Registrations"
              dataKey="registrations"
              stroke="#7045B5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#purpleGrad)"
            />
            <Area
              type="monotone"
              name="Ongoing Interns"
              dataKey="ongoingInterns"
              stroke="#172554"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#navyGrad)"
            />
            <Area
              type="monotone"
              name="Completions"
              dataKey="completions"
              stroke="#E9A4C4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#pinkGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CRMStudentGrowthChart;
