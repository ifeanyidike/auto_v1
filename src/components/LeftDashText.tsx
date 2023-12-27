import React from "react";

type Props = {
  text: string;
  textColor: string;
};
const LeftDashText = (props: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-[50px] border border-content-light`}></div>
      <p className="text-sm capitalize">{props.text}</p>
      {/* <div className="w-1/4 border-t border-dashed border-gray-500"></div> */}
    </div>
  );
};

export default LeftDashText;
