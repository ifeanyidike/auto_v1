import React from "react";
import { colors } from "~/colors";

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
    bgColor = colors.yellow,
    hasGradient = false,
    hasShadow = false,
    gradientStart = colors.redOne,
    gradientEnd = colors.redTwo,
  } = props;
  return (
    <button
      style={{
        backgroundColor: bgColor,
      }}
      className={` rounded-3xl ${
        hasGradient ? "bg-gradient-to-l" : ""
      } from-[${gradientStart}] px-9 py-3 text-sm font-bold text-white ${
        hasShadow ? "shadow-right-bottom-md transition-shadow" : ""
      }  duration-300 hover:to-[${gradientEnd}] hover:shadow-none active:shadow-none`}
    >
      {props.text}
    </button>
  );
};

export default Button;
