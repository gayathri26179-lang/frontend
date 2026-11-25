import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CRMProvider, useCRM } from './context/CRMContext';
import CRMSidebar from './components/CRMSidebar';
import CRMHeader from './components/CRMHeader';

// 14 Core Pages
import CRMDashboard from './pages/CRMDashboard';
import CRMStudentsPage from './pages/CRMStudentsPage';
import CRMCoursesPage from './pages/CRMCoursesPage';
import CRMInternshipsPage from './pages/CRMInternshipsPage';
import CRMDailyActivitiesPage from './pages/CRMDailyActivitiesPage';
import CRMAttendancePage from './pages/CRMAttendancePage';
import CRMProgressPage from './pages/CRMProgressPage';
import CRMPaymentsPage from './pages/CRMPaymentsPage';
import CRMCertificatesPage from './pages/CRMCertificatesPage';
import CRMMentorsPage from './pages/CRMMentorsPage';
import CRMCommunicationPage from './pages/CRMCommunicationPage';
import CRMReportsPage from './pages/CRMReportsPage';
import CRMNotificationsPage from './pages/CRMNotificationsPage';
import CRMSettingsPage from './pages/CRMSettingsPage';

// Modals
import CRMStudentModal from './components/CRMStudentModal';
import CRMStudentProfileModal from './components/CRMStudentProfileModal';

import './styles/crm.css';

const CRMMainContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { generateCertificate } = useCRM();

  // Extract current tab from URL path if present, otherwise default to 'dashboard'
  const getInitialTab = () => {
    const path = location.pathname.replace(/^\/crm\/?/, '').replace(/^\//, '');
    const validTabs = [
      'dashboard', 'students', 'courses', 'internships', 'daily-activities',
      'attendance', 'progress', 'payments', 'certificates', 'mentors',
      'communication', 'reports', 'notifications', 'settings'
    ];
    return validTabs.includes(path) ? path : 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals State
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [profileModalStudent, setProfileModalStudent] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Keep URL in sync with tab
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const currentTab = getInitialTab();
    if (currentTab !== activeTab) {
      setActiveTabState(currentTab);
    }
  }, [location.pathname]);

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
      if (!student.certificateIssued && student.internshipStatus === 'Completed') {
        generateCertificate(student.id, 'navy');
      }
    }
    setActiveTab('certificates');
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem('arit_admin_token');
    localStorage.removeItem('arit_auth');
    navigate('/login');
  };

  // Render the current view according to activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <CRMDashboard
            onOpenStudentProfile={handleOpenProfile}
            onNavigateTab={(tab) => setActiveTab(tab)}
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
      case 'internships':
        return (
          <CRMInternshipsPage
            onOpenStudentProfile={handleOpenProfile}
          />
        );
      case 'daily-activities':
        return <CRMDailyActivitiesPage />;
      case 'attendance':
        return <CRMAttendancePage />;
      case 'progress':
        return (
          <CRMProgressPage
            onOpenStudentProfile={handleOpenProfile}
          />
        );
      case 'payments':
        return <CRMPaymentsPage />;
      case 'certificates':
        return <CRMCertificatesPage />;
      case 'mentors':
        return <CRMMentorsPage />;
      case 'communication':
        return <CRMCommunicationPage />;
      case 'reports':
        return <CRMReportsPage />;
      case 'notifications':
        return <CRMNotificationsPage />;
      case 'settings':
        return <CRMSettingsPage onLogout={() => setShowLogoutConfirm(true)} />;
      default:
        return (
          <CRMDashboard
            onOpenStudentProfile={handleOpenProfile}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        );
    }
  };

  return (
    <div className="crm-wrapper">
      {/* 15-Item Left Sidebar Navigation */}
      <CRMSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={() => setShowLogoutConfirm(true)}
      />

      {/* Main Container */}
      <div className="crm-main-container">
        {/* Sticky Header */}
        <CRMHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddStudent={handleOpenAddStudent}
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

      {/* Student Profile 7-Tab Modal */}
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
                Are you sure you want to log out of the AR IT COMPANY CRM portal? Your active sessions and cohort progress records are safely stored.
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
