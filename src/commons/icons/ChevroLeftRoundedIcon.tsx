import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeBorderColor?: string;
  strokeContentColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const ChevroLeftRoundedIcon = (props: Props) => {
  const {
    width = '24',
    height = '24',
    viewBox = '0 0 24 24',
    strokeBorderColor = '#212121',
    strokeContentColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.75024C6.892 2.75024 2.75 6.89124 2.75 12.0002C2.75 17.1082 6.892 21.2502 12 21.2502C17.108 21.2502 21.25 17.1082 21.25 12.0002C21.25 6.89124 17.108 2.75024 12 2.75024Z"
        stroke={strokeBorderColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4424 8.52905L9.95638 12.0001L13.4424 15.4711"
        stroke={strokeContentColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevroLeftRoundedIcon;
