import React from 'react';

type Props = {
  classNames?: string;
};
const PlusIcon = (props: Props) => {
  const { classNames = 'h-6 w-6' } = props;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={classNames}>
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default PlusIcon;
