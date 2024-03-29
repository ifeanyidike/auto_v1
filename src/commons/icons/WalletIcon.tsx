import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const WalletIcon = (props: Props) => {
  const {
    width = '22',
    height = '20',
    viewBox = '0 0 22 20',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <path
        d="M20.6389 12.3957H16.5906C15.1042 12.3948 13.8993 11.1909 13.8984 9.70446C13.8984 8.21801 15.1042 7.01409 16.5906 7.01318H20.6389"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0485 9.64294H16.7369"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.74766 1H15.3911C18.2892 1 20.6388 3.34951 20.6388 6.24766V13.4247C20.6388 16.3229 18.2892 18.6724 15.3911 18.6724H6.74766C3.84951 18.6724 1.5 16.3229 1.5 13.4247V6.24766C1.5 3.34951 3.84951 1 6.74766 1Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.03564 5.5382H11.4346"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WalletIcon;
