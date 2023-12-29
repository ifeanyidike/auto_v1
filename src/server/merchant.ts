import { db } from './db';

type CreateMerchantParams = {
  slug: string;
  name: string;
  address: string;
};

const createMerchant = async (data: CreateMerchantParams) => {
  return db.merchant.create({ data });
};
