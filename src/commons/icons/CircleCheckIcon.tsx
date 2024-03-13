import React from 'react';

type Props = {
  classNames?: string;
};
const CircleCheckIcon = (props: Props) => {
  const { classNames = 'w-4 h-4' } = props;
  return (
    <svg viewBox="0 0 32 32" className={classNames}>
      <linearGradient
        x1="16"
        x2="16"
        y1="2.888"
        y2="29.012"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#36eb69" />
        <stop offset="1" stopColor="#1bbd49" />
      </linearGradient>
      <circle cx="16" cy="16" r="13" fill="url(#ONeHyQPNLkwGmj04dE6Soa)" />
      <linearGradient
        x1="16"
        x2="16"
        y1="3"
        y2="29"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopOpacity=".02" />
        <stop offset="1" stopOpacity=".15" />
      </linearGradient>
      <path
        fill="url(#ONeHyQPNLkwGmj04dE6Sob)"
        d="M16,3.25c7.03,0,12.75,5.72,12.75,12.75 S23.03,28.75,16,28.75S3.25,23.03,3.25,16S8.97,3.25,16,3.25 M16,3C8.82,3,3,8.82,3,16s5.82,13,13,13s13-5.82,13-13S23.18,3,16,3 L16,3z"
      />
      <g opacity=".2">
        <linearGradient
          x1="16.502"
          x2="16.502"
          y1="11.26"
          y2="20.743"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopOpacity=".1" />
          <stop offset="1" stopOpacity=".7" />
        </linearGradient>
        <path
          fill="url(#ONeHyQPNLkwGmj04dE6Soc)"
          d="M21.929,11.26 c-0.35,0-0.679,0.136-0.927,0.384L15,17.646l-2.998-2.998c-0.248-0.248-0.577-0.384-0.927-0.384c-0.35,0-0.679,0.136-0.927,0.384 c-0.248,0.248-0.384,0.577-0.384,0.927c0,0.35,0.136,0.679,0.384,0.927l3.809,3.809c0.279,0.279,0.649,0.432,1.043,0.432 c0.394,0,0.764-0.153,1.043-0.432l6.813-6.813c0.248-0.248,0.384-0.577,0.384-0.927c0-0.35-0.136-0.679-0.384-0.927 C22.608,11.396,22.279,11.26,21.929,11.26L21.929,11.26z"
        />
      </g>
      <path
        fill="#fff"
        d="M10.325,14.825L10.325,14.825c0.414-0.414,1.086-0.414,1.5,0L15,18l6.179-6.179 c0.414-0.414,1.086-0.414,1.5,0l0,0c0.414,0.414,0.414,1.086,0,1.5l-6.813,6.813c-0.478,0.478-1.254,0.478-1.732,0l-3.809-3.809 C9.911,15.911,9.911,15.239,10.325,14.825z"
      />
    </svg>
  );
};

export default CircleCheckIcon;
