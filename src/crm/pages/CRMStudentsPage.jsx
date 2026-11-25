import React from 'react';
import CRMStudentTable from '../components/CRMStudentTable';
import { Users, UserPlus, Download, RefreshCw } from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMStudentsPage = ({ onOpenStudentProfile, onEditStudent, onAddStudent, onGenerateCert }) => {
  const { students, syncInternshipWebsiteRegistrations, isSyncing } = useCRM();

  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Course,RegistrationDate,InternshipStatus,Attendance,Progress,FeeStatus,TotalFee,PaidAmount,PendingAmount,Mentor\n';
    const rows = students.map(s =>
      `"${s.id}","${s.name}","${s.email}","${s.phone || ''}","${s.course}","${s.registrationDate}","${s.internshipStatus}",${s.attendance}%,${s.progress}%,"${s.feeStatus}",${s.totalFee},${s.paidAmount},${s.pendingAmount},"${s.mentor}"\n`
    ).join('');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AR_IT_COMPANY_Students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Top Banner with Actions */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Student &amp; Intern Directory
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Comprehensive records of registered candidates across AR IT COMPANY tech cohorts
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="crm-btn crm-btn-outline crm-btn-sm"
            onClick={syncInternshipWebsiteRegistrations}
            disabled={isSyncing}
          >
            <RefreshCw size={13} className={isSyncing ? 'spin-animation' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Website Registrations'}</span>
          </button>
          <button
            type="button"
            className="crm-btn crm-btn-outline crm-btn-sm"
            onClick={handleExportCSV}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={onAddStudent}
          >
            <UserPlus size={14} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Main Student Table */}
      <CRMStudentTable
        onOpenStudentProfile={onOpenStudentProfile}
        onEditStudent={onEditStudent}
        onAddStudent={onAddStudent}
        onGenerateCert={onGenerateCert}
      />
    </div>
  );
};

export default CRMStudentsPage;
