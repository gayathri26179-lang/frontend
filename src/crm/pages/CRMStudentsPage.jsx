import React from 'react';
import CRMStudentTable from '../components/CRMStudentTable';
import { Users, UserPlus, Download, Filter } from 'lucide-react';
import { useCRM } from '../context/CRMContext';

const CRMStudentsPage = ({ onOpenStudentProfile, onEditStudent, onAddStudent, onGenerateCert }) => {
  const { students } = useCRM();

  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Course,Progress,Status,Attendance,FeeStatus\n'];
    const rows = students.map(s => `"${s.id}","${s.name}","${s.email}","${s.course}",${s.progress}%,"${s.status}","${s.attendance}%","${s.feeStatus}"\n`);
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Incredible_AI_Students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Student & Intern Directory
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            View, search, filter, and manage all enrolled students across training cohorts
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="crm-btn crm-btn-secondary crm-btn-sm"
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
            <span>Add New Student</span>
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
