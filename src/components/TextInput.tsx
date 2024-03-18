'use client';
import React from 'react';

type Props = {
  placeholder?: string;
  name?: string;
  customStyle?: string;
  customPrefixStyle?: string;
  customSuffixStyle?: string;
  getValue?: (e: string) => void;
  prefixSign?: React.ReactNode;
  suffixSign?: React.ReactNode;
  defaultValue?: string;
  isDisabled?: boolean;
  value?: string;
  type?: string;
  max?: number;
  min?: number;
};
const TextInput = (props: Props) => {
  const {
    placeholder = '',
    customStyle = '',
    customPrefixStyle = '',
    customSuffixStyle = '',
    isDisabled = false,
    defaultValue,
    prefixSign,
    suffixSign,
    type = 'text',
  } = props;
  return (
    <div className="w-full flex">
      {prefixSign && (
        <div
          className={`min-w-[10%] px-2 border border-r-0 box-border border-stone-200 rounded-l-lg flex items-center justify-center bg-slate-100 ${customPrefixStyle}`}
        >
          {prefixSign}
        </div>
      )}
      <input
        placeholder={placeholder}
        name={props.name}
        max={props.max}
        min={props.min}
        defaultValue={defaultValue}
        value={props.value}
        disabled={isDisabled}
        className={`text-sm border box-border border-stone-200 flex-1 ${
          prefixSign && suffixSign
            ? ' outline-none'
            : prefixSign
              ? ' rounded-r-lg outline-none'
              : suffixSign
                ? ' rounded-l-lg outline-none'
                : 'w-full rounded-lg'
        } px-3 py-3 ${customStyle}`}
        type={type}
        onChange={e => {
          if (props.getValue) {
            props.getValue(e.target.value);
          }
        }}
      />
      {suffixSign && (
        <div
          className={`min-w-[10%] px-2 border border-l-0 box-border border-stone-200 rounded-r-lg flex items-center justify-center bg-slate-100 ${customSuffixStyle}`}
        >
          {suffixSign}
        </div>
      )}
    </div>
  );
};

export default TextInput;
