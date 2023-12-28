import React, { useState } from "react";
import MinusIcon from "~/commons/icons/MinusIcon";
import PlusIcon from "~/commons/icons/PlusIcon";

type Props = {
  question: string;
  answer: string;
  bottomBorder?: boolean;
  decorateActive?: boolean;
  questionFontSize?: string;
  answerFontSize?: string;
  width?: string;
};
const FAQCard = (props: Props) => {
  const {
    bottomBorder = false,
    questionFontSize = "text-md",
    answerFontSize = "text-sm",
    decorateActive = false,
    width = "w-3/5",
  } = props;
  const [isOpen, toggleOpen] = useState<boolean>(false);
  return (
    <div
      className={`flex ${width} flex-col gap-3 ${
        !bottomBorder
          ? "rounded-xl border border-gray-300 p-3"
          : "border-b border-gray-900 py-5"
      } max-lg:w-4/5 max-md:w-full`}
    >
      <div
        onClick={() => toggleOpen(!isOpen)}
        className={`flex w-full cursor-pointer flex-wrap justify-between gap-4 ${
          !bottomBorder ? "px-2" : ""
        } ${questionFontSize} ${
          decorateActive
            ? "hover:text-red-700 hover:underline active:text-red-700 active:underline"
            : ""
        }`}
      >
        <p className={`flex font-medium`}>{props.question}</p>
        <button
          onClick={() => toggleOpen(!isOpen)}
          className={`transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-0" : "rotate-90"
          }`}
        >
          {!isOpen ? (
            <PlusIcon classNames="h-5 w-5" />
          ) : (
            <MinusIcon classNames="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        } ${
          !bottomBorder ? "px-2" : ""
        } ${answerFontSize} font-light leading-6`}
      >
        {props.answer}
      </div>
    </div>
  );
};

export default FAQCard;
