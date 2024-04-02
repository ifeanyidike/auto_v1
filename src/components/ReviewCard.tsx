import Image from 'next/image';
import React from 'react';
import { dmSans } from '~/font';

type Review = {
  id: string;
  rating: number;
  description: string | null;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imgUrl: string | null;
  };
};

type Props = {
  isActive: boolean;
  // reviewer: string;
  // content: string;
  // role: string;
  item: Review;
};
const ReviewCard = (props: Props) => {
  return (
    <div
      style={{ opacity: props.isActive ? 1 : 0 }}
      className="flex flex-col gap-5 rounded-2xl bg-white px-10 py-12"
    >
      <div className="flex gap-3 max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:text-center">
        <Image
          src={props.item.user.imgUrl || '/images/avatar.webp'}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className={`${dmSans.className} text-lg font-medium`}>
            {props.item.user.firstName + ' ' + props.item.user.lastName}
          </span>
          <span className="text-xs font-light">User</span>
        </div>
        <div className="ml-auto flex max-sm:mr-auto gap-2">
          {[1, 2, 3, 4, 5].map(r => {
            const isFilled = r <= props.item.rating;
            return (
              <span className={`${isFilled ? 'text-yellow' : 'text-gray-300'}`}>
                ★
              </span>
            );
          })}
        </div>
      </div>

      <p className="text-medium mt-5 font-normal leading-7 text-content-normal max-sm:text-sm">
        {props.item.description}
      </p>
    </div>
  );
};

export default ReviewCard;
