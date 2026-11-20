import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import CRMCertificatePreview from '../components/CRMCertificatePreview';
import {
  Award,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Printer,
  Download
} from 'lucide-react';

const CRMCertificatesPage = ({ onGenerateCertModal }) => {
  const { certificates, students, generateCertificate, setSelectedCertificate } = useCRM();

  const [searchCode, setSearchCode] = useState('');
  const [activeCert, setActiveCert] = useState(certificates[0]);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const filteredCerts = certificates.filter(c =>
    c.studentName.toLowerCase().includes(searchCode.toLowerCase()) ||
    c.verificationCode.toLowerCase().includes(searchCode.toLowerCase()) ||
    c.courseName.toLowerCase().includes(searchCode.toLowerCase())
  );

  const handleIssueNew = () => {
    const student = students.find(s => s.id === selectedStudentId);
    if (student) {
      const newCert = generateCertificate(student);
      setActiveCert(newCert);
      setShowIssueModal(false);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Digital Certificate Registry & Verification
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Issue, verify, preview, and download cryptographically stamped certificates for Incredible AI Solutions
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={() => setShowIssueModal(true)}
        >
          <Plus size={15} />
          <span>Issue New Certificate</span>
        </button>
      </div>

      {/* Verification Search Bar */}
      <div className="crm-card p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-8">
            <div className="position-relative">
              <Search size={16} className="position-absolute text-muted" style={{ left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="crm-form-control ps-5"
                placeholder="Search certificate by Student Name, Verification Code (e.g. IAI-2026-9842) or Course..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 text-md-end text-muted" style={{ fontSize: '12px' }}>
            <ShieldCheck size={14} className="text-success me-1 d-inline" />
            <span>All credentials verified against Incredible AI registry</span>
          </div>
        </div>
      </div>

      {/* Active Certificate Preview */}
      {activeCert && (
        <div className="mb-4">
          <CRMCertificatePreview certData={activeCert} />
        </div>
      )}

      {/* Registry Table of Issued Certificates */}
      <div className="crm-card">
        <div className="crm-card-header">
          <h3 className="crm-card-title">
            <Award size={18} className="text-primary" />
            <span>Issued Credentials Archive ({filteredCerts.length})</span>
          </h3>
        </div>

        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Certificate ID</th>
                <th>Student Name</th>
                <th>Specialization Track</th>
                <th>Grade Conferred</th>
                <th>Completion Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCerts.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="font-monospace fw-bold text-primary" style={{ fontSize: '12px' }}>
                      {c.verificationCode}
                    </span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{c.studentName}</div>
                    <div className="text-muted font-monospace" style={{ fontSize: '11px' }}>{c.studentId}</div>
                  </td>
                  <td>
                    <span className="fw-medium text-dark">{c.courseName}</span>
                    <div className="text-muted" style={{ fontSize: '11px' }}>{c.duration}</div>
                  </td>
                  <td>
                    <span className="badge bg-purple bg-opacity-10 text-purple" style={{ color: '#7c3aed', backgroundColor: '#f3e8ff' }}>
                      {c.grade}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted" style={{ fontSize: '12px' }}>{c.completionDate}</span>
                  </td>
                  <td>
                    <span className="crm-badge active">
                      <ShieldCheck size={12} />
                      <span>{c.status}</span>
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="crm-btn crm-btn-secondary crm-btn-sm"
                      onClick={() => {
                        setActiveCert(c);
                        setSelectedCertificate(c);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                    >
                      <span>Preview & PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Modal */}
      {showIssueModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowIssueModal(false)}>
          <div className="crm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '17px', color: '#1e1b4b' }}>
                Confer Official Certificate of Completion
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowIssueModal(false)} />
            </div>
            <div className="crm-modal-body">
              <div className="alert alert-info py-2" style={{ fontSize: '12px' }}>
                Select an eligible student. A tamper-proof verifiable digital certificate with QR seal and dual executive signatures will be generated immediately.
              </div>

              <div className="crm-form-group mb-3">
                <label className="crm-form-label">Select Student</label>
                <select
                  className="crm-form-control"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.course} ({s.progress}% Complete)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="crm-modal-footer">
              <button type="button" className="crm-btn crm-btn-outline crm-btn-sm" onClick={() => setShowIssueModal(false)}>
                Cancel
              </button>
              <button type="button" className="crm-btn crm-btn-primary crm-btn-sm" onClick={handleIssueNew}>
                Generate & Confer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMCertificatesPage;
