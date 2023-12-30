'use client';
import React from 'react';

type Props = {
  handleCreateMerchant: () => Promise<{
    id: string;
    slug: string;
    email: string;
    name: string;
    address: string;
    phoneNo: string;
    caption: string;
    shortDescription: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
};

const MyButton = (props: Props) => {
  return (
    <div
      onClick={() => {
        const newMerchant = props.handleCreateMerchant();
        console.log('new Merchant', newMerchant);
      }}
    >
      My Button
    </div>
  );
};

export default MyButton;
