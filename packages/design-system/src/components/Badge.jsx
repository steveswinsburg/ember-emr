import React from 'react';
import clsx from 'clsx';

export const Badge = ({
  children,
  variant = 'primary',
  className,
  pill = false
}) => {
  const classes = clsx(
    'badge',
    `bg-${variant}`,
    {
      'rounded-pill': pill
    },
    className
  );

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Status-specific badge components for EMR
export const StatusBadge = ({
  status,
  children,
  className
}) => {
  const variantMap = {
    active: 'success',
    inactive: 'secondary',
    pending: 'warning',
    completed: 'info',
    cancelled: 'danger',
    draft: 'warning'
  };

  return (
    <Badge variant={variantMap[status]} className={className}>
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default Badge;