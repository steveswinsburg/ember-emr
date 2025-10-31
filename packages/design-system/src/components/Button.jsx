import React from 'react';
import clsx from 'clsx';

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const classes = clsx(
    'btn',
    `btn-${variant}`,
    {
      [`btn-${size}`]: size !== 'md',
      'w-100': fullWidth,
      'disabled': disabled || loading
    },
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      )}
      {children}
    </button>
  );
};

export default Button;