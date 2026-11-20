import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  CreditCard,
  DollarSign,
  Plus,
  Search,
  Download,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const CRMPaymentsPage = () => {
  const { payments, students, recordPayment, metrics } = useCRM();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    studentName: 'Rohan Mehta',
    course: 'AI & Machine Learning',
    amount: 1800,
    method: 'Stripe / Credit Card'
  });

  const handleRecord = (e) => {
    e.preventDefault();
    const matched = students.find(s => s.name === newPayment.studentName) || students[0];
    recordPayment({
      studentId: matched.id,
      studentName: matched.name,
      course: newPayment.course,
      amount: Number(newPayment.amount),
      method: newPayment.method
    });
    setShowPaymentModal(false);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Fee & Payment Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Monitor tuition collections, process course invoices, and review transaction ledgers
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={() => setShowPaymentModal(true)}
        >
          <Plus size={15} />
          <span>Record New Payment</span>
        </button>
      </div>

      {/* KPI Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="crm-card p-4 mb-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '12px' }}>Total Revenue Collected</span>
              <div className="p-2 rounded-2 bg-success bg-opacity-10 text-success">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="fw-bold fs-3 text-dark mb-1">${metrics.totalRevenue.toLocaleString()}</div>
            <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '11px' }}>
              +14.6% vs previous cycle
            </span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="crm-card p-4 mb-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '12px' }}>Pending Receivables</span>
              <div className="p-2 rounded-2 bg-warning bg-opacity-10 text-warning">
                <Clock size={20} />
              </div>
            </div>
            <div className="fw-bold fs-3 text-dark mb-1">$4,800</div>
            <span className="badge bg-warning bg-opacity-10 text-warning fw-bold" style={{ fontSize: '11px' }}>
              3 Partial payment plans active
            </span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="crm-card p-4 mb-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '12px' }}>Invoices Processed</span>
              <div className="p-2 rounded-2 bg-primary bg-opacity-10 text-primary">
                <CreditCard size={20} />
              </div>
            </div>
            <div className="fw-bold fs-3 text-dark mb-1">1,248 Verified</div>
            <span className="badge bg-primary bg-opacity-10 text-primary fw-bold" style={{ fontSize: '11px' }}>
              Automated receipt generation enabled
            </span>
          </div>
        </div>
      </div>

      {/* Payment Transactions Table */}
      <div className="crm-card">
        <div className="crm-card-header">
          <h3 className="crm-card-title">
            <CreditCard size={18} className="text-primary" />
            <span>Recent Payment Transactions</span>
          </h3>
        </div>

        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Invoice</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="font-monospace fw-bold text-primary" style={{ fontSize: '12px' }}>
                      {p.id}
                    </span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{p.studentName}</div>
                    <div className="text-muted font-monospace" style={{ fontSize: '11px' }}>{p.studentId}</div>
                  </td>
                  <td>
                    <span className="badge bg-light text-secondary border" style={{ fontSize: '11px' }}>
                      {p.course}
                    </span>
                  </td>
                  <td>
                    <span className="fw-bold text-success" style={{ fontSize: '13px' }}>
                      ${p.amount.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted" style={{ fontSize: '12px' }}>{p.method}</span>
                  </td>
                  <td>
                    <span className="text-muted" style={{ fontSize: '12px' }}>{p.date}</span>
                  </td>
                  <td>
                    <span className="font-monospace text-secondary" style={{ fontSize: '11px' }}>{p.invoice}</span>
                  </td>
                  <td>
                    <span className="crm-badge active">
                      <CheckCircle size={12} />
                      <span>{p.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowPaymentModal(false)}>
          <div className="crm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '17px', color: '#1e1b4b' }}>
                Record Tuition Payment
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowPaymentModal(false)} />
            </div>
            <form onSubmit={handleRecord}>
              <div className="crm-modal-body">
                <div className="crm-form-group mb-3">
                  <label className="crm-form-label">Student</label>
                  <select
                    className="crm-form-control"
                    value={newPayment.studentName}
                    onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
                  >
                    {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.course})</option>)}
                  </select>
                </div>

                <div className="crm-form-group mb-3">
                  <label className="crm-form-label">Amount ($) *</label>
                  <input
                    type="number"
                    className="crm-form-control"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="crm-form-group mb-3">
                  <label className="crm-form-label">Payment Method</label>
                  <select
                    className="crm-form-control"
                    value={newPayment.method}
                    onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                  >
                    <option value="Stripe / Credit Card">Stripe / Credit Card</option>
                    <option value="UPI / Razorpay">UPI / Razorpay</option>
                    <option value="Bank Wire / ACH">Bank Wire / ACH</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
              </div>
              <div className="crm-modal-footer">
                <button type="button" className="crm-btn crm-btn-outline crm-btn-sm" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                  Confirm & Generate Invoice
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
