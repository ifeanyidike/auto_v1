import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const SwapIcon = (props: Props) => {
  const {
    width = '20',
    height = '18',
    viewBox = '0 0 20 18',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <path
        d="M14.8395 17.1642V3.54639"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9173 13.068L14.8395 17.1647L10.7617 13.068"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.91127 0.832886V14.4507"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.833496 4.92894L4.91127 0.832275L8.98905 4.92894"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SwapIcon;
