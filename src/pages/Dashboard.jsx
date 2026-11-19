import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Users,
  Activity,
  CheckSquare,
  Clock,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileText
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const { currentUser, tasks, activities, courses, employees, tickets } = useApp();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const isStaffView = currentUser?.role === 'Staff Member';

  // Statistics
  const totalMembers = employees.length;
  const activeToday = employees.filter(e => e.activeTasks > 0).length;
  const totalActivitiesCount = activities.length;
  const openTasksCount = tasks.filter(t => t.status === 'In Progress' || t.status === 'Pending').length;
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;

  // Staff specific metrics
  const myAssignedTasks = tasks.filter(t => t.assignedTo === currentUser?.name);
  const myCompletedTasks = myAssignedTasks.filter(t => t.status === 'Completed').length;
  const myPendingTasks = myAssignedTasks.filter(t => t.status !== 'Completed').length;
  const myEnrolledCourses = courses.filter(c => c.enrolled);

  // Weekly Activity Chart Data (Recharts)
  const weeklyData = [
    { day: 'Mon', completed: 6, pending: 3 },
    { day: 'Tue', completed: 9, pending: 4 },
    { day: 'Wed', completed: 7, pending: 2 },
    { day: 'Thu', completed: 11, pending: 5 },
    { day: 'Fri', completed: 12, pending: 2 },
    { day: 'Sat', completed: 4, pending: 1 },
    { day: 'Sun', completed: 2, pending: 0 }
  ];

  // Status Pie Data
  const pieData = [
    { name: 'Completed', value: completedTasksCount, color: '#10b981' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, color: '#2563eb' },
    { name: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, color: '#f59e0b' }
  ];

  return (
    <div className="container-fluid p-3 p-lg-4">
      {/* Top Welcome & Actions Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">
            {isStaffView ? `Welcome Back, ${currentUser.name}` : `${currentUser?.role} Executive Dashboard`}
          </h4>
          <p className="text-muted m-0" style={{ fontSize: '13px' }}>
            {isStaffView
              ? 'Here is your daily task checklist, course progress and activity submissions.'
              : 'Real-time overview of cohort performance, daily logs and ticket SLA tracking.'}
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-sm"
            style={{ fontSize: '13px', background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
          >
            <Plus size={16} />
            <span>Create Task</span>
          </button>
          <button
            onClick={() => navigate('/activities')}
            className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold bg-white"
            style={{ fontSize: '13px' }}
          >
            <Activity size={16} />
            <span>Log Activity</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: Dynamic for Admin/Manager vs Staff */}
      {!isStaffView ? (
        /* Reference Image 2: Main / Manager Dashboard Cards */
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Total Members</span>
                  <h2 className="fw-bold text-dark mt-1 mb-0">{totalMembers}</h2>
                </div>
                <div className="p-3 rounded-3 bg-primary bg-opacity-10 text-primary">
                  <Users size={24} />
                </div>
              </div>
              <div className="d-flex align-items-center gap-1 text-success fw-semibold" style={{ fontSize: '12px' }}>
                <TrendingUp size={14} /> +4 enrolled this month
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Active Today</span>
                  <h2 className="fw-bold text-dark mt-1 mb-0">{activeToday}</h2>
                </div>
                <div className="p-3 rounded-3 bg-success bg-opacity-10 text-success">
                  <Clock size={24} />
                </div>
              </div>
              <div className="text-muted" style={{ fontSize: '12px' }}>
                92% cohort participation
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Total Activities</span>
                  <h2 className="fw-bold text-dark mt-1 mb-0">{totalActivitiesCount}</h2>
                </div>
                <div className="p-3 rounded-3 bg-warning bg-opacity-10 text-warning">
                  <Activity size={24} />
                </div>
              </div>
              <div className="text-warning fw-semibold" style={{ fontSize: '12px' }}>
                100% verified timesheets
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Open Tasks</span>
                  <h2 className="fw-bold text-danger mt-1 mb-0">{openTasksCount}</h2>
                </div>
                <div className="p-3 rounded-3 bg-danger bg-opacity-10 text-danger">
                  <CheckSquare size={24} />
                </div>
              </div>
              <div className="text-muted" style={{ fontSize: '12px' }}>
                {completedTasksCount} completed successfully
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reference Image 5: Staff Member Dashboard Cards */
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Tasks Assigned</span>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <h2 className="fw-bold text-dark m-0">{myAssignedTasks.length}</h2>
                <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
                  <CheckSquare size={20} />
                </div>
              </div>
              <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Total cohort milestones</div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Completed Tasks</span>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <h2 className="fw-bold text-success m-0">{myCompletedTasks}</h2>
                <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <div className="text-success fw-semibold mt-2" style={{ fontSize: '12px' }}>✓ Verified by manager</div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>Pending Tasks</span>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <h2 className="fw-bold text-warning m-0">{myPendingTasks}</h2>
                <div className="p-2 rounded-3 bg-warning bg-opacity-10 text-warning">
                  <Clock size={20} />
                </div>
              </div>
              <div className="text-warning fw-semibold mt-2" style={{ fontSize: '12px' }}>Needs completion</div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>My Performance</span>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <h2 className="fw-bold text-primary m-0">94%</h2>
                <div className="p-2 rounded-3 bg-info bg-opacity-10 text-info">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="text-muted mt-2" style={{ fontSize: '12px' }}>Top 5% of cohort</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Charts & Analytics Row */}
      <div className="row g-4 mb-4">
        {/* Weekly Activity Bar Chart (Recharts) */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="fw-bold text-dark m-0">Weekly Activity &amp; Task Deliverables</h6>
                <small className="text-muted">Track completed tasks versus open pending items across days</small>
              </div>
              <span className="badge bg-light text-dark border px-3 py-1">Last 7 Days</span>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="completed" name="Completed Tasks" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pending" name="Pending Items" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Task Status Breakdown Donut Chart */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
            <div>
              <h6 className="fw-bold text-dark m-0">Task Status Distribution</h6>
              <small className="text-muted">Breakdown of all {tasks.length} tracked items</small>
            </div>

            <div style={{ width: '100%', height: 200 }} className="my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="d-flex flex-column gap-2 pt-2 border-top">
              {pieData.map((item) => (
                <div key={item.name} className="d-flex justify-content-between align-items-center" style={{ fontSize: '13px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }}></span>
                    <span className="text-secondary">{item.name}</span>
                  </div>
                  <span className="fw-bold text-dark">{item.value} tasks</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff View: Today's Work Summary & My Courses (Reference 5) */}
      {isStaffView && (
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark m-0">Today's Work Summary</h6>
                <span className="badge bg-success bg-opacity-10 text-success">Logged Active</span>
              </div>
              <div className="p-3 rounded-3 bg-light border mb-3">
                <div className="fw-semibold text-dark mb-1" style={{ fontSize: '14px' }}>
                  Frontend Routing &amp; Daily Activity Tracking
                </div>
                <p className="text-muted m-0" style={{ fontSize: '13px' }}>
                  Constructed React components, integrated localStorage synchronization, and verified employee directory filters.
                </p>
                <div className="d-flex gap-4 mt-3" style={{ fontSize: '12px' }}>
                  <div><strong>Hours Logged:</strong> 8.0 hrs</div>
                  <div><strong>Orders Handled:</strong> 3 orders</div>
                  <div><strong>Status:</strong> <span className="badge bg-success">Approved</span></div>
                </div>
              </div>
              <button onClick={() => navigate('/activities')} className="btn btn-outline-primary btn-sm rounded-3">
                Edit Today's Activity Log →
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark m-0">My Enrolled Courses</h6>
                <button onClick={() => navigate('/my-courses')} className="btn btn-link p-0 text-decoration-none" style={{ fontSize: '13px' }}>
                  View All ({myEnrolledCourses.length})
                </button>
              </div>
              <div className="d-flex flex-column gap-3">
                {myEnrolledCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="d-flex align-items-center gap-3 p-2 rounded-3 border bg-light">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="rounded-2"
                      style={{ width: '56px', height: '48px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-semibold text-dark text-truncate" style={{ fontSize: '13px' }}>{course.title}</div>
                      <div className="progress mt-1" style={{ height: '6px' }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1 text-muted" style={{ fontSize: '11px' }}>
                        <span>{course.completedLessons}/{course.lessonsCount} Lessons</span>
                        <span className="fw-bold text-primary">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Tasks & Updates Table */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-bold text-dark m-0">Recent Tasks &amp; Delegations</h6>
            <small className="text-muted">Live status synchronization across staff members</small>
          </div>
          <button onClick={() => navigate('/tasks')} className="btn btn-outline-primary btn-sm rounded-3">
            View All Tasks ({tasks.length}) →
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: '12px', color: '#64748b' }}>
                <th>TASK ID</th>
                <th>TASK NAME</th>
                <th>ASSIGNED TO</th>
                <th>DUE DATE</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '13px' }}>
              {tasks.slice(0, 5).map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className="fw-bold text-primary font-monospace">{t.id}</span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{t.name}</div>
                    <small className="text-muted">{t.category}</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: '28px', height: '28px', fontSize: '11px' }}
                      >
                        {t.assignedTo.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{t.assignedTo}</span>
                    </div>
                  </td>
                  <td className="text-muted">{t.dueDate}</td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        t.priority === 'Urgent'
                          ? 'bg-danger bg-opacity-10 text-danger'
                          : t.priority === 'High'
                          ? 'bg-warning bg-opacity-10 text-dark'
                          : 'bg-info bg-opacity-10 text-info'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${
                        t.status === 'Completed'
                          ? 'bg-success bg-opacity-10 text-success'
                          : t.status === 'In Progress'
                          ? 'bg-primary bg-opacity-10 text-primary'
                          : 'bg-warning bg-opacity-10 text-warning'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Creation Modal */}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
