"use client";
import React, { useState, useRef } from "react";
import ReviewCard from "./ReviewCard";
import ArrowLeftAlt from "~/commons/icons/ArrowLeftAlt";
import ArrowRightAlt from "~/commons/icons/ArrowRightAlt";
import OutlineDot from "~/commons/icons/OutlineDot";
import SolidDot from "~/commons/icons/SolidDot";

const data = [
  {
    id: 1,
    reviewer: "Ifeanyi Dike",
    role: "Customer",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, temporibus dolorum? Iste aliquid asperiores voluptate iusto accusantium, magni voluptates quam assumenda quidem et dolorum consequuntur voluptatibus, eos nisi! Quae, veniam.",
  },
  {
    id: 2,
    reviewer: "Aja Edward",
    role: "Manager",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, temporibus dolorum? Iste aliquid asperiores voluptate iusto accusantium, magni voluptates quam assumenda quidem et dolorum consequuntur voluptatibus, eos nisi! Quae, veniam.",
  },
  {
    id: 3,
    reviewer: "Lorem Ipsum",
    role: "Customer",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, temporibus dolorum? Iste aliquid asperiores voluptate iusto accusantium, magni voluptates quam assumenda quidem et dolorum consequuntur voluptatibus, eos nisi! Quae, veniam.",
  },
  {
    id: 4,
    reviewer: "Mendez Kumer",
    role: "IT",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, temporibus dolorum? Iste aliquid asperiores voluptate iusto accusantium, magni voluptates quam assumenda quidem et dolorum consequuntur voluptatibus, eos nisi! Quae, veniam.",
  },
  {
    id: 5,
    reviewer: "Manoj Sandeep",
    role: "Indian",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, temporibus dolorum? Iste aliquid asperiores voluptate iusto accusantium, magni voluptates quam assumenda quidem et dolorum consequuntur voluptatibus, eos nisi! Quae, veniam.",
  },
];

const ReviewCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleSwipeStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0]!.clientX;
  };

  const handleSwipeMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;

    const deltaX = e.touches[0]!.clientX - startXRef.current;

    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
  };

  const handleSwipeEnd = () => {
    startXRef.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="carousel relative h-full w-full overflow-hidden">
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform"
          onClick={handlePrev}
        >
          <ArrowLeftAlt />
        </button>
        <div
          className="mx-auto flex w-[87%] transition-transform max-md:w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          ref={containerRef}
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
          onTouchEnd={handleSwipeEnd}
        >
          {data.map((item, index) => (
            <div key={item.id} className={`h-full w-full flex-shrink-0`}>
              <ReviewCard {...item} isActive={index === currentIndex} />
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform"
          onClick={handleNext}
        >
          <ArrowRightAlt />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {data.map((item, index) => {
          if (currentIndex === index) {
            return (
              <button key={item.id}>
                <OutlineDot />
              </button>
            );
          }
          return (
            <button key={item.id} onClick={() => setCurrentIndex(index)}>
              <SolidDot />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCards;
