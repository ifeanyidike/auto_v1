'use client';
import React, { useState, type FocusEvent, type FormEvent } from 'react';

type Props = {
  placeholder?: string;
  defaultValue?: string;
  getValue: (value: string) => void;
  name?: string;
  customStyle?: string;
};
const MultilineTextInput = (props: Props) => {
  const { placeholder = '', customStyle = '', defaultValue = '' } = props;
  const [inputHeight, setInputHeight] = useState<number>(44);

  const handleAdjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    const newHeight = textarea.scrollHeight;
    setInputHeight(newHeight);
    textarea.style.height = newHeight + 'px';
  };

  const handleAdjustInputHeight = (e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    handleAdjustHeight(textarea);
  };

  const handleAdjustHeightOnFocus = (
    e: FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    const textarea = e.target as HTMLTextAreaElement;
    handleAdjustHeight(textarea);
  };

  const handleAdjustHeightOnBlur = (
    e: FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    const newHeight = 36;
    setInputHeight(newHeight);
    textarea.style.height = newHeight + 'px';
  };

  return (
    <textarea
      name={props.name}
      placeholder={placeholder}
      onInput={handleAdjustInputHeight}
      onFocus={handleAdjustHeightOnFocus}
      onBlur={handleAdjustHeightOnBlur}
      onChange={e => props.getValue(e.target.value)}
      defaultValue={defaultValue}
      className={`box-border ${
        inputHeight <= 44 ? 'whitespace-nowrap' : 'whitespace-normal'
      } flex gap-4 p-3 text-left text-xs bg-stone-100/50 border border-stone-200/50 rounded-lg text-content-normal w-full resize-none h-11 min-h-11 transition-all ease-in-out duration-500 overflow-auto overflow-y-hidden outline-none scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent ${customStyle}`}
    ></textarea>
  );
};

export default MultilineTextInput;
