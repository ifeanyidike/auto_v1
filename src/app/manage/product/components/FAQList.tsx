'use client';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import CloseIcon from '~/commons/icons/CloseIcon';
import FAQInputItem from '../../components/FAQInputItem';
import PlusIcon from '~/commons/icons/PlusIcon';

type Props = {
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};

const FAQList = (props: Props) => {
  const { data, setData } = props;
  return (
    <div className="w-full relative">
      <div className="w-full border-b mb-4 pb-1">
        <label className="text-sm mb-2 font-semibold" htmlFor="service">
          FAQ
        </label>
      </div>
      <input
        type="hidden"
        name="faqs"
        value={JSON.stringify(data.faq_keypoints.faq)}
      />

      <div className="mb-6 gap-6 flex flex-col">
        {data.faq_keypoints?.faq.map((item, index) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => {
                const newData = { ...data };
                const filtered = newData.faq_keypoints.faq.filter(
                  d => d.id !== item.id
                );
                newData.faq_keypoints.faq = filtered;

                setData(newData);
              }}
              className={`${index === 0 && 'hidden'} absolute top-0 right-0`}
            >
              <CloseIcon classNames="h-4 w-4" />
            </button>
            <FAQInputItem
              id={item.id}
              question={item.question}
              answer={item.answer}
              isDefault={item.isDefault}
              data={data}
              setData={setData}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          const newData = { ...data };
          newData.faq_keypoints.faq.push({
            id: globalThis.crypto.randomUUID(),
            question: '',
            answer: '',
          });
          setData(newData);
        }}
        className="ml-auto hover-target flex justify-between items-center hover:w-[150px] transition ease-in-out duration-300 bg-stone-200 p-2 rounded-md relative"
      >
        <span className="hide absolute right-2 -top-2 p-2 text-sm font-medium rounded mt-2">
          Add more FAQs
        </span>
        <PlusIcon classNames="h-5 w-5" />
      </button>
    </div>
  );
};

export default FAQList;
