import React from 'react';

export default function TableContainer({ title, children, className = '' }) {
  return (
    <div className={`app-table-container ${className}`.trim()}>
      {title && <div className="app-table-header"><h2>{title}</h2></div>}
      <div className="app-table-body">{children}</div>
    </div>
  );
}
