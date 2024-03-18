import React from 'react';

type Props = {
  classNames?: string;
};
const VerveCard = (props: Props) => {
  const { classNames = 'w-5 h-5' } = props;
  return (
    <svg className={classNames} viewBox="0 -139.5 750 750">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="verve" fill-rule="nonzero">
          <rect
            id="Rectangle-path"
            fill="#00425F"
            x="0"
            y="0"
            width="750"
            height="471"
            rx="40"
          ></rect>
          <circle
            id="Oval"
            fill="#EE312A"
            cx="156.26347"
            cy="215.5"
            r="115.26347"
          ></circle>
          <path
            d="M156.26347,264.87251 C130.48369,206.43174 111.57857,151.84021 111.57857,151.84021 L72.05384,151.84021 C72.05384,151.84021 96.11071,221.91184 140.79561,309.54065 L171.73134,309.54065 C216.41624,221.91184 240.47311,151.84021 240.47311,151.84021 L200.94837,151.84021 C200.94837,151.84021 182.04325,206.43174 156.26347,264.87251 Z"
            id="Shape"
            fill="#FFFFFF"
          ></path>
          <path
            d="M708.04515,257.60566 L630.71641,257.60566 C630.71641,257.60566 632.43441,283.3869 666.80307,283.3869 C683.98685,283.3869 701.17192,278.22677 701.17192,278.22677 L704.60925,305.72097 C704.60925,305.72097 687.42418,312.59491 663.36588,312.59491 C628.99845,312.59491 598.06688,295.41041 598.06688,247.29525 C598.06688,209.48978 622.12375,185.4322 656.4926,185.4322 C708.04515,185.4322 711.48248,236.98469 708.04515,257.60566 Z M654.77471,209.48978 C632.43436,209.48978 630.71641,233.54736 630.71641,233.54736 L678.83158,233.54736 C678.83158,233.54736 677.11363,209.48978 654.77471,209.48978 Z"
            id="Shape"
            fill="#FFFFFF"
          ></path>
          <path
            d="M442.3337,216.74823 L447.48884,189.25332 C447.48884,189.25332 407.67636,177.17202 375.31538,199.56388 L375.31538,309.54067 L409.68552,309.54067 L409.68281,220.18485 C423.42925,209.87443 442.3337,216.74823 442.3337,216.74823 Z"
            id="Shape"
            fill="#FFFFFF"
          ></path>
          <path
            d="M348.41613,257.60566 L271.08739,257.60566 C271.08739,257.60566 272.80539,283.3869 307.17405,283.3869 C324.35783,283.3869 341.54148,278.22677 341.54148,278.22677 L344.97881,305.72097 C344.97881,305.72097 327.79517,312.59491 303.73687,312.59491 C269.36802,312.59491 238.43649,295.41041 238.43649,247.29525 C238.43649,209.48978 262.49479,185.4322 296.86364,185.4322 C348.41613,185.4322 351.852,236.98469 348.41613,257.60566 Z M295.14426,209.48978 C272.80534,209.48978 271.08739,233.54736 271.08739,233.54736 L319.20256,233.54736 C319.20256,233.54736 317.4846,209.48978 295.14426,209.48978 Z"
            id="Shape"
            fill="#FFFFFF"
          ></path>
          <path
            d="M525.80355,268.32373 C515.12048,242.341853 506.501709,215.55843 500.02729,188.22223 L465.66129,188.22677 C465.66129,188.22677 482.845,254.57171 512.05993,309.5462 L539.54717,309.5462 C568.76212,254.57171 585.94581,188.239 585.94581,188.239 L551.57981,188.239 C545.103957,215.569341 536.48521,242.34708 525.80355,268.32373 Z"
            id="Shape"
            fill="#FFFFFF"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default VerveCard;