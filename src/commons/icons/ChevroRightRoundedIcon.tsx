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
const ChevroRightRoundedIcon = (props: Props) => {
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
        d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z"
        stroke={strokeBorderColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895"
        stroke={strokeContentColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevroRightRoundedIcon;
