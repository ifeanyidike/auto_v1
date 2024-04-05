import React from 'react';

type Props = {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  hasGradient?: boolean;
  hasShadow?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  shadowColor?: string;
  width?: string;
  height?: string;
  px?: string;
  py?: string;
  radius?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
  name?: string;
};
const Button = (props: Props) => {
  const {
    bgColor = 'bg-yellow',
    textColor = 'text-white',
    hasGradient = false,
    hasShadow = false,
    shadowColor = '',
    width = '',
    height = '',
    gradientStart = 'from-red-1',
    gradientEnd = 'to-red-2',
    px = 'px-9',
    py = 'py-3',
    radius = 'rounded-3xl',
    isDisabled = false,
    type = 'submit',
  } = props;
  return (
    <button
      disabled={isDisabled}
      type={type}
      name={props.name}
      onClick={props.onClick && props.onClick}
      className={`${bgColor} ${radius} ${
        hasGradient ? 'bg-gradient-to-l' : ''
      } ${gradientStart} ${px} ${py} text-sm font-bold ${textColor} ${
        hasShadow ? 'shadow-right-bottom-md transition-shadow' : ''
      } ${shadowColor}  ${width} ${height} hover:${gradientEnd} duration-300 hover:shadow-none active:shadow-none disabled:opacity-60 disabled:shadow-none`}
    >
      {props.children}
    </button>
  );
};

export default Button;
