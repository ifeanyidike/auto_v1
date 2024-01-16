import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const ProfileIcon = (props: Props) => {
  const {
    width = '16',
    height = '20',
    viewBox = '0 0 16 20',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.98468 13.3462C4.11707 13.3462 0.814209 13.931 0.814209 16.2729C0.814209 18.6148 4.09611 19.2205 7.98468 19.2205C11.8523 19.2205 15.1542 18.6348 15.1542 16.2938C15.1542 13.9529 11.8733 13.3462 7.98468 13.3462Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.98464 10.0059C10.5227 10.0059 12.5799 7.94779 12.5799 5.40969C12.5799 2.8716 10.5227 0.814453 7.98464 0.814453C5.44655 0.814453 3.38845 2.8716 3.38845 5.40969C3.37988 7.93922 5.42369 9.99731 7.95226 10.0059H7.98464Z"
        stroke={strokeColor}
        strokeWidth={parseInt(strokeWidth) * 0.95}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProfileIcon;
