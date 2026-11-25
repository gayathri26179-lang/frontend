import React from 'react';

const Logo = ({ size = 'md', light = false, showTagline = true, className = '' }) => {
  const iconSizes = {
    sm: { box: '34px', font: '15px' },
    md: { box: '44px', font: '18px' },
    lg: { box: '56px', font: '24px' }
  };

  const titleSizes = {
    sm: { title: '15px', sub: '10px' },
    md: { title: '18px', sub: '11px' },
    lg: { title: '24px', sub: '12px' }
  };

  const { box, font } = iconSizes[size] || iconSizes.md;
  const { title, sub } = titleSizes[size] || titleSizes.md;

  return (
    <div className={`d-flex align-items-center gap-3 text-decoration-none ${className}`}>
      {/* AR IT Corporate Logo Icon */}
      <div
        className="d-flex align-items-center justify-content-center text-white fw-extrabold shadow-sm position-relative overflow-hidden"
        style={{
          width: box,
          height: box,
          minWidth: box,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #172554 0%, #7045B5 60%, #E9A4C4 100%)',
          boxShadow: '0 4px 14px rgba(112, 69, 181, 0.35)',
          border: '1.5px solid rgba(233, 164, 196, 0.4)',
          fontSize: font,
          letterSpacing: '-0.5px'
        }}
      >
        <span style={{ fontWeight: 800 }}>AR</span>
      </div>

      <div className="d-flex flex-column justify-content-center lh-1">
        <div
          style={{
            fontWeight: 800,
            fontSize: title,
            letterSpacing: '0.2px',
            color: light ? '#FFFFFF' : '#172554'
          }}
        >
          AR IT <span style={{ color: '#7045B5' }}>COMPANY</span>
        </div>
        {showTagline && (
          <span
            style={{
              fontSize: sub,
              color: light ? '#E9A4C4' : '#64748B',
              fontWeight: 600,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginTop: '3px'
            }}
          >
            Internship &amp; Student CRM
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
