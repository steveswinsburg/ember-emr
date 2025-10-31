import React from 'react';
import clsx from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
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
export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'draft';
  children?: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
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
  } as const;

  return (
    <Badge variant={variantMap[status]} className={className}>
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default Badge;