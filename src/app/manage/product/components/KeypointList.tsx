'use client';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import Select from '~/components/Select';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import { keypoints_data } from 'utilities/product';
import { type MultiValue } from 'react-select';

type Props = {
  product?: MerchantServiceType | null;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};

const KeypointList = (props: Props) => {
  const { data, setData } = props;

  return (
    <div className="w-full mb-3">
      <input
        type="hidden"
        name="keypoints"
        value={JSON.stringify(data.faq_keypoints.keypoints)}
      />
      <label className="text-sm mb-2 font-semibold" htmlFor="service">
        Key points
      </label>
      <Select
        placeholder="Service keypoints"
        isMulti
        isCreateable
        maxLength={4}
        defaultValue={
          props.product
            ? keypoints_data.filter(
                m => props.product?.keyPoints?.some(p => p.point === m.value)
              )
            : []
        }
        getValue={e => {
          const values = (
            e as MultiValue<Record<'label' | 'value', string>>
          )?.map(v => v.value);
          if (values) {
            const newData = { ...data };
            newData.faq_keypoints.keypoints = values;
            setData(newData);
          }
        }}
        data={keypoints_data}
      />
    </div>
  );
};

export default KeypointList;
