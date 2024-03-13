'use client';
import React from 'react';

type CheckProps = {
  className?: string;
  strokeWidth?: number;
};
const Check = (props: CheckProps) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={props.strokeWidth || 1.5}
    stroke="currentColor"
    className={props.className || 'w-6 h-6'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

type Props = {
  getValue: (state: boolean) => void;
  value: boolean;
};

const RadioCheckbox = (props: Props) => {
  return (
    <button
      onClick={() => {
        props.getValue(true);
      }}
      className="flex items-center justify-center w-5 h-5 rounded text-content-normal border-2 border-content-normal/75 cursor-pointer"
    >
      {props.value && <Check strokeWidth={3} />}
    </button>
  );
};

export default RadioCheckbox;
