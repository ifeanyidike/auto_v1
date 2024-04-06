import React, { useState } from 'react';
import TextInput from './TextInput';

type Props = {
  getValue: (text: string) => void;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  type?: string;
  required?: boolean;
  pattern?: string;
};
const StylishInput = (props: Props) => {
  const { type = 'text' } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`text-sm font-medium flex flex-col pl-3 !py-1 gap-1 text-content-normal/80 border border-[#ebe8e5] rounded ${
        !isFocused ? 'focus-within:border-blue-500' : 'border-[#ebe8e5]'
      } transition-all duration-200 ease-in-out`}
    >
      <span
        className={`text-[10px] py-0 transition-all duration-200 ease-in-out ${
          !isFocused
            ? 'opacity-0 -translate-y-2 absolute'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {props.placeholder}
      </span>

      <TextInput
        type={type}
        required={props.required}
        pattern={props.pattern}
        defaultValue={props.defaultValue}
        value={props.value}
        customStyle={`${
          !isFocused ? '!py-3' : '!py-0'
        } pl-0 text-sm font-light border-0 border-0 border-0 bg-transparent outline-0 rounded-none`}
        placeholder={isFocused ? '' : `${props.placeholder}`}
        getValue={props.getValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default StylishInput;
