import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Users, CheckCircle, Award, DollarSign, TrendingUp } from 'lucide-react';

const MiniSparkline = ({ data, color }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="crm-sparkline-svg" viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const CRMOverviewCards = () => {
  const { metrics } = useCRM();

  const cardsData = [
    {
      title: 'Total Students',
      value: metrics.totalStudents.toLocaleString(),
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      iconTheme: 'purple',
      sparkline: [1020, 1080, 1140, 1190, 1220, 1248],
      sparkColor: '#6366f1'
    },
    {
      title: 'Tasks Completed',
      value: metrics.tasksCompleted.toLocaleString(),
      change: '+18.2%',
      isPositive: true,
      icon: CheckCircle,
      iconTheme: 'indigo',
      sparkline: [6200, 6800, 7400, 7900, 8300, 8620],
      sparkColor: '#4f46e5'
    },
    {
      title: 'Certificates Issued',
      value: metrics.certificatesIssued.toLocaleString(),
      change: '+8.4%',
      isPositive: true,
      icon: Award,
      iconTheme: 'violet',
      sparkline: [480, 520, 560, 590, 620, 642],
      sparkColor: '#8b5cf6'
    },
    {
      title: 'Total Revenue',
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      change: '+14.6%',
      isPositive: true,
      icon: DollarSign,
      iconTheme: 'emerald',
      sparkline: [88000, 96000, 104000, 114000, 122000, 128450],
      sparkColor: '#10b981'
    }
  ];

  return (
    <div className="crm-kpi-grid">
      {cardsData.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="crm-kpi-card">
            <div className="crm-kpi-top">
              <div>
                <div className="crm-kpi-title">{card.title}</div>
                <div className="crm-kpi-value">{card.value}</div>
              </div>
              <div className={`crm-kpi-icon-box ${card.iconTheme}`}>
                <Icon size={24} />
              </div>
            </div>

            <div className="crm-kpi-bottom">
              <span className={`crm-trend-badge ${card.isPositive ? 'positive' : 'neutral'}`}>
                <TrendingUp size={13} />
                <span>{card.change}</span>
              </span>
              <div className="d-flex align-items-center gap-1">
                <MiniSparkline data={card.sparkline} color={card.sparkColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CRMOverviewCards;
