// src/types.ts
export type Invoice = {
  id: string;
  createdAt: Date;
  merchant: {
    name: string;
    logo?: string;
    address: string;
    email: string;
    phoneNo: string;
    caption?: string;
  };
  merchantService: {
    service: {
      title: string;
    };
    description: string;
    vat?: number;
    discount?: number;
  };
  info: string;
  location: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    imgUrl?: string;
  };
  amount: number;
  isPaid: boolean;
  isFulfilled: boolean;
  paymentMode: string;
};
