import React from 'react';

export default function Modal({ isOpen, title, children, actions, onClose, size = 'md', className = '' }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content modal-${size} ${className}`.trim()} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {actions && <div className="modal-footer">{actions}</div>}
      </div>
    </div>
  );
}
