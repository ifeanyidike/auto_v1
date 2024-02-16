import React from 'react';

type Props = {
  width?: string;
  viewBox?: string;
  fillColor?: string;
  className?: string;
  
};

const OpenLeftIcon = (props: Props) => {
  const {
    className = 'w-5',
    viewBox = '0 0 24 24',
    fillColor = 'currentColor',
  } = props;
  return (
    <svg viewBox={viewBox} fill={fillColor} className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.59 6.47a.75.75 0 0 0-1.06 0l-5.06 5a.75.75 0 0 0 0 1.06l5.06 5a.75.75 0 0 0 1.05-1.06l-3.76-3.72H21a.75.75 0 0 0 0-1.5H9.82l3.76-3.72c.3-.29.3-.76 0-1.06Z"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3.25a.75.75 0 0 0-.75.75v16a.75.75 0 0 0 1.5 0V4A.75.75 0 0 0 3 3.25Z"
      ></path>
    </svg>
  );
};

export default OpenLeftIcon;
