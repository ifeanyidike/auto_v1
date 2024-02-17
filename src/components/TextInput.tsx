'use client';
import React from 'react';

type Props = {
  placeholder?: string;
  name?: string;
  customStyle?: string;
  getValue?: (e: string) => void;
  prefixSign?: React.ReactNode;
  suffixSign?: React.ReactNode;
  defaultValue?: string;
  isDisabled?: boolean;
};
const TextInput = (props: Props) => {
  const {
    placeholder = '',
    customStyle = '',
    isDisabled = false,
    defaultValue,
    prefixSign,
    suffixSign,
  } = props;
  return (
    <div className="w-full flex">
      {prefixSign && (
        <div className="w-[10%] border border-r-0 box-border border-stone-200 rounded-l-lg flex items-center justify-center bg-slate-100">
          {prefixSign}
        </div>
      )}
      <input
        placeholder={placeholder}
        name={props.name}
        defaultValue={defaultValue}
        disabled={isDisabled}
        className={`text-sm border box-border border-stone-200 ${
          prefixSign && suffixSign
            ? 'w-[80%] outline-none'
            : prefixSign
              ? 'w-[90%] rounded-r-lg outline-none'
              : suffixSign
                ? 'w-90% rounded-l-lg outline-none'
                : 'w-full rounded-lg'
        } px-3 py-3 ${customStyle}`}
        type="text"
        onChange={e => {
          if (props.getValue) {
            props.getValue(e.target.value);
          }
        }}
      />
      {suffixSign && (
        <div className="w-[10%] border border-l-0 box-border border-stone-200 rounded-r-lg flex items-center justify-center bg-slate-100">
          {suffixSign}
        </div>
      )}
    </div>
  );
};

export default TextInput;
