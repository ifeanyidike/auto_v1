import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import ArrowLeftAlt from "~/commons/icons/ArrowLeftAlt";
import ArrowRightAlt from "~/commons/icons/ArrowRightAlt";

const ReviewCards = () => {
  const [reviewIndex, setReviewIndex] = useState(0);

  //   let items = [0, 1, 2, 3, 4]; // Just to hold temp review items
  const handleLeftArrowClick = () => {
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (reviewIndex < 4) {
      setReviewIndex(reviewIndex + 1);
    }
  };
  return (
    <div className="flex items-center gap-5">
      <button onClick={handleLeftArrowClick}>
        <ArrowLeftAlt />
      </button>
      <div className="w-[90%]">
        <ReviewCard />
      </div>
      <button onClick={handleRightArrowClick}>
        <ArrowRightAlt />
      </button>
    </div>
  );
};

export default ReviewCards;
