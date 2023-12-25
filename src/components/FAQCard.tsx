import React, { useState } from "react";
import MinusIcon from "~/commons/icons/MinusIcon";
import PlusIcon from "~/commons/icons/PlusIcon";

type Props = {
  question: string;
  answer: string;
};
const FAQCard = (props: Props) => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  return (
    <div className="flex w-3/5 flex-col gap-3 rounded-xl border border-gray-300 p-3">
      <div className="flex justify-between gap-4 px-2">
        <p className="flex font-medium">{props.question}</p>
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
        } px-2 text-sm font-light leading-6`}
      >
        {props.answer}
      </div>
    </div>
  );
};

export default FAQCard;
