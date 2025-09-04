import React from 'react';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'secondary', children, className, ...rest }: Props) {
  return (
    <button
      className={clsx('btn', variant === 'primary' && 'btn--primary', className)}
      {...rest}
    >
      {children}
    </button>
  );
}