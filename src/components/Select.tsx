'use client';
import React from 'react';
import SelectBox from 'react-select';

type Props = {
  name: string;
  data: Array<Record<'value' | 'label', string>>;
  placeholder?: string;
  isMulti?: boolean;
};

const Select = (props: Props) => {
  const { data, name, placeholder = 'Select...', isMulti = false } = props;

  return (
    <div>
      <SelectBox
        defaultValue={[data[2], data[3]]}
        isMulti={isMulti}
        placeholder={placeholder}
        name={name}
        options={data}
        classNamePrefix="select"
        classNames={{
          control: () => {
            return 'text-sm !rounded-lg !outline-none !bg-white !border !border-stone-200';
          },
          option: () => {
            return 'text-sm border-b border-b-slate-200 last:border-b-0 !bg-white !cursor-pointer';
          },
          menu: () => {
            return 'text-sm !rounded-lg';
          },
        }}
      />
    </div>
  );
};

export default Select;
