import React from 'react';
import { type NewMerchantServiceType } from '~/types/utils';
import ProductCard from './ProductCard';

type Props = {
  products: NewMerchantServiceType[];
};
const ProductListCardView = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-5 px-5">
      {props.products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductListCardView;
