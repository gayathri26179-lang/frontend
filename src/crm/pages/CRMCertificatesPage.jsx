import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import CRMCertificatePreview from '../components/CRMCertificatePreview';
import {
  Award,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle,
  Eye,
  AlertCircle
} from 'lucide-react';

const CRMCertificatesPage = () => {
  const { certificates, students, generateCertificate, showToast } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCert, setActiveCert] = useState(certificates[0] || null);
  const [selectedTheme, setSelectedTheme] = useState('navy'); // 'pink' | 'purple' | 'navy'
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [issueTheme, setIssueTheme] = useState('navy');

  const filteredCerts = certificates.filter(c =>
    c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.studentId && c.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const eligibleStudents = students.filter(s => s.internshipStatus === 'Completed');
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    if (selectedStudent.internshipStatus !== 'Completed') {
      showToast(
        `Cannot issue certificate: ${selectedStudent.name}'s status is "${selectedStudent.internshipStatus}". Only Completed interns are eligible.`,
        'error'
      );
      return;
    }

    const created = generateCertificate(selectedStudent.id, issueTheme);
    if (created) {
      setActiveCert(created);
      setSelectedTheme(issueTheme);
      setShowIssueModal(false);
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: 'var(--crm-navy)' }}>
            Certificate Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Generate, verify, preview, and download cryptographically stamped certificates for AR IT COMPANY graduates
          </p>
        </div>

        <button
          type="button"
          className="crm-btn crm-btn-primary crm-btn-sm"
          onClick={() => {
            const firstEligible = eligibleStudents[0];
            if (firstEligible) setSelectedStudentId(firstEligible.id);
            setShowIssueModal(true);
          }}
        >
          <Plus size={15} />
          <span>Generate Certificate</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="crm-card p-3 mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-8">
            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute text-muted"
                style={{ left: 14, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control ps-5 bg-light"
                placeholder="Search by Student ID (e.g. ARIT-2026-STU01) or Certificate ID (e.g. ARIT-CERT-2026-0101)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '13.5px' }}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 text-md-end text-muted" style={{ fontSize: '12px' }}>
            <ShieldCheck size={14} className="text-success me-1 d-inline" />
            <span>Official AR IT COMPANY Digital Credential Registry</span>
          </div>
        </div>
      </div>

      {/* Certificate Live Preview in Active Theme */}
      {activeCert && (
        <div className="mb-4">
          <CRMCertificatePreview
            cert={activeCert}
            selectedTheme={selectedTheme}
            onThemeChange={(th) => setSelectedTheme(th)}
          />
        </div>
      )}

      {/* Issued Certificates Table */}
      <div className="crm-card p-0 mb-4">
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '15px' }}>
            Issued Certificates Archive ({filteredCerts.length})
          </h3>
          <span className="text-muted" style={{ fontSize: '12px' }}>
            Click "Preview" on any record to view and export
          </span>
        </div>

        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Certificate ID</th>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Course Name</th>
                <th>Internship Duration</th>
                <th>Issue Date</th>
                <th>Theme</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCerts.map((cert) => (
                <tr key={cert.id}>
                  <td>
                    <strong style={{ color: 'var(--crm-navy)', fontSize: '12.5px' }}>
                      {cert.id}
                    </strong>
                  </td>

                  <td>
                    <strong className="text-dark" style={{ fontSize: '13px' }}>
                      {cert.studentName}
                    </strong>
                  </td>

                  <td>
                    <span className="badge px-2 py-0.5 text-white" style={{ backgroundColor: 'var(--crm-navy)', fontSize: '10px' }}>
                      {cert.studentId}
                    </span>
                  </td>

                  <td style={{ fontSize: '12.5px' }}>{cert.courseName}</td>
                  <td style={{ fontSize: '12px' }}>{cert.duration}</td>
                  <td style={{ fontSize: '12px' }}>{cert.issueDate}</td>

                  <td>
                    <span
                      className="badge rounded-pill text-capitalize"
                      style={{
                        backgroundColor: cert.theme === 'pink' ? '#fdf2f7' : cert.theme === 'purple' ? '#f5f0ff' : '#eff6ff',
                        color: cert.theme === 'pink' ? '#db2777' : cert.theme === 'purple' ? '#7045B5' : '#172554',
                        border: `1px solid ${cert.theme === 'pink' ? '#fbcfe8' : cert.theme === 'purple' ? '#ddd6fe' : '#bfdbfe'}`,
                        fontSize: '11px'
                      }}
                    >
                      {cert.theme || 'Navy'}
                    </span>
                  </td>

                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border py-1 px-2.5 text-primary"
                      style={{ fontSize: '12px' }}
                      onClick={() => {
                        setActiveCert(cert);
                        setSelectedTheme(cert.theme || 'navy');
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                    >
                      <Eye size={13} className="me-1" />
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Certificate Modal */}
      {showIssueModal && (
        <div className="crm-modal-backdrop" onClick={() => setShowIssueModal(false)}>
          <div className="crm-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-header">
              <h3 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--crm-navy)' }}>
                Generate Official Certificate
              </h3>
              <button type="button" className="btn-close" onClick={() => setShowIssueModal(false)} />
            </div>

            <form onSubmit={handleIssueSubmit}>
              <div className="crm-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>
                    Select Candidate *
                  </label>
                  <select
                    className="form-select"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id}) &ndash; Status: {s.internshipStatus}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Validation Banner */}
                {selectedStudent && (
                  <div
                    className={`p-3 rounded-3 border mb-3 ${selectedStudent.internshipStatus === 'Completed' ? 'bg-success bg-opacity-10 border-success' : 'bg-warning bg-opacity-10 border-warning'}`}
                  >
                    <div className="d-flex align-items-center gap-2 mb-1">
                      {selectedStudent.internshipStatus === 'Completed' ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <AlertCircle size={16} className="text-warning" />
                      )}
                      <strong style={{ fontSize: '13px' }}>
                        Internship Status: {selectedStudent.internshipStatus}
                      </strong>
                    </div>
                    <div style={{ fontSize: '12px' }} className="text-secondary">
                      {selectedStudent.internshipStatus === 'Completed'
                        ? 'Candidate has satisfied all completion criteria. Ready to generate certificate.'
                        : 'Notice: Candidate has not completed required internship hours. Certificates cannot be generated until the internship is marked as Completed.'}
                    </div>
                  </div>
                )}

                {/* Template Theme Selector */}
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '12.5px' }}>
                    Select Certificate Template Theme
                  </label>
                  <div className="row g-2">
                    {[
                      { id: 'pink', name: '1. Pink Theme', desc: 'Soft Pink (#EC9AC7)', color: '#EC9AC7' },
                      { id: 'navy', name: '2. Navy Blue Theme', desc: 'Corporate (#172554)', color: '#172554' },
                      { id: 'violet', name: '3. Violet Theme', desc: 'Royal Violet (#7C3AED)', color: '#7C3AED' }
                    ].map((th) => (
                      <div key={th.id} className="col-4">
                        <div
                          className={`p-2.5 rounded-3 border text-center ${issueTheme === th.id ? 'border-primary shadow-sm bg-light' : ''}`}
                          style={{ cursor: 'pointer', borderColor: issueTheme === th.id ? th.color : '#e2e8f0' }}
                          onClick={() => setIssueTheme(th.id)}
                        >
                          <div
                            className="rounded-circle mx-auto mb-1"
                            style={{ width: '16px', height: '16px', backgroundColor: th.color }}
                          />
                          <div className="fw-bold" style={{ fontSize: '11px', color: th.color }}>{th.name}</div>
                          <div className="text-muted" style={{ fontSize: '9.5px' }}>{th.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="crm-modal-footer">
                <button
                  type="button"
                  className="crm-btn crm-btn-outline crm-btn-sm"
                  onClick={() => setShowIssueModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedStudent?.internshipStatus !== 'Completed'}
                  className="crm-btn crm-btn-primary crm-btn-sm"
                >
                  <Award size={14} />
                  <span>Issue &amp; Verify Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMCertificatesPage;
