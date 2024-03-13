import React from 'react';

type Props = {
  classNames?: string;
};
const SuccessIcon = (props: Props) => {
  const { classNames = 'w-60 h-60' } = props;
  return (
    <svg viewBox="0 0 50 50" className={classNames}>
      <circle fill="#25AE88" cx="25" cy="25" r="25" />
      <polyline
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        points="38,15 22,33 12,25 "
      />
    </svg>
  );
};

export default SuccessIcon;
