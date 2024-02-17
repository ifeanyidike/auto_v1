import React from 'react';

type Props = {
  classNames?: string;
  strokeWidth?: number;
  strokeColor?: string;
};
const CloseIcon = (props: Props) => {
  const {
    classNames = 'h-6 w-6',
    strokeWidth = 1.5,
    strokeColor = 'currentColor',
  } = props;
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      className={classNames}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export default CloseIcon;
