import React from 'react';

export default function Logo({ className = "", width, height }) {
  return (
    <img 
      src="/images/evora-logo.png"
      alt="Evora - Your print, simplified"
      className={className}
      style={{ 
        display: 'block',
        width: width,
        height: height,
        objectFit: 'contain'
      }}
    />
  );
}
