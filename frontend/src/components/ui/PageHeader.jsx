import React from 'react';

export default function PageHeader({ title, subtitle, actions, className = '' }) {
  return (
    <div className={`page-header ${className}`.trim()}>
      <div>
        {title && <h1 className="page-title">{title}</h1>}
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}
