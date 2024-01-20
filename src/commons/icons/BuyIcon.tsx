import React from 'react';
type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
};
const BuyIcon = (props: Props) => {
  const {
    width = '20',
    height = '21',
    viewBox = '0 0 20 21',
    strokeColor = '#212121',
    strokeWidth = '1.5',
    fillColor = 'none',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fillColor}>
      <path
        d="M0.75 1.24988L2.83 1.60988L3.793 13.0829C3.87 14.0199 4.653 14.7389 5.593 14.7359H16.502C17.399 14.7379 18.16 14.0779 18.287 13.1899L19.236 6.63188C19.342 5.89888 18.833 5.21888 18.101 5.11288C18.037 5.10388 3.164 5.09888 3.164 5.09888"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.125 8.7948H14.898"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M5.15435 18.2025C5.45535 18.2025 5.69835 18.4465 5.69835 18.7465C5.69835 19.0475 5.45535 19.2915 5.15435 19.2915C4.85335 19.2915 4.61035 19.0475 4.61035 18.7465C4.61035 18.4465 4.85335 18.2025 5.15435 18.2025Z"
        fill={strokeColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M16.4346 18.2025C16.7356 18.2025 16.9796 18.4465 16.9796 18.7465C16.9796 19.0475 16.7356 19.2915 16.4346 19.2915C16.1336 19.2915 15.8906 19.0475 15.8906 18.7465C15.8906 18.4465 16.1336 18.2025 16.4346 18.2025Z"
        fill={strokeColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BuyIcon;
