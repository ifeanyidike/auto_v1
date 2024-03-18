import { db } from './db';

export const fetchUsers = async () => {
  const users = await db.merchant.findMany();

  return users;
};
