import React, { useRef } from 'react';
import { useCRM } from '../context/CRMContext';
import { Award, Download, Printer, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';

const CRMCertificatePreview = ({ certData, onSelectAnother }) => {
  const { selectedCertificate, certificates } = useCRM();
  const cert = certData || selectedCertificate || certificates[0];

  const printCertRef = useRef(null);

  // Trigger professional print / PDF download
  const handleDownloadPDF = () => {
    const printContent = document.getElementById('printable-certificate-document');
    if (!printContent) return;

    // Create a dedicated print window
    const win = window.open('', '_blank', 'width=1100,height=800');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate of Completion - ${cert.studentName} - Incredible AI Solutions</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Times New Roman', Georgia, serif;
              background: #ffffff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .cert-container {
              width: 100%;
              max-width: 1000px;
              margin: 0 auto;
              padding: 24px;
              box-sizing: border-box;
            }
            .cert-outer {
              border: 4px double #312e81;
              padding: 10px;
              border-radius: 4px;
            }
            .cert-inner {
              border: 1.5px solid #d97706;
              padding: 36px 40px;
              background: #fffdfa;
              text-align: center;
              position: relative;
            }
            .cert-logo {
              font-size: 26px;
              font-weight: bold;
              color: #1e1b4b;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 6px;
            }
            .cert-heading {
              font-size: 40px;
              font-weight: 700;
              color: #312e81;
              letter-spacing: 4px;
              text-transform: uppercase;
              margin: 14px 0 6px;
            }
            .cert-subtitle {
              font-size: 13px;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: #64748b;
              font-weight: bold;
            }
            .cert-pre {
              font-size: 16px;
              font-style: italic;
              color: #64748b;
              margin: 22px 0 8px;
            }
            .cert-name {
              font-size: 36px;
              font-weight: bold;
              color: #1e1b4b;
              border-bottom: 2px solid #c7d2fe;
              display: inline-block;
              padding: 0 40px 6px;
              margin-bottom: 18px;
            }
            .cert-text {
              font-size: 16px;
              line-height: 1.7;
              color: #334155;
              max-width: 720px;
              margin: 0 auto 24px;
            }
            .cert-footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 36px;
            }
            .sig-block {
              width: 220px;
              text-align: center;
            }
            .sig-font {
              font-family: 'Brush Script MT', cursive, sans-serif;
              font-size: 30px;
              color: #1e1b4b;
            }
            .sig-line {
              border-top: 1.5px solid #1e293b;
              margin: 4px 0;
            }
            .sig-name {
              font-size: 13px;
              font-weight: bold;
            }
            .sig-role {
              font-size: 11px;
              color: #64748b;
            }
            .gold-seal-svg {
              width: 90px;
              height: 90px;
            }
          </style>
        </head>
        <body>
          <div class="cert-container">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="crm-card mb-4">
      <div className="crm-card-header flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div>
          <h2 className="crm-card-title">
            <Award size={18} className="text-primary" />
            <span>Official Certificate Preview</span>
            <span className="badge bg-success bg-opacity-10 text-success ms-2" style={{ fontSize: '11px' }}>
              <ShieldCheck size={12} className="me-1 d-inline" />
              Verified Authenticity
            </span>
          </h2>
          <div className="crm-card-subtitle">
            Tamper-proof verifiable digital credentials issued by Incredible AI Solutions
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={handleDownloadPDF}
          >
            <Download size={15} />
            <span>Download Certificate (PDF)</span>
          </button>
        </div>
      </div>

      {/* Realistic Printable Certificate Document */}
      <div className="d-flex justify-content-center py-2" style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '24px' }}>
        <div id="printable-certificate-document" className="crm-certificate-paper" ref={printCertRef}>
          <div className="crm-cert-border-outer">
            <div className="crm-cert-border-inner">
              {/* Background Watermark */}
              <svg className="crm-cert-watermark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="6,4" />
                <path d="M 70 100 L 90 120 L 130 80" fill="none" stroke="#6366f1" strokeWidth="12" strokeLinecap="round" />
              </svg>

              {/* Certificate Header */}
              <div className="crm-cert-header">
                <div className="crm-cert-logo-container">
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <Sparkles size={24} />
                  </div>
                  <div className="crm-cert-company">Incredible AI Solutions</div>
                </div>

                <div className="crm-cert-subtitle">Premier Center for Advanced IT Training & Enterprise Internships</div>
                <div className="crm-cert-title">Certificate of Completion</div>
              </div>

              {/* Recipient Details */}
              <div className="crm-cert-recipient-pre">This is proudly and officially conferred upon</div>
              <div className="crm-cert-recipient-name">{cert.studentName}</div>

              {/* Statement */}
              <div className="crm-cert-statement">
                for exceptionally rigorous and satisfactory completion of the intensive specialization program in{' '}
                <span className="crm-cert-course-badge">{cert.courseName}</span>.
                The recipient has fulfilled all academic capstone projects, demonstrated software mastery in{' '}
                <em>{cert.skills || 'production software development and algorithmic workflows'}</em>,
                and graduated with the honor of <strong>{cert.grade || 'Distinction'}</strong>.
              </div>

              {/* Duration and Date Details */}
              <div className="d-flex justify-content-center gap-4 text-muted mb-4" style={{ fontSize: '13px' }}>
                <div><strong>Duration:</strong> {cert.duration}</div>
                <div>•</div>
                <div><strong>Award Date:</strong> {cert.completionDate}</div>
              </div>

              {/* Certificate Footer with Signatures & Official Gold Seal */}
              <div className="crm-cert-footer">
                {/* Academic Signatory */}
                <div className="crm-cert-signature-block">
                  <div className="crm-cert-signature-img">Dr. Maya Raman</div>
                  <div className="crm-cert-signature-line" />
                  <div className="crm-cert-signatory-name">Dr. Maya Raman, Ph.D.</div>
                  <div className="crm-cert-signatory-role">Director of AI & Academics</div>
                </div>

                {/* Embossed Gold Seal Medallion */}
                <div className="crm-cert-seal-box">
                  <svg className="crm-cert-gold-seal" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" />
                        <stop offset="25%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#fef08a" />
                        <stop offset="75%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                      <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#78350f" floodOpacity="0.4" />
                      </filter>
                    </defs>

                    {/* Ribbon Tails */}
                    <path d="M 35 70 L 25 96 L 40 88 L 48 96 Z" fill="#b45309" />
                    <path d="M 65 70 L 75 96 L 60 88 L 52 96 Z" fill="#92400e" />

                    {/* Outer Star / Scallop Seal */}
                    <circle cx="50" cy="50" r="38" fill="url(#goldGradient)" filter="url(#sealShadow)" stroke="#d97706" strokeWidth="1" />
                    <circle cx="50" cy="50" r="33" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3,2" />
                    <circle cx="50" cy="50" r="26" fill="url(#goldGradient)" />

                    {/* Seal Emblem Text */}
                    <text x="50" y="44" fontSize="6" fontWeight="bold" fill="#78350f" textAnchor="middle" letterSpacing="0.8">OFFICIAL SEAL</text>
                    <path d="M 43 51 L 48 56 L 58 46" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="50" y="64" fontSize="5" fontWeight="bold" fill="#78350f" textAnchor="middle">VERIFIED</text>
                  </svg>

                  <div className="crm-cert-id-tag">
                    CODE: {cert.verificationCode || cert.id}
                  </div>
                </div>

                {/* Executive Signatory */}
                <div className="crm-cert-signature-block">
                  <div className="crm-cert-signature-img">V. Singhania</div>
                  <div className="crm-cert-signature-line" />
                  <div className="crm-cert-signatory-name">Vikram Singhania</div>
                  <div className="crm-cert-signatory-role">Founder & Chief Executive Officer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMCertificatePreview;
