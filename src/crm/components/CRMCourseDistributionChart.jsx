import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen } from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMCourseDistributionChart = () => {
  const { courses } = useCRM();

  // Data mapping directly matching requirements:
  // Full Stack Development, Python, Data Science, AI & Machine Learning
  const courseData = [
    { name: 'Full Stack Development', students: 475, percentage: 38, color: '#6366f1' },
    { name: 'AI & Machine Learning', students: 337, percentage: 27, color: '#8b5cf6' },
    { name: 'Data Science', students: 262, percentage: 21, color: '#a855f7' },
    { name: 'Python', students: 174, percentage: 14, color: '#ec4899' }
  ];

  const totalStudents = courseData.reduce((acc, curr) => acc + curr.students, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="bg-white p-2 rounded-3 shadow border"
          style={{ borderColor: 'var(--crm-lavender-border)', fontSize: '12px' }}
        >
          <div className="fw-bold" style={{ color: data.color }}>{data.name}</div>
          <div>{data.students} students ({data.percentage}%)</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="crm-card h-100 mb-0 d-flex flex-column justify-content-between">
      <div className="crm-card-header">
        <div>
          <h2 className="crm-card-title">
            <BookOpen size={18} className="text-primary" />
            <span>Course Distribution</span>
          </h2>
          <div className="crm-card-subtitle">Enrolled students across 4 specialization tracks</div>
        </div>
      </div>

      <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={courseData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="students"
            >
              {courseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count Label */}
        <div
          className="position-absolute text-center"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
        >
          <div className="fw-bold" style={{ fontSize: '22px', color: '#1e1b4b', lineHeight: '1' }}>
            {totalStudents}
          </div>
          <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Students
          </div>
        </div>
      </div>

      {/* Legend List */}
      <div className="mt-3 pt-2 border-top">
        <div className="row g-2">
          {courseData.map((course, idx) => (
            <div key={idx} className="col-6">
              <div className="d-flex align-items-center gap-2 p-1 rounded-2 bg-light bg-opacity-50">
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: course.color,
                    flexShrink: 0
                  }}
                />
                <div className="text-truncate">
                  <div className="fw-semibold text-truncate" style={{ fontSize: '12px' }}>
                    {course.name}
                  </div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    {course.students} ({course.percentage}%)
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMCourseDistributionChart;
