import React from "react";

type Props = {
  text: string;
  lineColor?: string;
};
const LeftDashText = (props: Props) => {
  const { lineColor = "border-content-light", text } = props;
  return (
    <div className="flex items-center space-x-2">
      <div className={`${lineColor} w-[50px] border`}></div>
      <p className="text-sm capitalize">{text}</p>
    </div>
  );
};

export default LeftDashText;
