import React from 'react';
import clsx from 'clsx';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
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