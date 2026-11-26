import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  TrendingUp,
  Award,
  CheckCircle,
  Search,
  Filter,
  BarChart2,
  CalendarCheck,
  Eye,
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

const CRMProgressPage = ({ onOpenStudentProfile }) => {
  const { students } = useCRM();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = selectedCourse === 'All' || s.course === selectedCourse;
      return matchSearch && matchCourse;
    });
  }, [students, searchTerm, selectedCourse]);

  // Aggregate Course Progress Data for Chart
  const courseProgressData = useMemo(() => {
    const courseMap = {};
    students.forEach(s => {
      if (!courseMap[s.course]) {
        courseMap[s.course] = { totalProg: 0, count: 0, totalAtt: 0 };
      }
      courseMap[s.course].totalProg += s.progress;
      courseMap[s.course].totalAtt += s.attendance;
      courseMap[s.course].count += 1;
    });

    return Object.keys(courseMap).map(cName => ({
      course: cName.length > 18 ? cName.slice(0, 15) + '...' : cName,
      avgProgress: Math.round(courseMap[cName].totalProg / courseMap[cName].count),
      avgAttendance: Math.round(courseMap[cName].totalAtt / courseMap[cName].count)
    }));
  }, [students]);

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Student Progress Tracking
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Monitor task completions, syllabus advancement, attendance correlation, and sprint velocity
          </p>
        </div>
      </div>

      {/* Progress Chart Card */}
      <div className="crm-card mb-4">
        <div className="crm-card-header">
          <div>
            <h2 className="crm-card-title">
              <BarChart2 size={18} style={{ color: 'var(--crm-purple)' }} />
              <span>Domain-wise Average Progress &amp; Attendance</span>
            </h2>
            <div className="crm-card-subtitle">
              Cohort learning velocity across AR IT COMPANY curriculum tracks
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="course" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="avgProgress" name="Avg Progress %" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgAttendance" name="Avg Attendance %" fill="#172554" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '15px' }}>
            Individual Student Progress Overview
          </h3>

          <div className="d-flex align-items-center gap-2">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <Search size={14} />
              </span>
              <input
                type="text"
                className="form-control form-control-sm bg-light border-start-0"
                placeholder="Search student or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '180px', fontSize: '12.5px' }}
              />
            </div>

            <select
              className="form-select form-select-sm bg-light"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
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
                <th>Course Name</th>
                <th>Completed Tasks</th>
                <th>Pending Tasks</th>
                <th>Overall Progress</th>
                <th>Attendance %</th>
                <th>Internship Completion %</th>
                <th className="text-end">Profile</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const pendingTasksCount = Math.max(0, student.totalTasks - student.tasksCompleted);
                const internshipCompletionPct = student.internshipStatus === 'Completed' ? 100 : Math.round((student.tasksCompleted / student.totalTasks) * 100);

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
                        <div>
                          <strong className="text-dark d-block" style={{ fontSize: '13px' }}>
                            {student.name}
                          </strong>
                          <span className="text-muted" style={{ fontSize: '10.5px' }}>
                            {student.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={{ fontSize: '12.5px' }}>{student.course}</td>

                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success fw-bold px-2 py-1" style={{ fontSize: '11.5px' }}>
                        {student.tasksCompleted} Tasks
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-warning bg-opacity-10 text-warning fw-bold px-2 py-1" style={{ fontSize: '11.5px' }}>
                        {pendingTasksCount} Pending
                      </span>
                    </td>

                    {/* Overall Progress */}
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold" style={{ color: 'var(--crm-purple)', fontSize: '12.5px' }}>
                          {student.progress}%
                        </span>
                        <div className="crm-progress-track" style={{ width: '60px', height: '6px' }}>
                          <div
                            className={`crm-progress-fill ${student.progress === 100 ? 'success' : ''}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Attendance % */}
                    <td>
                      <span className="fw-semibold text-dark" style={{ fontSize: '12.5px' }}>
                        {student.attendance}%
                      </span>
                    </td>

                    {/* Internship Completion % */}
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark" style={{ fontSize: '12.5px' }}>
                          {internshipCompletionPct}%
                        </span>
                        <div className="crm-progress-track" style={{ width: '60px', height: '6px' }}>
                          <div
                            className={`crm-progress-fill ${internshipCompletionPct === 100 ? 'success' : 'navy'}`}
                            style={{ width: `${internshipCompletionPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-light border p-1.5 text-secondary"
                        onClick={() => onOpenStudentProfile(student)}
                        title="View Complete 7-Tab Profile"
                      >
                        <Eye size={14} />
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

export default CRMProgressPage;
