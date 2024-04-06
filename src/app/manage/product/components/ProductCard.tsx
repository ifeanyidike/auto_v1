import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { manRope } from '~/font';
import { type NewMerchantServiceType } from '~/types/utils';

type Props = {
  product: NewMerchantServiceType;
};

const TagIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6h.008v.008H6V6Z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
    />
  </svg>
);

const HashtagIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-3 h-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const ProductCard = (props: Props) => {
  const { product } = props;
  const status = product.isDraft ? 'DRAFT' : 'PUBLISHED';
  const mode =
    product.pricingMode === 'SUV_SEDAN' ? 'SUV/SEDAN' : product.pricingMode;

  const getShortenedDescription = () => {
    if (!product.description) return 'No description provided!';
    const length = product.description.length;
    const shortened = product.description.slice(0, 120);
    const additional = length > 120 ? '...' : '';
    return shortened + additional;
  };

  const discounts = ['monthly', 'quarterly', 'annually'].map(type => {
    const discount = props.product?.discounts?.find(d => d.type === type);
    return {
      type,
      ...(discount && { ...discount }),
    };
  });
  return (
    <div
      className={`w-[450px] relative border border-[#484848]/30 rounded-xl ${manRope.className}`}
    >
      <div
        className={`text-[10px] absolute top-3 right-3 font-semibold text-white px-3 py-1 ${
          product.isDraft ? 'bg-red-800' : 'bg-green-800'
        } rounded-full`}
      >
        {status}
      </div>

      <Link
        href={`/manage/product/edit/${product.id}`}
        className="absolute bottom-3 right-3"
      >
        <EditIcon />
      </Link>
      <Image
        src={product.imgUrl ?? '/images/no-image.jpeg'}
        width={256}
        height={200}
        className="w-full h-48 object-cover rounded-t-xl"
        alt={product.service?.title ?? ''}
      />
      <div className="flex flex-col mt-2 px-2 gap-1">
        <h3 className="text-sm uppercase tracking-wider">
          {product.service?.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-semibold">
            {product.service?.type}
          </span>

          <span className="text-[10px] uppercase font-semibold flex gap-1 items-center bg-stone-300 px-3 py-1 rounded-full">
            <TagIcon /> {mode}
          </span>
        </div>
      </div>
      <div className="flex mt-6 px-2 gap-2">
        {product.pricing?.slice(0, 10)?.map(p => (
          <div
            className="flex gap-2 uppercase text-xs bg-gray-300 text-content-normal font-bold px-2 py-1 rounded-full"
            key={p.id}
          >
            {p.type} <CheckIcon />
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-6 px-2 gap-1 ">
        <span className="text-xs uppercase underline font-bold">
          Description
        </span>
        <p className="flex text-xs text-stone-700 leading-4">
          {getShortenedDescription()}
        </p>
      </div>

      <div className="flex flex-col mt-6 px-2 gap-1 ">
        <span className="text-xs uppercase underline font-bold">Discounts</span>
        <div className="flex gap-14">
          {discounts?.map((discount, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold">
                {discount.type}
              </span>
              {
                <span className="text-xs">
                  {discount.value ? `${parseInt(discount.value)}%` : '_'}
                </span>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-6 px-2 gap-1 mb-6">
        <span className="text-xs uppercase underline font-bold">Keypoints</span>
        <div className="flex gap-2 text-[10px] text-stone-700 leading-4 flex-wrap mt-2">
          {product.keyPoints.length ? (
            product.keyPoints.map(k => (
              <p key={k.id} className="flex items-center font-mono">
                <HashtagIcon />
                {k.point}
              </p>
            ))
          ) : (
            <p>Keypoints not provided!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
