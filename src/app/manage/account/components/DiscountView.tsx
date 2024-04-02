import React, { type Dispatch, type SetStateAction } from 'react';
import Select from '~/components/Select';
import TextInput from '~/components/TextInput';
import { nanoid } from 'nanoid';
import { type SingleValue } from 'react-select';
import { enqueueSnackbar } from 'notistack';
import Calendar from '~/components/Calendar';

type Data = {
  type: 'percentage' | 'fixed';
  code: string;
  value: string;
  expiresOn: Date;
};
type Props = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
};
const DiscountView = (props: Props) => {
  const { data, setData } = props;
  return (
    <div className="text-sm flex flex-col gap-1 pb-8 last:pb-0 last:border-b-0 border-b border-stone-200">
      <div className="w-full">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_type">
          Type
        </label>

        <Select
          name="type"
          data={[
            {
              value: 'percentage',
              label: 'Percentage',
            },
            {
              value: 'fixed',
              label: 'Fixed',
            },
          ]}
          getValue={typeData => {
            const singleValue = typeData as SingleValue<
              Record<'label' | 'value', string>
            >;
            const newData = { ...(data || {}) } as Data;
            newData.type = singleValue?.value as 'percentage' | 'fixed';
            setData(newData);
          }}
        />
      </div>

      <div className="w-full flex-flex-col gap-1">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_code">
          Code
        </label>

        <TextInput
          customStyle="text-xs"
          name="discount_code"
          placeholder="Please enter the code for this discount"
          value={data?.code}
          getValue={(code: string) => {
            const newData = { ...(data || {}) } as Data;
            newData.code = code;
            setData(newData);
          }}
        />
        <small
          onClick={() => {
            const newData = { ...(data || {}) } as Data;
            newData.code = nanoid(10).toUpperCase();
            setData(newData);
          }}
          className="flex justify-end text-red-1 ml-auto cursor-pointer"
        >
          Generate code
        </small>
      </div>

      <div className="w-full">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_value">
          Value
        </label>

        <TextInput
          customStyle="text-xs"
          customPrefixStyle="text-xs !min-w-[75px]"
          customSuffixStyle="!min-w-[40px]"
          prefixSign={
            data?.type === 'percentage'
              ? 'Percentage discount'
              : 'Discount amount'
          }
          suffixSign={data?.type === 'percentage' ? '%' : '₦'}
          max={100}
          min={1}
          type="number"
          name="discount_value"
          value={data?.value?.toString() || ''}
          placeholder="Please enter the value for this discount"
          getValue={(val: string) => {
            const newData = { ...(data || {}) } as Data;
            let value = val;

            if (isNaN(parseInt(val))) {
              enqueueSnackbar('Value must be a number');
              value = '';
            }

            if (newData.type === 'percentage' && parseInt(value) > 100) {
              enqueueSnackbar('Percentage value cannot be more than 100');
              value = '';
            }

            if (parseInt(value) < 1) {
              enqueueSnackbar('Value must be greater than 0');
              value = '';
            }

            newData.value = value;
            setData(newData);
          }}
        />
      </div>

      <div className="w-full mt-4">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_value">
          Expires On
        </label>

        <Calendar
          iconClass="w-5 h-[22px] mt-[6px]"
          className="w-full cursor-pointer !py-3 rounded-xl !flex outline-none border border-content-normal/20 hover:border-stone-400 !items-center !justify-center"
          getSelectedDate={date => {
            const newData = { ...(data || {}) } as Data;
            newData.expiresOn = date;
            setData(newData);
          }}
        />
      </div>
    </div>
  );
};

export default DiscountView;
