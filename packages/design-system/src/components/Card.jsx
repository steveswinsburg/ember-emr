import React from 'react';
import clsx from 'clsx';

export const Card = ({
  children,
  className,
  header,
  footer,
  variant = 'default'
}) => {
  const cardClasses = clsx(
    'card',
    {
      'shadow-sm': variant === 'elevated',
      'border': variant === 'outlined'
    },
    className
  );

  return (
    <div className={cardClasses}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;