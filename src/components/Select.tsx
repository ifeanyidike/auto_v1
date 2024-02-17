/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';
import React from 'react';
import SelectBox, { MultiValue, SingleValue } from 'react-select';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';

type Props = {
  name: string;
  data: Array<Record<'value' | 'label', string>>;
  placeholder?: string;
  isMulti?: boolean;
  isCreateable?: boolean;
  maxLength?: number;
  defaultValue?: Array<Record<'value' | 'label', string>>;
  getValue: (
    e:
      | MultiValue<Record<'value' | 'label', string>>
      | SingleValue<Record<'value' | 'label', string>>
  ) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Menu = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < props.maxLength ? (
        props.children
      ) : (
        <div className="!p-3 flex items-center justify-center">
          Max limit reached
        </div>
      )}
    </components.Menu>
  );
};

const Select = (props: Props) => {
  const {
    data,
    name,
    placeholder = 'Select...',
    isMulti = false,
    maxLength,
    defaultValue = [],
  } = props;

  const classNamePrefix = 'select';
  const classNames = {
    control: () => {
      return 'text-xs !rounded-lg !outline-none !bg-white !border !border-stone-200';
    },
    option: () => {
      return 'text-xs !text-content-normal border-b border-b-slate-200 last:border-b-0 !bg-white !cursor-pointer';
    },
    menu: () => {
      return 'text-xs !rounded-lg';
    },
  };

  const properties = {
    classNames,
    classNamePrefix,
    defaultValue,
    placeholder,
    options: data,
    isMulti,
    name,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidNewOption = (inputValue: any, selectValue: any) =>
    inputValue.length > 0 && selectValue.length < props.maxLength!;

  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    Menu: (props: any) => <Menu {...props} maxLength={maxLength} />,
  };

  return (
    <div>
      {props.isCreateable ? (
        <Creatable
          {...(props.maxLength && { ...{ isValidNewOption, components } })}
          {...properties}
          onChange={e => props.getValue(e)}
        />
      ) : (
        <SelectBox
          {...(props.maxLength && { ...{ components } })}
          {...properties}
          onChange={e => props.getValue(e)}
        />
      )}
    </div>
  );
};

export default Select;
