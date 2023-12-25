import React from "react";

type Props = {
  text: string;
  bgColor?: string;
  hasGradient?: boolean;
  hasShadow?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
};
const Button = (props: Props) => {
  const {
    bgColor = "bg-yellow",
    hasGradient = false,
    hasShadow = false,
  } = props;
  return (
    <button
      className={`${bgColor} rounded-3xl ${
        hasGradient ? "bg-gradient-to-l" : ""
      } from-red-1 px-9 py-3 text-sm font-bold text-white ${
        hasShadow ? "shadow-right-bottom-md transition-shadow" : ""
      }  hover:to-red-2 duration-300 hover:shadow-none active:shadow-none`}
    >
      {props.text}
    </button>
  );
};

export default Button;
