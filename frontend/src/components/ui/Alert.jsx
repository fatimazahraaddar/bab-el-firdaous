import React from 'react';

export default function Alert({ type = 'info', title, message, action, onClose, className = '' }) {
  return (
    <div className={`alert alert-${type} ${className}`.trim()}>
      <div className="alert-content">
        {title && <h4 className="alert-title">{title}</h4>}
        {message && <p className="alert-message">{message}</p>}
      </div>
      <div className="alert-actions">
        {action && <button className="alert-action-btn">{action}</button>}
        {onClose && (
          <button className="alert-close-btn" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
