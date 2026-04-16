import React from 'react';

export default function FormField({ 
  label, 
  type = 'text', 
  placeholder = '', 
  value = '', 
  onChange = () => {}, 
  error = '', 
  required = false,
  id = '',
  icon = '',
  className = ''
}) {
  return (
    <div className={`form-field ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="form-input-wrapper">
        {icon && <span className="form-input-icon">{icon}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'error' : ''} ${icon ? 'with-icon' : ''}`}
        />
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
