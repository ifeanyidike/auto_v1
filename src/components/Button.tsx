import React from 'react';

type Props = {
  text: string;
  bgColor?: string;
  hasGradient?: boolean;
  hasShadow?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  shadowColor?: string;
  width?: string;
  onClick?: () => void;
};
const Button = (props: Props) => {
  const {
    bgColor = 'bg-yellow',
    hasGradient = false,
    hasShadow = false,
    shadowColor = '',
    width = '',
    gradientStart = 'from-red-1',
    gradientEnd = 'to-red-2',
  } = props;
  return (
    <button
      onClick={props.onClick && props.onClick}
      className={`${bgColor} rounded-3xl ${
        hasGradient ? 'bg-gradient-to-l' : ''
      } ${gradientStart} px-9 py-3 text-sm font-bold text-white ${
        hasShadow ? 'shadow-right-bottom-md transition-shadow' : ''
      } ${shadowColor}  ${width} hover:${gradientEnd} duration-300 hover:shadow-none active:shadow-none`}
    >
      {props.text}
    </button>
  );
};

export default Button;
