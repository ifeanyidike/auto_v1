import React from 'react';

type Props = {
  placeholder?: string;
};
const TextInput = (props: Props) => {
  const { placeholder = '' } = props;
  return (
    <input
      placeholder={placeholder}
      className="text-sm border box-border border-stone-200 rounded-lg w-full px-3 py-3"
      type="text"
    />
  );
};

export default TextInput;
