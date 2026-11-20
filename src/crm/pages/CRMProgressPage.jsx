import React from 'react';
import { useCRM } from '../context/CRMContext';
import { TrendingUp, Award, CheckCircle, Flame, Star, Trophy } from 'lucide-react';

const CRMProgressPage = ({ onOpenStudentProfile }) => {
  const { students } = useCRM();

  // Sort students by progress for leaderboard
  const sortedStudents = [...students].sort((a, b) => b.progress - a.progress);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Cohort Progress & Student Leaderboard
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Track learning velocity, milestone achievements, and recognized top performers
          </p>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="row g-3 mb-4">
        {sortedStudents.slice(0, 3).map((stu, rank) => (
          <div key={stu.id} className="col-12 col-md-4">
            <div
              className="crm-card text-center p-4 h-100 position-relative overflow-hidden"
              style={{
                borderColor: rank === 0 ? '#fbbf24' : rank === 1 ? '#cbd5e1' : '#f97316',
                borderWidth: '2px'
              }}
            >
              <div
                className="position-absolute top-0 end-0 p-2"
                style={{
                  backgroundColor: rank === 0 ? '#fef3c7' : rank === 1 ? '#f1f5f9' : '#ffedd5',
                  color: rank === 0 ? '#d97706' : rank === 1 ? '#475569' : '#ea580c',
                  borderBottomLeftRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                <Trophy size={14} className="me-1 d-inline" />
                Rank #{rank + 1}
              </div>

              <img
                src={stu.avatar}
                alt={stu.name}
                className="rounded-circle mb-3 shadow"
                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
              />

              <h3 className="fw-bold fs-5 mb-1 text-dark">{stu.name}</h3>
              <div className="text-muted mb-2" style={{ fontSize: '12px' }}>{stu.course}</div>

              <div className="d-flex align-items-center justify-content-center gap-1 text-primary fw-bold fs-4 mb-2">
                <Flame size={20} className="text-danger" />
                <span>{stu.progress}% Mastery</span>
              </div>

              <div className="crm-progress-track mb-3">
                <div className="crm-progress-fill" style={{ width: `${stu.progress}%` }} />
              </div>

              <button
                type="button"
                className="crm-btn crm-btn-secondary crm-btn-sm w-100 justify-content-center"
                onClick={() => onOpenStudentProfile(stu)}
              >
                <span>View Full Profile</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Progress Table */}
      <div className="crm-card">
        <div className="crm-card-header">
          <h3 className="crm-card-title">
            <TrendingUp size={18} className="text-primary" />
            <span>Complete Cohort Velocity Table</span>
          </h3>
        </div>

        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Track</th>
                <th>Tasks Completed</th>
                <th>Progress Velocity</th>
                <th>Attendance</th>
                <th>Milestone Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((s, idx) => (
                <tr key={s.id}>
                  <td>
                    <span className="fw-bold text-muted" style={{ fontSize: '13px' }}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      />
                      <div>
                        <div className="fw-semibold text-dark">{s.name}</div>
                        <div className="text-muted font-monospace" style={{ fontSize: '11px' }}>{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-secondary border" style={{ fontSize: '11px' }}>
                      {s.course}
                    </span>
                  </td>
                  <td>
                    <span className="fw-bold text-dark" style={{ fontSize: '12px' }}>
                      {s.tasksCompleted}/{s.totalTasks}
                    </span>
                  </td>
                  <td style={{ minWidth: '180px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="fw-bold" style={{ fontSize: '12px' }}>{s.progress}%</span>
                      <span className="text-muted" style={{ fontSize: '10px' }}>
                        {s.progress >= 90 ? 'Near Graduation' : 'On Track'}
                      </span>
                    </div>
                    <div className="crm-progress-track">
                      <div className="crm-progress-fill" style={{ width: `${s.progress}%` }} />
                    </div>
                  </td>
                  <td>
                    <span className="fw-semibold text-success" style={{ fontSize: '12px' }}>{s.attendance}%</span>
                  </td>
                  <td>
                    <span className={`crm-badge ${s.progress >= 90 ? 'completed' : 'active'}`}>
                      {s.progress >= 90 ? <Award size={12} /> : <CheckCircle size={12} />}
                      <span>{s.progress >= 90 ? 'Capstone Ready' : 'Active Module'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRMProgressPage;
