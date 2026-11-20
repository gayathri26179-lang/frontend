import React from 'react';
import CRMOverviewCards from '../components/CRMOverviewCards';
import CRMStudentGrowthChart from '../components/CRMStudentGrowthChart';
import CRMCourseDistributionChart from '../components/CRMCourseDistributionChart';
import CRMRecentActivities from '../components/CRMRecentActivities';
import CRMStudentTable from '../components/CRMStudentTable';
import CRMPendingTasks from '../components/CRMPendingTasks';
import CRMCertificatePreview from '../components/CRMCertificatePreview';

const CRMDashboard = ({
  onOpenStudentProfile,
  onEditStudent,
  onAddStudent,
  onGenerateCert,
  onViewAllActivities
}) => {
  return (
    <div className="crm-dashboard-view">
      {/* 1. Four Summary Overview KPI Cards */}
      <section className="mb-4">
        <CRMOverviewCards />
      </section>

      {/* 2 & 3. Student Growth Chart & Course Distribution Doughnut Chart */}
      <section className="crm-charts-grid">
        <div className="crm-chart-col">
          <CRMStudentGrowthChart />
        </div>
        <div className="crm-chart-col">
          <CRMCourseDistributionChart />
        </div>
      </section>

      {/* 4. Recent Activities & 6. Pending Tasks Grid */}
      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-5">
          <CRMRecentActivities onViewAll={onViewAllActivities} />
        </div>
        <div className="col-12 col-xl-7">
          <CRMPendingTasks />
        </div>
      </section>

      {/* 5. Student Management Table */}
      <section className="mb-4">
        <CRMStudentTable
          onOpenStudentProfile={onOpenStudentProfile}
          onEditStudent={onEditStudent}
          onAddStudent={onAddStudent}
          onGenerateCert={onGenerateCert}
        />
      </section>

      {/* 7. Realistic Certificate Preview with PDF Download */}
      <section className="mb-4">
        <CRMCertificatePreview />
      </section>
    </div>
  );
};

export default CRMDashboard;
