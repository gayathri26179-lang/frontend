import React, { useState } from 'react';
import { Award, Download, Printer, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

const CRMCertificatePreview = ({ cert, selectedTheme = 'navy', onThemeChange }) => {
  if (!cert) return null;

  const currentTheme = selectedTheme || cert.theme || 'navy';

  // Theme configuration constants
  const themeStyles = {
    pink: {
      primary: '#db2777',
      borderOuter: '#E9A4C4',
      borderInner: '#f472b6',
      badgeBg: '#fdf2f7',
      bgGradient: 'radial-gradient(circle at center, #ffffff 60%, #fff5f8 100%)',
      titleColor: '#be185d',
      watermarkColor: 'rgba(233, 164, 196, 0.12)'
    },
    purple: {
      primary: '#7045B5',
      borderOuter: '#7045B5',
      borderInner: '#9055e8',
      badgeBg: '#f5f0ff',
      bgGradient: 'radial-gradient(circle at center, #ffffff 60%, #f7f3ff 100%)',
      titleColor: '#582b9e',
      watermarkColor: 'rgba(112, 69, 181, 0.1)'
    },
    navy: {
      primary: '#172554',
      borderOuter: '#172554',
      borderInner: '#d97706', // gold inner trim
      badgeBg: '#eff6ff',
      bgGradient: 'radial-gradient(circle at center, #ffffff 60%, #f0f4ff 100%)',
      titleColor: '#172554',
      watermarkColor: 'rgba(23, 37, 84, 0.08)'
    }
  };

  const currentStyle = themeStyles[currentTheme] || themeStyles.navy;

  const handlePrintOrDownload = () => {
    const win = window.open('', '_blank', 'width=1100,height=850');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>AR IT COMPANY - Official Certificate of Completion - ${cert.studentName}</title>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Cinzel:wght@600;700;900&family=Great+Vibes&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 8mm;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Plus Jakarta Sans', sans-serif;
              background: #ffffff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .cert-box {
              width: 100%;
              max-width: 1020px;
              margin: 0 auto;
              padding: 10px;
              box-sizing: border-box;
            }
            .cert-border-outer {
              border: 10px double ${currentStyle.borderOuter};
              padding: 8px;
              border-radius: 4px;
            }
            .cert-border-inner {
              border: 2px solid ${currentStyle.borderInner};
              padding: 36px 48px;
              background: ${currentStyle.bgGradient};
              text-align: center;
              position: relative;
            }
            .cert-logo {
              font-size: 26px;
              font-weight: 800;
              color: ${currentStyle.titleColor};
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .cert-sub {
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: #64748b;
            }
            .cert-title {
              font-family: 'Cinzel', serif;
              font-size: 36px;
              font-weight: 900;
              color: ${currentStyle.titleColor};
              letter-spacing: 4px;
              margin: 18px 0 6px;
              text-transform: uppercase;
            }
            .cert-for {
              font-size: 14px;
              letter-spacing: 2px;
              text-transform: uppercase;
              color: #64748b;
              font-weight: 600;
              margin-bottom: 14px;
            }
            .cert-recipient {
              font-size: 34px;
              font-weight: 800;
              color: #0f172a;
              border-bottom: 2px solid ${currentStyle.borderOuter};
              display: inline-block;
              padding: 0 40px 6px;
              margin-bottom: 16px;
            }
            .cert-body {
              font-size: 15px;
              line-height: 1.7;
              color: #334155;
              max-width: 760px;
              margin: 0 auto 24px;
            }
            .cert-body strong {
              color: ${currentStyle.titleColor};
            }
            .cert-footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 30px;
              padding-top: 16px;
            }
            .sig-block {
              text-align: center;
              width: 220px;
            }
            .sig-line {
              border-top: 1.5px solid #0f172a;
              margin-top: 40px;
              padding-top: 6px;
              font-size: 12px;
              font-weight: bold;
              color: #0f172a;
            }
            .sig-title {
              font-size: 10.5px;
              color: #64748b;
            }
            .cert-seal {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              border: 3px dashed ${currentStyle.borderOuter};
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              font-size: 10px;
              text-transform: uppercase;
              color: ${currentStyle.primary};
              margin: 0 auto;
            }
            .cert-id-tag {
              font-size: 11px;
              color: #94a3b8;
              margin-top: 12px;
            }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <div class="cert-border-outer">
              <div class="cert-border-inner">
                <div class="cert-logo">AR IT COMPANY</div>
                <div class="cert-sub">Center of Excellence in Software Engineering &amp; IT Training</div>

                <div class="cert-title">Certificate of Internship</div>
                <div class="cert-for">Proudly Presented to</div>

                <div class="cert-recipient">${cert.studentName}</div>

                <div class="cert-body">
                  for successfully completing the rigorous <strong>${cert.courseName}</strong> professional internship program
                  spanning <strong>${cert.duration}</strong> with distinction grade <strong>${cert.grade || 'A+ (Distinction)'}</strong>.
                  Demonstrated exemplary technical mastery, adherence to enterprise Agile coding standards, and delivery of production-grade modules.
                </div>

                <div class="cert-footer">
                  <div class="sig-block">
                    <div style="font-family: 'Great Vibes', cursive; font-size: 26px; color: #1e1b4b;">Maya Raman</div>
                    <div class="sig-line">Dr. Maya Raman</div>
                    <div class="sig-title">Managing Director &bull; AR IT COMPANY</div>
                  </div>

                  <div style="text-align: center;">
                    <div class="cert-seal">
                      AR IT<br/>SEAL
                    </div>
                    <div class="cert-id-tag">
                      Certificate ID: ${cert.id}<br/>
                      Issued Date: ${cert.issueDate}
                    </div>
                  </div>

                  <div class="sig-block">
                    <div style="font-family: 'Great Vibes', cursive; font-size: 26px; color: #1e1b4b;">Rajesh Sharma</div>
                    <div class="sig-line">${cert.technicalLead || 'Rajesh K. Sharma'}</div>
                    <div class="sig-title">Technical Head &bull; Internship Faculty</div>
                  </div>
                </div>
              </div>
            </div>
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
      {/* Top Controls: Theme Selector and Download */}
      <div className="crm-card-header flex-column flex-md-row align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="crm-card-title">
            <Award size={18} style={{ color: currentStyle.primary }} />
            <span>Official Certificate Preview</span>
            <span
              className="badge ms-2"
              style={{ backgroundColor: currentStyle.badgeBg, color: currentStyle.primary, fontSize: '11px' }}
            >
              Verified AR IT Credential
            </span>
          </h2>
          <div className="crm-card-subtitle">
            Authentic internship certificate with security seal, verification ID, and authorized signatures
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Theme Selector Tabs (Pink, Purple, Navy Blue) */}
          <div className="btn-group bg-light p-1 rounded-3 border" role="group">
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-2 ${currentTheme === 'pink' ? 'text-white' : 'text-muted'}`}
              style={{
                backgroundColor: currentTheme === 'pink' ? '#db2777' : 'transparent',
                border: 'none',
                fontSize: '11.5px',
                fontWeight: 600
              }}
              onClick={() => onThemeChange && onThemeChange('pink')}
            >
              Pink Theme
            </button>
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-2 ${currentTheme === 'purple' ? 'text-white' : 'text-muted'}`}
              style={{
                backgroundColor: currentTheme === 'purple' ? '#7045B5' : 'transparent',
                border: 'none',
                fontSize: '11.5px',
                fontWeight: 600
              }}
              onClick={() => onThemeChange && onThemeChange('purple')}
            >
              Purple Theme
            </button>
            <button
              type="button"
              className={`btn btn-sm py-1 px-2.5 rounded-2 ${currentTheme === 'navy' ? 'text-white' : 'text-muted'}`}
              style={{
                backgroundColor: currentTheme === 'navy' ? '#172554' : 'transparent',
                border: 'none',
                fontSize: '11.5px',
                fontWeight: 600
              }}
              onClick={() => onThemeChange && onThemeChange('navy')}
            >
              Navy Blue Theme
            </button>
          </div>

          <button
            type="button"
            className="crm-btn crm-btn-primary crm-btn-sm"
            onClick={handlePrintOrDownload}
          >
            <Download size={14} />
            <span>Download Certificate (PDF)</span>
          </button>
        </div>
      </div>

      {/* Visual Authentic Certificate Canvas */}
      <div className="certificate-preview-wrapper">
        <div
          className={`certificate-sheet theme-${currentTheme}`}
          id="printable-certificate-document"
        >
          {/* Background Watermark */}
          <div className="cert-watermark">AR IT COMPANY</div>

          {/* Top Brand Header */}
          <div className="text-center position-relative z-1 mb-2">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: currentStyle.primary,
                  fontSize: '14px'
                }}
              >
                AR
              </div>
              <h1
                className="fw-bold mb-0"
                style={{
                  fontSize: '22px',
                  letterSpacing: '2px',
                  color: currentStyle.titleColor,
                  textTransform: 'uppercase'
                }}
              >
                AR IT COMPANY
              </h1>
            </div>
            <div
              className="text-muted fw-bold"
              style={{ fontSize: '10.5px', letterSpacing: '2.5px', textTransform: 'uppercase' }}
            >
              Center of Excellence in Software Engineering &amp; IT Training
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center position-relative z-1 my-3">
            <h2
              className="fw-extrabold mb-1"
              style={{
                fontSize: '32px',
                letterSpacing: '3px',
                color: currentStyle.titleColor,
                textTransform: 'uppercase',
                fontFamily: 'serif'
              }}
            >
              Certificate of Internship
            </h2>
            <div
              className="text-muted fw-semibold"
              style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              This is to certify that
            </div>
          </div>

          {/* Recipient Name */}
          <div className="text-center position-relative z-1 mb-3">
            <div
              className="fw-bold d-inline-block"
              style={{
                fontSize: '32px',
                color: '#0f172a',
                borderBottom: `2px solid ${currentStyle.borderOuter}`,
                padding: '0 36px 6px'
              }}
            >
              {cert.studentName}
            </div>
          </div>

          {/* Body Text */}
          <div className="text-center position-relative z-1 mb-4">
            <p
              className="text-secondary mx-auto mb-0"
              style={{ fontSize: '14px', lineHeight: '1.8', maxWidth: '680px' }}
            >
              has successfully fulfilled all academic and practical requirements of the intensive{' '}
              <strong style={{ color: currentStyle.titleColor }}>{cert.courseName}</strong> internship program
              conducted over <strong>{cert.duration}</strong> with an evaluated distinction grade of{' '}
              <strong>{cert.grade || 'A+ (Distinction)'}</strong>.
            </p>
          </div>

          {/* Signatures & Seal Footer */}
          <div className="d-flex align-items-end justify-content-between position-relative z-1 pt-3 border-top">
            {/* Signature 1 */}
            <div className="text-center" style={{ width: '180px' }}>
              <div
                style={{
                  fontFamily: 'cursive',
                  fontSize: '22px',
                  color: currentStyle.primary,
                  lineHeight: '1'
                }}
              >
                Maya Raman
              </div>
              <div
                className="pt-1 mt-1 border-top fw-bold text-dark"
                style={{ fontSize: '11.5px', borderColor: '#0f172a' }}
              >
                Dr. Maya Raman
              </div>
              <div className="text-muted" style={{ fontSize: '10px' }}>
                Managing Director
              </div>
            </div>

            {/* Verified Seal */}
            <div className="text-center">
              <div
                className="rounded-circle d-flex flex-column align-items-center justify-content-center mx-auto mb-1"
                style={{
                  width: '68px',
                  height: '68px',
                  border: `2px dashed ${currentStyle.primary}`,
                  backgroundColor: currentStyle.badgeBg,
                  color: currentStyle.primary
                }}
              >
                <ShieldCheck size={20} />
                <span style={{ fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.5px' }}>
                  VERIFIED
                </span>
              </div>
              <div className="text-muted" style={{ fontSize: '10px' }}>
                Certificate ID: <strong>{cert.id}</strong><br />
                Issued: {cert.issueDate}
              </div>
            </div>

            {/* Signature 2 */}
            <div className="text-center" style={{ width: '180px' }}>
              <div
                style={{
                  fontFamily: 'cursive',
                  fontSize: '22px',
                  color: currentStyle.primary,
                  lineHeight: '1'
                }}
              >
                Rajesh Sharma
              </div>
              <div
                className="pt-1 mt-1 border-top fw-bold text-dark"
                style={{ fontSize: '11.5px', borderColor: '#0f172a' }}
              >
                {cert.technicalLead || 'Rajesh K. Sharma'}
              </div>
              <div className="text-muted" style={{ fontSize: '10px' }}>
                Technical Head &bull; AR IT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMCertificatePreview;
