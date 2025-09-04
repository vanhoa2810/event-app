import React from 'react';
import clsx from 'clsx';

interface Props {
  type?: 'live' | 'going' | 'default';
  children: React.ReactNode;
  withDot?: boolean;
}

export default function Tag({ type = 'default', children, withDot }: Props) {
  return (
    <span className={clsx('tag', {
      'tag--live': type === 'live',
      'tag--going': type === 'going'
    })}>
      {withDot && <span className="live-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}