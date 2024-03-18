'use client';
import React, { useState } from 'react';

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
  size?: string;
};

const CheckBox = (props: Props) => {
  const { size = 'w-5 h-5' } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <button
      onClick={() => {
        props.getValue(!isChecked);
        setIsChecked(!isChecked);
      }}
      className={`flex items-center justify-center ${size} rounded text-content-normal border-2 border-content-normal/75 cursor-pointer`}
    >
      {isChecked && <Check strokeWidth={3} />}
    </button>
  );
};

export default CheckBox;
