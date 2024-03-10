import React from 'react';

type Props = {
  getValue: (state: boolean) => void;
  value: boolean;
};
const RadioButton = (props: Props) => {
  const { value = false } = props;
  return (
    <div
      onClick={() => {
        props.getValue(!value);
      }}
      className={`w-5 h-5 shadow-sm shadow-gray-500 rounded-full cursor-pointer ${
        value ? 'border-[5px] border-blue-600' : 'border border-gray-200'
      }`}
    ></div>
  );
};

export default RadioButton;
