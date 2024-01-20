import React from 'react';
type Props = {
  // width?: string;
  // height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
  className?: string;
};
const ChevroDownIcon = (props: Props) => {
  const {
    className = 'w-6 h-6',
    viewBox = '0 0 24 24',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg className={className} viewBox={viewBox} fill={fillColor}>
      <g id="Iconly/Light/Arrow - Down 2">
        <g id="Arrow - Down 2">
          <path
            id="Stroke 1"
            d="M19 8.5L12 15.5L5 8.5"
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

export default ChevroDownIcon;
