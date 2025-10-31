import React from 'react';
import clsx from 'clsx';

export const Alert = ({
  children,
  variant = 'info',
  dismissible = false,
  onClose,
  className
}) => {
  const classes = clsx(
    'alert',
    `alert-${variant}`,
    {
      'alert-dismissible': dismissible
    },
    className
  );

  return (
    <div className={classes} role="alert">
      {children}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
};

export default Alert;