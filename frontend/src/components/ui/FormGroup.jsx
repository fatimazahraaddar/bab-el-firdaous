import React from 'react';

export default function FormGroup({ label, children, required = false, className = '' }) {
  return (
    <div className={`form-group ${className}`.trim()}>
      {label && (
        <label className="form-group-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="form-group-content">
        {children}
      </div>
    </div>
  );
}
