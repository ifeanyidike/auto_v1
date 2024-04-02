import React, { type Dispatch, type SetStateAction } from 'react';
import MultilineTextInput from '~/components/MultilineTextInput';
import TextInput from '~/components/TextInput';
import { type CreateMerchantServiceParamType } from '~/types/utils';

type Props = {
  id: string;
  isDefault?: boolean | undefined;
  question: string;
  answer: string;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};

const FAQInputItem = (props: Props) => {
  const faqIndex = props.data.faq_keypoints.faq?.findIndex(
    faq => faq.id === props.id
  );
  return (
    <div className="w-full">
      <div className="w-full">
        <label className="text-xs mb-2" htmlFor="question">
          Question
        </label>
        <TextInput
          placeholder="Please provide the question"
          customStyle="outline-none rounded border-stone-200/80 !p-2 text-xs"
          defaultValue={props.isDefault ? props?.question : ''}
          getValue={text => {
            const newData = { ...props.data };
            console.log(
              'newData.faq_keypoints.faq',
              newData.faq_keypoints.faq,
              faqIndex,
              text
            );
            if (!newData.faq_keypoints.faq) {
              newData.faq_keypoints.faq = [];
            }
            if (faqIndex === undefined || faqIndex === -1) {
              newData.faq_keypoints.faq = [
                ...(newData.faq_keypoints.faq || []),
                {
                  id: props.id,
                  question: text,
                  answer: '',
                },
              ];
            } else {
              newData.faq_keypoints.faq[faqIndex]!.question = text;
            }

            props.setData(newData);
          }}
        />
      </div>
      <div className="w-full">
        <label className="text-xs mb-2" htmlFor="answer">
          Answer
        </label>

        <MultilineTextInput
          customStyle=""
          placeholder="Please provide the answer"
          defaultValue={props.isDefault ? props?.answer : ''}
          getValue={text => {
            const newData = { ...props.data };
            if (!newData.faq_keypoints.faq) {
              newData.faq_keypoints.faq = [];
            }
            if (faqIndex === -1) {
              newData.faq_keypoints.faq = [
                ...(newData.faq_keypoints.faq || []),
                {
                  id: props.id,
                  question: '',
                  answer: text,
                },
              ];
            } else {
              newData.faq_keypoints.faq[faqIndex]!.answer = text;
            }

            props.setData(newData);
          }}
        />
      </div>
    </div>
  );
};

export default FAQInputItem;
