import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BookOpen } from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMCourseDistributionChart = () => {
  const { courses } = useCRM();

  // Color palette using AR IT COMPANY corporate tones: Navy Blue, Violet, Pink
  const COLORS = [
    '#172554', // Navy Blue
    '#7C3AED', // Violet
    '#EC9AC7', // Pink
    '#1E3A8A', // Deep Navy
    '#8B5CF6', // Light Violet
    '#DB2777', // Rose Pink
    '#6D28D9'  // Deep Violet
  ];

  const chartData = courses.map((course, idx) => ({
    name: course.name,
    value: course.enrolledCount,
    color: COLORS[idx % COLORS.length]
  }));

  const totalEnrollments = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const pct = ((data.value / totalEnrollments) * 100).toFixed(1);
      return (
        <div className="bg-white p-2.5 rounded-3 shadow-lg border" style={{ fontSize: '12px' }}>
          <div className="fw-bold text-dark">{data.name}</div>
          <div style={{ color: data.payload.color }}>
            Enrolled: <span className="fw-bold">{data.value}</span> ({pct}%)
          </div>
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
            <BookOpen size={18} style={{ color: 'var(--crm-purple)' }} />
            <span>Course-wise Enrollment Chart</span>
          </h2>
          <div className="crm-card-subtitle">
            Student distribution across AR IT technology domains
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              formatter={(value) => <span style={{ color: 'var(--crm-text-secondary)' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CRMCourseDistributionChart;
