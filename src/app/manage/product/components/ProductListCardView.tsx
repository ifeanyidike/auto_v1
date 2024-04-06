import React from 'react';
import { type NewMerchantServiceType } from '~/types/utils';
import ProductCard from './ProductCard';

type Props = {
  products: NewMerchantServiceType[];
};
const ProductListCardView = (props: Props) => {
  // grid grid-cols-3 gap-5 px-5 max-lg:grid-cols-2 max-md:grid-cols-1
  return (
    <div className="flex flex-wrap gap-5 items-center justify-center">
      {props.products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductListCardView;
