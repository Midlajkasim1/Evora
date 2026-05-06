import React from 'react';

export default function Logo({ className = "", width = "100%", height = "auto", color = "var(--gold)" }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 450 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        <style type="text/css">
          {`
            @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,700&display=swap');
            .logo-text { font-family: 'Bodoni Moda', serif; }
          `}
        </style>
      </defs>

      {/* Main Name: Evora in high-contrast serif */}
      <text 
        x="0" 
        y="80" 
        fill={color} 
        fontSize="95" 
        className="logo-text"
        style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
      >
        Evora
      </text>

      {/* Tagline: your print, simplified in clean sans-serif */}
      <text 
        x="4" 
        y="118" 
        fill={color} 
        fontSize="28" 
        fontFamily="Outfit, sans-serif" 
        fontWeight="400"
        letterSpacing="0.06em"
      >
        your print, simplified
      </text>
    </svg>
  );
}
