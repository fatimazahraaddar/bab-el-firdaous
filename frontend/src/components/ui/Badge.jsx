import React from 'react';

export default function Badge({ children, variant = 'primary', size = 'md', className = '' }) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`.trim()}>
      {children}
    </span>
  );
}
