'use client';

import React, { useState } from 'react';

type StarProps = { isFill?: boolean };
const StarIcon = (props: StarProps) => (
  <svg
    fill={props.isFill ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
    className="w-10 h-10"
  >
    <path
      strokeLinecap="square"
      strokeLinejoin="miter"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

type Props = {
  getValue?: (e: number) => void;
  name: string;
  existingRating: number | undefined;
};

const Stars = (props: Props) => {
  const [selectedStar, setSelectedStar] = useState<number>();
  return (
    <div>
      <div className="flex gap-12">
        {[1, 2, 3, 4, 5].map(value => {
          const getIsFilled = () => {
            if (props.existingRating) {
              return value <= props.existingRating;
            }
            if (selectedStar) {
              return value <= selectedStar;
            }
            return false;
          };
          const isFilled = getIsFilled();
          return (
            <div
              key={value}
              onClick={() => {
                if (props.existingRating) return;
                props.getValue && props.getValue(value);
                setSelectedStar(value);
              }}
              className={`${!props.existingRating && 'cursor-pointer'} ${
                isFilled ? 'text-red-400' : 'text-gray-500'
              }`}
            >
              <StarIcon isFill={isFilled} />
            </div>
          );
        })}
      </div>
      <input type="hidden" name={props.name} value={selectedStar} />
    </div>
  );
};

export default Stars;
