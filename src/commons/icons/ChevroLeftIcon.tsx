import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const ChevroLeftIcon = (props: Props) => {
  const {
    width = '24',
    height = '24',
    viewBox = '0 0 24 24',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <g id="Iconly/Light/Arrow - Left 2">
        <g id="Arrow - Left 2">
          <path
            id="Stroke 1"
            d="M15.5 19L8.5 12L15.5 5"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default ChevroLeftIcon;
