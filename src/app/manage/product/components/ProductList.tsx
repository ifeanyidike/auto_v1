'use client';
import React, { useState } from 'react';
import ProductListListView from './ProductListListView';
import ProductListCardView from './ProductListCardView';
import { type NewMerchantServiceType } from '~/types/utils';

enum ViewType {
  card,
  list,
}
type Props = {
  products: NewMerchantServiceType[];
};

const ListIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
    />
  </svg>
);

const CardIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

const ProductList = (props: Props) => {
  const [viewType, setViewType] = useState<ViewType>(ViewType.list);

  return (
    <div>
      <div className="ml-auto w-fit mr-8 mt-8 mb-16 flex gap-3">
        <button
          onClick={() => setViewType(ViewType.list)}
          className={`${
            viewType === ViewType.list
              ? 'text-content-normal'
              : 'text-content-light/50'
          } `}
        >
          <ListIcon />
        </button>
        <button
          onClick={() => setViewType(ViewType.card)}
          className={`${
            viewType === ViewType.card
              ? 'text-content-normal'
              : 'text-content-light/50'
          } `}
        >
          <CardIcon />
        </button>
      </div>
      {viewType === ViewType.list ? (
        <ProductListListView products={props.products} />
      ) : (
        <ProductListCardView products={props.products} />
      )}
    </div>
  );
};

export default ProductList;
