import React from 'react';

const Logo = ({ size = 'md', light = false, showTagline = true, className = '' }) => {
  const iconSizes = {
    sm: { box: '36px', font: '15px', radius: '10px' },
    md: { box: '46px', font: '18px', radius: '12px' },
    lg: { box: '58px', font: '24px', radius: '14px' },
    xl: { box: '68px', font: '28px', radius: '16px' }
  };

  const titleSizes = {
    sm: { title: '15px', sub: '10px' },
    md: { title: '19px', sub: '11px' },
    lg: { title: '24px', sub: '12px' },
    xl: { title: '28px', sub: '13px' }
  };

  const { box, font, radius } = iconSizes[size] || iconSizes.md;
  const { title, sub } = titleSizes[size] || titleSizes.md;

  return (
    <div className={`d-flex align-items-center gap-3 text-decoration-none ${className}`}>
      {/* AR IT Corporate Logo Emblem */}
      <div
        className="d-flex align-items-center justify-content-center text-white position-relative overflow-hidden user-select-none"
        style={{
          width: box,
          height: box,
          minWidth: box,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #172554 0%, #7C3AED 55%, #EC9AC7 100%)',
          boxShadow: '0 4px 16px rgba(124, 58, 237, 0.35)',
          border: '1.5px solid rgba(236, 154, 199, 0.5)',
          fontSize: font,
          letterSpacing: '-0.5px',
          fontWeight: 900
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none'
          }}
        />
        <span style={{ textShadow: '0 2px 4px rgba(23, 37, 84, 0.5)' }}>AR</span>
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
          AR IT <span style={{ color: '#7C3AED' }}>COMPANY</span>
        </div>
        {showTagline && (
          <span
            style={{
              fontSize: sub,
              color: light ? '#EC9AC7' : '#7C3AED',
              fontWeight: 600,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginTop: '4px'
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
