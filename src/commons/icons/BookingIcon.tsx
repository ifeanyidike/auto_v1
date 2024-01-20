import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const BookingIcon = (props: Props) => {
  const {
    width = '19',
    height = '20',
    viewBox = '0 0 19 20',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <path
        d="M12.7161 14.2234H5.49609"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7161 10.0369H5.49609"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25109 5.86011H5.49609"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M12.9085 0.749756C12.9085 0.749756 5.23149 0.753756 5.21949 0.753756C2.45949 0.770756 0.750488 2.58676 0.750488 5.35676V14.5528C0.750488 17.3368 2.47249 19.1598 5.25649 19.1598C5.25649 19.1598 12.9325 19.1568 12.9455 19.1568C15.7055 19.1398 17.4155 17.3228 17.4155 14.5528V5.35676C17.4155 2.57276 15.6925 0.749756 12.9085 0.749756Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookingIcon;
