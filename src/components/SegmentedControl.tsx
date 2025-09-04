import React from 'react';
import clsx from 'clsx';

export interface SegmentOption {
  id: string;
  label: string;
}

interface Props {
  options: SegmentOption[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
}

export default function SegmentedControl({ options, value, onChange, ariaLabel }: Props) {
  return (
    <div className="segmented" role="group" aria-label={ariaLabel}>
      {options.map(opt => (
        <button
          key={opt.id}
          type="button"
            className={clsx('segmented__btn')}
          aria-pressed={opt.id === value}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}