import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';

const CRMPaymentsPage = () => {
  const { payments, students, courses, addPayment, metrics } = useCRM();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // New Payment Form
  const [paymentForm, setPaymentForm] = useState({
    studentId: students[0]?.id || '',
    course: 'Full Stack Development',
    courseFee: 35000,
    amountPaid: 35000,
    paymentDate: new Date().toISOString().split('T')[0],
    method: 'UPI / NetBanking',
    paymentStatus: 'Paid'
  });

  const statuses = ['All', 'Paid', 'Pending', 'Partially Paid', 'Failed'];

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchSearch =
        p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = selectedStatus === 'All' || p.paymentStatus === selectedStatus;
      const matchCourse = selectedCourse === 'All' || p.course === selectedCourse;
      return matchSearch && matchStatus && matchCourse;
    });
  }, [payments, searchTerm, selectedStatus, selectedCourse]);

  const totalCollected = payments.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);
  const totalPending = payments.reduce((acc, curr) => acc + (curr.pendingAmount || 0), 0);

  const handleExportCSV = () => {
    const headers = 'TransactionID,StudentID,StudentName,Course,CourseFee,AmountPaid,PendingAmount,PaymentDate,PaymentStatus,Method\n';
    const rows = filteredPayments.map(p =>
      `"${p.id}","${p.studentId}","${p.studentName}","${p.course}",${p.courseFee},${p.amountPaid},${p.pendingAmount},"${p.paymentDate}","${p.paymentStatus}","${p.method}"\n`
    ).join('');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AR_IT_COMPANY_Payments_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCreatePayment = (e) => {
    e.preventDefault();
    const matched = students.find(s => s.id === paymentForm.studentId) || students[0];
    addPayment({
      studentId: matched.id,
      studentName: matched.name,
      course: paymentForm.course,
      courseFee: paymentForm.courseFee,
      amountPaid: paymentForm.amountPaid,
      paymentDate: paymentForm.paymentDate,
      paymentStatus: paymentForm.paymentStatus,
      method: paymentForm.method
    });
    setShowPaymentModal(false);
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Payment Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Monitor tuition invoices, verified transaction receipts, pending balances, and fee schedules
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="crm-btn crm-btn-outline crm-btn-sm"
            onClick={handleExportCSV}
          >
            <Download size={14} />
            <span>Generate Payment Report</span>
          </button>
          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={() => setShowPaymentModal(true)}
          >
            <Plus size={14} />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="crm-stat-card success py-3">
            <div>
              <div className="crm-stat-label">Total Fee Collected</div>
              <div className="crm-stat-value text-success fs-3">
                ₹{totalCollected.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-success">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="crm-stat-card warning py-3">
            <div>
              <div className="crm-stat-label">Outstanding Receivables</div>
              <div className="crm-stat-value text-warning fs-3">
                ₹{totalPending.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-warning">
              <Clock size={22} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="crm-stat-card navy py-3">
            <div>
              <div className="crm-stat-label">Transactions Processed</div>
              <div className="crm-stat-value fs-3" style={{ color: 'var(--crm-navy)' }}>
                {payments.length} Receipts
              </div>
            </div>
            <div className="crm-stat-icon-wrapper crm-stat-icon-navy">
              <FileText size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="crm-card mb-4 p-0">
        <div className="p-3 bg-light border-bottom">
          <div className="row g-2">
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search student, student ID, transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div className="col-6 col-md-4">
              <select
                className="form-select bg-white"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="All">All Courses</option>
                {courses.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                {statuses.map((st, idx) => (
                  <option key={idx} value={st}>
                    {st === 'All' ? 'All Payment Statuses' : st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Records Table */}
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Course Name</th>
                <th>Course Fee</th>
                <th>Amount Paid</th>
                <th>Pending Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    <AlertCircle size={32} className="mb-2 text-warning" />
                    <p className="mb-0 fw-semibold">No payment records found.</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map(pay => (
                  <tr key={pay.id}>
                    <td>
                      <strong className="text-dark d-block" style={{ fontSize: '12.5px' }}>
                        {pay.id}
                      </strong>
                      <span className="text-muted" style={{ fontSize: '11px' }}>
                        {pay.method}
                      </span>
                    </td>

                    <td>
                      <strong className="text-dark" style={{ fontSize: '13px' }}>
                        {pay.studentName}
                      </strong>
                    </td>

                    <td>
                      <span className="badge px-2 py-1 text-white" style={{ backgroundColor: 'var(--crm-navy)', fontSize: '10px' }}>
                        {pay.studentId}
                      </span>
                    </td>

                    <td style={{ fontSize: '12.5px' }}>{pay.course}</td>

                    <td style={{ fontSize: '12.5px' }}>
                      ₹{pay.courseFee?.toLocaleString('en-IN')}
                    </td>

                    <td>
                      <strong className="text-success" style={{ fontSize: '13px' }}>
                        ₹{pay.amountPaid?.toLocaleString('en-IN')}
                      </strong>
                    </td>

                    <td>
                      <span className={`fw-semibold ${pay.pendingAmount > 0 ? 'text-warning' : 'text-muted'}`} style={{ fontSize: '12.5px' }}>
                        ₹{pay.pendingAmount?.toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td style={{ fontSize: '12px' }}>{pay.paymentDate}</td>

                    <td>
                      <span
                        className={`crm-badge ${
                          pay.paymentStatus === 'Paid' ? 'crm-badge-paid' :
                          pay.paymentStatus === 'Partially Paid' ? 'crm-badge-partial' :
                          pay.paymentStatus === 'Failed' ? 'crm-badge-failed' : 'crm-badge-pending'
                        }`}
                        style={{ fontSize: '10.5px' }}
                      >
                        {pay.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowPaymentModal(false)}>
          <div className="crm-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Record Tuition Payment
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowPaymentModal(false)} />
            </div>

            <form onSubmit={handleCreatePayment}>
              <div className="crm-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Student</label>
                  <select
                    className="form-select"
                    value={paymentForm.studentId}
                    onChange={(e) => {
                      const sid = e.target.value;
                      const matched = students.find(s => s.id === sid);
                      setPaymentForm({
                        ...paymentForm,
                        studentId: sid,
                        course: matched ? matched.course : paymentForm.course,
                        courseFee: matched ? matched.totalFee : paymentForm.courseFee
                      });
                    }}
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.id}) - {s.course}</option>
                    ))}
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Course Fee (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={paymentForm.courseFee}
                      onChange={(e) => setPaymentForm({ ...paymentForm, courseFee: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Amount Paid (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={paymentForm.amountPaid}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amountPaid: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Payment Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={paymentForm.paymentDate}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Payment Status</label>
                    <select
                      className="form-select"
                      value={paymentForm.paymentStatus}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paymentStatus: e.target.value })}
                    >
                      <option value="Paid">Paid (Full)</option>
                      <option value="Partially Paid">Partially Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentForm.method}
                    onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  >
                    <option value="UPI / Razorpay">UPI / Razorpay</option>
                    <option value="NetBanking / NEFT">NetBanking / NEFT</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                  </select>
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  <CreditCard size={14} />
                  <span>Save Payment Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMPaymentsPage;
