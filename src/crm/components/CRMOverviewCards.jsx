import React from 'react';
import { useCRM } from '../context/CRMContext';
import {
  Users,
  UserPlus,
  UserCheck,
  Briefcase,
  Award,
  Clock,
  BookOpen,
  CreditCard,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

const CRMOverviewCards = () => {
  const { metrics } = useCRM();

  const cards = [
    {
      title: 'Total Students',
      value: metrics.totalStudents,
      sub: 'Enrolled in portal',
      icon: Users,
      theme: 'navy',
      trend: '+14% this month'
    },
    {
      title: 'Total Registrations',
      value: metrics.totalRegistrations,
      sub: 'Portal + Website',
      icon: UserPlus,
      theme: 'purple',
      trend: '+22% new signups'
    },
    {
      title: 'Active Students',
      value: metrics.activeStudents,
      sub: 'Under training',
      icon: UserCheck,
      theme: 'success',
      trend: '94% attendance rate'
    },
    {
      title: 'Active Interns',
      value: metrics.activeInterns,
      sub: 'Ongoing projects',
      icon: Briefcase,
      theme: 'purple',
      trend: 'Working on sprints'
    },
    {
      title: 'Completed Internships',
      value: metrics.completedInternships,
      sub: 'Certified alumni',
      icon: Award,
      theme: 'pink',
      trend: '100% placement rate'
    },
    {
      title: 'Pending Applications',
      value: metrics.pendingApplications,
      sub: 'Needs review',
      icon: Clock,
      theme: 'warning',
      trend: 'From website portal'
    },
    {
      title: 'Total Courses',
      value: metrics.totalCourses,
      sub: 'Curriculum tracks',
      icon: BookOpen,
      theme: 'navy',
      trend: '7 active programs'
    },
    {
      title: 'Total Revenue',
      value: `₹${metrics.totalRevenue.toLocaleString('en-IN')}`,
      sub: 'Tuition fees collected',
      icon: CreditCard,
      theme: 'success',
      trend: 'Verified receipts'
    }
  ];

  return (
    <div className="row g-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="col-12 col-sm-6 col-xl-3">
            <div className={`crm-stat-card ${card.theme}`}>
              <div className="flex-grow-1 me-2">
                <div className="crm-stat-label">{card.title}</div>
                <div className="crm-stat-value">{card.value}</div>
                <div className="crm-stat-trend positive">
                  <ArrowUpRight size={13} />
                  <span>{card.trend}</span>
                </div>
              </div>
              <div className={`crm-stat-icon-wrapper crm-stat-icon-${card.theme}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CRMOverviewCards;
