import React from 'react';
type Props = {
  classNames?: string;
};
const CheckIcon = (props: Props) => {
  const { classNames = 'h-4 w-4' } = props;
  return (
    <svg className={classNames} fill="currentColor" viewBox="0 0 52 52">
      <g>
        <path d="M19.1,42.5L2.6,25.9c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0L19.4,34c0.4,0.4,1.1,0.4,1.5,0 L45.2,9.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L21.3,42.5C20.7,43.2,19.7,43.2,19.1,42.5z" />
      </g>
    </svg>
  );
};

export default CheckIcon;
