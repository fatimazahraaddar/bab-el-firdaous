import React from 'react';

export default function ListItem({ 
  icon = '', 
  title = '', 
  subtitle = '', 
  badge = '', 
  onClick = () => {}, 
  action = null,
  className = '' 
}) {
  return (
    <div className={`list-item ${className}`.trim()} onClick={onClick}>
      {icon && <span className="list-item-icon">{icon}</span>}
      <div className="list-item-content">
        {title && <div className="list-item-title">{title}</div>}
        {subtitle && <div className="list-item-subtitle">{subtitle}</div>}
      </div>
      {badge && <span className="list-item-badge">{badge}</span>}
      {action && <div className="list-item-action">{action}</div>}
    </div>
  );
}
