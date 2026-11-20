import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CRMProvider, useCRM } from './context/CRMContext';
import CRMSidebar from './components/CRMSidebar';
import CRMHeader from './components/CRMHeader';

// Pages
import CRMDashboard from './pages/CRMDashboard';
import CRMStudentsPage from './pages/CRMStudentsPage';
import CRMCoursesPage from './pages/CRMCoursesPage';
import CRMDailyTasksPage from './pages/CRMDailyTasksPage';
import CRMSubmissionsPage from './pages/CRMSubmissionsPage';
import CRMCertificatesPage from './pages/CRMCertificatesPage';
import CRMAttendancePage from './pages/CRMAttendancePage';
import CRMProgressPage from './pages/CRMProgressPage';
import CRMPaymentsPage from './pages/CRMPaymentsPage';
import CRMMessagesPage from './pages/CRMMessagesPage';
import CRMReportsPage from './pages/CRMReportsPage';
import CRMSettingsPage from './pages/CRMSettingsPage';

// Modals
import CRMStudentModal from './components/CRMStudentModal';
import CRMStudentProfileModal from './components/CRMStudentProfileModal';

import './styles/crm.css';

const CRMMainContent = () => {
  const navigate = useNavigate();
  const { setSelectedCertificate, generateCertificate } = useCRM();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals State
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [profileModalStudent, setProfileModalStudent] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handlers
  const handleOpenAddStudent = () => {
    setStudentToEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student) => {
    setStudentToEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleOpenProfile = (student) => {
    setProfileModalStudent(student);
  };

  const handleGenerateOrViewCert = (student) => {
    if (student) {
      if (!student.certificateIssued) {
        generateCertificate(student);
      }
    }
    setActiveTab('certificates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToMainPortal = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  // Render the current view according to activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <CRMDashboard
            onOpenStudentProfile={handleOpenProfile}
            onEditStudent={handleOpenEditStudent}
            onAddStudent={handleOpenAddStudent}
            onGenerateCert={handleGenerateOrViewCert}
            onViewAllActivities={() => setActiveTab('reports')}
          />
        );
      case 'students':
        return (
          <CRMStudentsPage
            onOpenStudentProfile={handleOpenProfile}
            onEditStudent={handleOpenEditStudent}
            onAddStudent={handleOpenAddStudent}
            onGenerateCert={handleGenerateOrViewCert}
          />
        );
      case 'courses':
        return <CRMCoursesPage />;
      case 'daily-tasks':
        return <CRMDailyTasksPage />;
      case 'submissions':
        return <CRMSubmissionsPage />;
      case 'certificates':
        return <CRMCertificatesPage onGenerateCertModal={handleOpenAddStudent} />;
      case 'attendance':
        return <CRMAttendancePage />;
      case 'progress':
        return <CRMProgressPage onOpenStudentProfile={handleOpenProfile} />;
      case 'payments':
        return <CRMPaymentsPage />;
      case 'messages':
        return <CRMMessagesPage />;
      case 'reports':
        return <CRMReportsPage />;
      case 'settings':
        return <CRMSettingsPage />;
      default:
        return (
          <CRMDashboard
            onOpenStudentProfile={handleOpenProfile}
            onEditStudent={handleOpenEditStudent}
            onAddStudent={handleOpenAddStudent}
            onGenerateCert={handleGenerateOrViewCert}
          />
        );
    }
  };

  return (
    <div className="crm-wrapper">
      {/* 13-Item Left Sidebar Navigation */}
      <CRMSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={() => setShowLogoutConfirm(true)}
        onReturnToMain={handleReturnToMainPortal}
      />

      {/* Main Container */}
      <div className="crm-main-container">
        {/* Sticky Header */}
        <CRMHeader
          activeTab={activeTab}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddStudent={handleOpenAddStudent}
          onGenerateCert={() => setActiveTab('certificates')}
          onReturnToMain={handleReturnToMainPortal}
          onLogout={() => setShowLogoutConfirm(true)}
        />

        {/* Dynamic View Body */}
        <main className="crm-content">
          {renderActiveView()}
        </main>
      </div>

      {/* Student Add/Edit Modal */}
      <CRMStudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        studentToEdit={studentToEdit}
      />

      {/* Student Profile Modal */}
      {profileModalStudent && (
        <CRMStudentProfileModal
          student={profileModalStudent}
          onClose={() => setProfileModalStudent(null)}
          onGenerateCert={handleGenerateOrViewCert}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="crm-modal-backdrop" onClick={() => setShowLogoutConfirm(false)}>
          <div className="crm-modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '17px' }}>
                Confirm Sign Out
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowLogoutConfirm(false)} />
            </div>
            <div className="crm-modal-body">
              <p className="text-muted mb-0" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Are you sure you want to end your Incredible AI Solutions CRM session? Your workspace progress and active student logs have been saved.
              </p>
            </div>
            <div className="crm-modal-footer">
              <button
                type="button"
                className="crm-btn crm-btn-outline crm-btn-sm"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="crm-btn crm-btn-sm text-white"
                style={{ backgroundColor: '#ef4444' }}
                onClick={handleLogout}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CRMApp = () => {
  return (
    <CRMProvider>
      <CRMMainContent />
    </CRMProvider>
  );
};

export default CRMApp;
