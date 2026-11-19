import React from 'react';

const Logo = ({ size = 'md', light = false, showTagline = true, className = '' }) => {
  const iconSizes = {
    sm: { box: '32px', font: '16px' },
    md: { box: '40px', font: '20px' },
    lg: { box: '52px', font: '26px' }
  };

  const titleSizes = {
    sm: 'fs-5',
    md: 'fs-4',
    lg: 'fs-2'
  };

  const { box, font } = iconSizes[size] || iconSizes.md;

  return (
    <div className={`d-flex align-items-center gap-2 text-decoration-none ${className}`}>
      {/* Professional Gradient Blue Shield Icon with Double Checkmark Track */}
      <div
        className="d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
        style={{
          width: box,
          height: box,
          minWidth: box,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12l5 5L20 6" />
          <path d="M9 18l3 3L22 9" opacity="0.65" strokeWidth="2" />
        </svg>
      </div>

      <div className="d-flex flex-column justify-content-center lh-1">
        <div className={`fw-bold tracking-tight ${titleSizes[size]} ${light ? 'text-white' : 'text-dark'}`}>
          Intern<span style={{ color: '#2563eb' }}>Track</span>
        </div>
        {showTagline && (
          <span
            style={{
              fontSize: size === 'sm' ? '10px' : size === 'lg' ? '12px' : '11px',
              color: light ? '#94a3b8' : '#64748b',
              fontWeight: 500,
              letterSpacing: '0.4px',
              marginTop: '2px'
            }}
          >
            Work Smarter Together
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
