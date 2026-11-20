import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

const CRMStudentGrowthChart = () => {
  const [timeRange, setTimeRange] = useState('6M');

  // Realistic 6 months student growth data
  const data6M = [
    { month: 'Jun', students: 780, active: 620, completions: 95 },
    { month: 'Jul', students: 890, active: 740, completions: 120 },
    { month: 'Aug', students: 975, active: 810, completions: 145 },
    { month: 'Sep', students: 1060, active: 890, completions: 170 },
    { month: 'Oct', students: 1165, active: 970, completions: 195 },
    { month: 'Nov', students: 1248, active: 1045, completions: 220 }
  ];

  const data1Y = [
    { month: 'Dec 25', students: 480, active: 390, completions: 50 },
    { month: 'Jan 26', students: 540, active: 440, completions: 65 },
    { month: 'Feb', students: 610, active: 510, completions: 80 },
    { month: 'Mar', students: 680, active: 560, completions: 90 },
    { month: 'Apr', students: 730, active: 590, completions: 85 },
    { month: 'May', students: 760, active: 610, completions: 90 },
    ...data6M
  ];

  const currentData = timeRange === '6M' ? data6M : data1Y;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white p-3 rounded-3 shadow-lg border"
          style={{ borderColor: 'var(--crm-lavender-border)', fontSize: '12px' }}
        >
          <div className="fw-bold text-dark mb-1">{label} 2026</div>
          <div style={{ color: '#6366f1' }}>
            Total Students: <span className="fw-bold">{payload[0].value.toLocaleString()}</span>
          </div>
          {payload[1] && (
            <div style={{ color: '#8b5cf6' }}>
              Active Learning: <span className="fw-bold">{payload[1].value.toLocaleString()}</span>
            </div>
          )}
          {payload[2] && (
            <div style={{ color: '#10b981' }}>
              Graduated: <span className="fw-bold">{payload[2].value.toLocaleString()}</span>
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
            <TrendingUp size={18} className="text-primary" />
            <span>Student Growth Overview</span>
          </h2>
          <div className="crm-card-subtitle">
            Cumulative enrollments & active learners over the last six months
          </div>
        </div>

        <div className="d-flex align-items-center gap-1 bg-light p-1 rounded-3">
          <button
            type="button"
            className={`btn btn-sm ${timeRange === '6M' ? 'btn-primary' : 'btn-light'} py-1 px-2 rounded-2 fw-semibold`}
            style={{ fontSize: '11px' }}
            onClick={() => setTimeRange('6M')}
          >
            Last 6 Months
          </button>
          <button
            type="button"
            className={`btn btn-sm ${timeRange === '1Y' ? 'btn-primary' : 'btn-light'} py-1 px-2 rounded-2 fw-semibold`}
            style={{ fontSize: '11px' }}
            onClick={() => setTimeRange('1Y')}
          >
            1 Year
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="studentGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="activeLearnersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="students"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#studentGrowthGrad)"
            />
            <Area
              type="monotone"
              dataKey="active"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#activeLearnersGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-4 mt-3 pt-2 border-top">
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <span style={{ fontSize: '12px', color: '#64748b' }}>Total Enrolled</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
          <span style={{ fontSize: '12px', color: '#64748b' }}>Active Learners</span>
        </div>
        <div className="d-flex align-items-center gap-1 ms-auto text-success fw-bold" style={{ fontSize: '12px' }}>
          <TrendingUp size={14} />
          <span>+60% YoY Acceleration</span>
        </div>
      </div>
    </div>
  );
};

export default CRMStudentGrowthChart;
