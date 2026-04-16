import React from 'react';
import classNames from 'classnames';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={classNames('app-btn', `app-btn--${variant}`, `app-btn--${size}`, className)}
      {...props}
    >
      {children}
    </button>
  );
}
