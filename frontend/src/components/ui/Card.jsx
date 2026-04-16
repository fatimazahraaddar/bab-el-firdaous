import React from 'react';

export default function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`app-card ${className}`.trim()}>
      {(title || subtitle) && (
        <div className="app-card-header">
          {title && <h2 className="app-card-title">{title}</h2>}
          {subtitle && <p className="app-card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="app-card-body">{children}</div>
    </section>
  );
}
