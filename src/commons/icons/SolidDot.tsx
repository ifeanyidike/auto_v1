import React from "react";

type Props = {
  classNames?: string;
};
const SolidDot = (props: Props) => {
  const { classNames = "h-3 w-3" } = props;
  return (
    <svg className={classNames} viewBox="0 0 18 18">
      <circle cx={9} cy={9} r={4} fill="#494c4e" fillRule="evenodd" />
    </svg>
  );
};

export default SolidDot;
