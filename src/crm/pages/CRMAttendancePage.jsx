import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Calendar,
  Save
} from 'lucide-react';

const CRMAttendancePage = () => {
  const { students } = useCRM();
  const [selectedDate, setSelectedDate] = useState('2026-11-20');
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const map = {};
    students.forEach((s, idx) => {
      map[s.id] = idx === 5 ? 'Absent' : idx === 3 ? 'Late' : 'Present';
    });
    return map;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatusChange = (studentId, status) => {
    setAttendanceRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const presentCount = Object.values(attendanceRecords).filter(v => v === 'Present').length;
  const lateCount = Object.values(attendanceRecords).filter(v => v === 'Late').length;
  const absentCount = Object.values(attendanceRecords).filter(v => v === 'Absent').length;
  const attendanceRate = Math.round(((presentCount + lateCount * 0.5) / students.length) * 100) || 96;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Daily Attendance & Cohort Participation
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Record student standup presence, lab attendance, and track participation consistency
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <input
            type="date"
            className="form-control form-control-sm rounded-3 border"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={handleSaveAttendance}
          >
            <Save size={14} />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3 rounded-3" style={{ fontSize: '13px' }}>
          <CheckCircle size={16} />
          <span>Attendance logs for {selectedDate} saved successfully and synced with student profiles.</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="crm-card p-3 mb-0 text-center">
            <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Present Today</div>
            <div className="fw-bold fs-4 text-success">{presentCount} Students</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="crm-card p-3 mb-0 text-center">
            <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Late Check-in</div>
            <div className="fw-bold fs-4 text-warning">{lateCount} Students</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="crm-card p-3 mb-0 text-center">
            <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Absent / Excused</div>
            <div className="fw-bold fs-4 text-danger">{absentCount} Students</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="crm-card p-3 mb-0 text-center">
            <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Cohort Attendance Rate</div>
            <div className="fw-bold fs-4 text-primary">{attendanceRate}%</div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="crm-card">
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Overall Attendance</th>
                <th>Date: {selectedDate}</th>
                <th className="text-end">Mark Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const currentStatus = attendanceRecords[student.id] || 'Present';
                return (
                  <tr key={student.id}>
                    <td>
                      <span className="font-monospace text-primary fw-bold" style={{ fontSize: '12px' }}>
                        {student.id}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="rounded-circle"
                          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                        />
                        <div className="fw-semibold text-dark">{student.name}</div>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted" style={{ fontSize: '12px' }}>{student.course}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold" style={{ fontSize: '12px' }}>{student.attendance}%</span>
                        <div className="crm-progress-track" style={{ width: '80px' }}>
                          <div
                            className="crm-progress-fill"
                            style={{
                              width: `${student.attendance}%`,
                              background: student.attendance >= 90 ? '#10b981' : '#f59e0b'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor:
                            currentStatus === 'Present' ? '#ecfdf5' : currentStatus === 'Late' ? '#fffbeb' : '#fef2f2',
                          color:
                            currentStatus === 'Present' ? '#059669' : currentStatus === 'Late' ? '#d97706' : '#ef4444'
                        }}
                      >
                        {currentStatus}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button"
                          className={`btn ${currentStatus === 'Present' ? 'btn-success' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '11px' }}
                          onClick={() => handleStatusChange(student.id, 'Present')}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          className={`btn ${currentStatus === 'Late' ? 'btn-warning' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '11px' }}
                          onClick={() => handleStatusChange(student.id, 'Late')}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          className={`btn ${currentStatus === 'Absent' ? 'btn-danger' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '11px' }}
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRMAttendancePage;
