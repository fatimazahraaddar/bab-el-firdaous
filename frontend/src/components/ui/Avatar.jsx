import React from 'react';

export default function Avatar({ src, alt = 'avatar', size = 'md', className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`avatar avatar-${size} ${className}`.trim()}
    />
  );
}
