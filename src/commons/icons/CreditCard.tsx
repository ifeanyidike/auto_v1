import React from 'react';

type Props = {
  classNames?: string;
};
const CreditCard = (props: Props) => {
  const { classNames = 'w-5 h-5' } = props;
  return (
    <svg fill="#000000" className={classNames} viewBox="0 0 512 512">
      <g>
        <g>
          <path
            d="M460.8,89.6H51.2C22.921,89.6,0,112.52,0,140.8v230.4c0,28.279,22.921,51.2,51.2,51.2h409.6
			c28.279,0,51.2-22.921,51.2-51.2V140.8C512,112.52,489.079,89.6,460.8,89.6z M486.4,371.2c0,14.114-11.486,25.6-25.6,25.6H51.2
			c-14.114,0-25.6-11.486-25.6-25.6V140.8c0-14.114,11.486-25.6,25.6-25.6h409.6c14.114,0,25.6,11.486,25.6,25.6V371.2z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M332.8,140.8c-29.824,0-56.789,11.682-77.269,30.353C235.17,152.678,208.802,140.8,179.2,140.8
			C115.678,140.8,64,192.478,64,256s51.678,115.2,115.2,115.2c29.602,0,55.97-11.878,76.331-30.353
			c20.48,18.662,47.437,30.353,77.269,30.353c63.522,0,115.2-51.678,115.2-115.2S396.322,140.8,332.8,140.8z M238.592,321.929
			C222.771,336.341,202.249,345.6,179.2,345.6c-49.399,0-89.6-40.201-89.6-89.6s40.201-89.6,89.6-89.6
			c23.049,0,43.571,9.259,59.392,23.671C225.451,208.785,217.6,231.45,217.6,256S225.451,303.215,238.592,321.929z M332.8,345.6
			c-49.399,0-89.6-40.201-89.6-89.6s40.201-89.6,89.6-89.6c49.4,0,89.6,40.201,89.6,89.6S382.2,345.6,332.8,345.6z"
          />
        </g>
      </g>
    </svg>
  );
};

export default CreditCard;