import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Calendar,
  Save,
  Users,
  Download,
  BarChart2,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const CRMAttendancePage = () => {
  const { students, attendance, markAttendance, markAllAttendance, showToast } = useCRM();

  const [selectedDate, setSelectedDate] = useState('2026-11-25');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');

  // Attendance states for current selectedDate
  const currentDayRecords = useMemo(() => {
    const map = {};
    attendance
      .filter(a => a.date === selectedDate)
      .forEach(a => {
        map[a.studentId] = a.status;
      });
    return map;
  }, [attendance, selectedDate]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = selectedCourseFilter === 'All' || s.course === selectedCourseFilter;
      return matchSearch && matchCourse;
    });
  }, [students, searchTerm, selectedCourseFilter]);

  const handleStatusChange = (studentId, status) => {
    markAttendance(studentId, status, selectedDate);
  };

  const handleMarkAllPresent = () => {
    markAllAttendance('Present', selectedDate);
  };

  // Monthly Attendance Analytics Data
  const monthlyData = [
    { day: 'Mon (17th)', present: 95, absent: 3, leave: 2 },
    { day: 'Tue (18th)', present: 98, absent: 1, leave: 1 },
    { day: 'Wed (19th)', present: 92, absent: 5, leave: 3 },
    { day: 'Thu (20th)', present: 96, absent: 2, leave: 2 },
    { day: 'Fri (21st)', present: 94, absent: 4, leave: 2 },
    { day: 'Mon (24th)', present: 97, absent: 2, leave: 1 },
    { day: 'Tue (25th)', present: 96, absent: 2, leave: 2 }
  ];

  // Counts for selected date
  const presentCount = Object.values(currentDayRecords).filter(v => v === 'Present').length;
  const absentCount = Object.values(currentDayRecords).filter(v => v === 'Absent').length;
  const leaveCount = Object.values(currentDayRecords).filter(v => v === 'Leave').length;
  const notMarkedCount = Math.max(0, students.length - (presentCount + absentCount + leaveCount));

  const averageAttendance = Math.round(
    students.reduce((acc, curr) => acc + (curr.attendance || 0), 0) / (students.length || 1)
  );

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Attendance Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Daily session roll calls, attendance percentages, leave records, and monthly participation analytics
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <input
            type="date"
            className="form-control form-control-sm rounded-3 border bg-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: '160px', fontSize: '13px' }}
          />

          <button
            type="button"
            className="crm-btn crm-btn-outline crm-btn-sm"
            onClick={handleMarkAllPresent}
          >
            <CheckCircle size={14} className="text-success" />
            <span>Mark All Present</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="crm-stat-card success py-3">
            <div>
              <div className="crm-stat-label">Present</div>
              <div className="crm-stat-value fs-4 text-success">{presentCount} Students</div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-success">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="crm-stat-card warning py-3">
            <div>
              <div className="crm-stat-label">On Leave</div>
              <div className="crm-stat-value fs-4 text-warning">{leaveCount} Students</div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-warning">
              <Clock size={20} />
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="crm-stat-card pink py-3">
            <div>
              <div className="crm-stat-label">Absent</div>
              <div className="crm-stat-value fs-4 text-danger">{absentCount} Students</div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-pink">
              <XCircle size={20} />
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="crm-stat-card navy py-3">
            <div>
              <div className="crm-stat-label">Cohort Average</div>
              <div className="crm-stat-value fs-4" style={{ color: 'var(--crm-navy)' }}>
                {averageAttendance}%
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-navy">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Attendance Analytics Chart */}
      <div className="crm-card mb-4">
        <div className="crm-card-header">
          <div>
            <h2 className="crm-card-title">
              <BarChart2 size={18} style={{ color: 'var(--crm-purple)' }} />
              <span>Monthly Attendance Report &amp; Trend</span>
            </h2>
            <div className="crm-card-subtitle">
              Daily cohort participation rate for sprint standups
            </div>
          </div>
          <span className="badge px-2.5 py-1 text-white" style={{ backgroundColor: 'var(--crm-purple)', fontSize: '11px' }}>
            Live Roll Call
          </span>
        </div>

        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="present" name="Present %" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leave" name="Approved Leave %" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent %" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance Table Card */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '15px' }}>
            Daily Attendance Roster &ndash; {selectedDate}
          </h3>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control form-control-sm bg-light"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '200px', fontSize: '12.5px' }}
            />

            <select
              className="form-select form-select-sm bg-light"
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              style={{ width: '180px', fontSize: '12px' }}
            >
              <option value="All">All Courses</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Python Programming">Python Programming</option>
              <option value="Java Programming">Java Programming</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>
        </div>

        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Selected Course</th>
                <th>Overall Attendance %</th>
                <th>Attendance Date</th>
                <th className="text-center">Present</th>
                <th className="text-center">Leave</th>
                <th className="text-center">Absent</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const currentStatus = currentDayRecords[student.id] || (student.attendance > 90 ? 'Present' : 'Leave');
                return (
                  <tr key={student.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="rounded-circle"
                          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                        />
                        <strong className="text-dark" style={{ fontSize: '13px' }}>
                          {student.name}
                        </strong>
                      </div>
                    </td>

                    <td>
                      <span className="badge px-2 py-1 text-white" style={{ backgroundColor: 'var(--crm-navy)', fontSize: '10px' }}>
                        {student.id}
                      </span>
                    </td>

                    <td style={{ fontSize: '12.5px' }}>{student.course}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold" style={{ fontSize: '12.5px', color: student.attendance >= 85 ? 'var(--crm-success)' : student.attendance >= 75 ? 'var(--crm-warning)' : 'var(--crm-danger)' }}>
                          {student.attendance}%
                        </span>
                        <div className="crm-progress-track" style={{ width: '60px', height: '5px' }}>
                          <div
                            className={`crm-progress-fill ${student.attendance >= 85 ? 'success' : ''}`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td style={{ fontSize: '12px' }}>{selectedDate}</td>

                    {/* Present Toggle */}
                    <td className="text-center">
                      <button
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 py-1 ${currentStatus === 'Present' ? 'btn-success text-white fw-bold shadow-sm' : 'btn-outline-secondary'}`}
                        style={{ fontSize: '11.5px' }}
                        onClick={() => handleStatusChange(student.id, 'Present')}
                      >
                        Present
                      </button>
                    </td>

                    {/* Leave Toggle */}
                    <td className="text-center">
                      <button
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 py-1 ${currentStatus === 'Leave' ? 'btn-warning text-dark fw-bold shadow-sm' : 'btn-outline-secondary'}`}
                        style={{ fontSize: '11.5px' }}
                        onClick={() => handleStatusChange(student.id, 'Leave')}
                      >
                        Leave
                      </button>
                    </td>

                    {/* Absent Toggle */}
                    <td className="text-center">
                      <button
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 py-1 ${currentStatus === 'Absent' ? 'btn-danger text-white fw-bold shadow-sm' : 'btn-outline-secondary'}`}
                        style={{ fontSize: '11.5px' }}
                        onClick={() => handleStatusChange(student.id, 'Absent')}
                      >
                        Absent
                      </button>
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
