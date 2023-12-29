import { db } from "./db";

const fetchUsers = async () => {
  const users = await db.merchant.findMany();

  return users;
};

const createMerchant = async () => {
  const merchant = await db.merchant.create({
    data: {
      slug: "auto-u2",
      name: "Auto Universal",
      address: "No 1 Umosi Road",
    },
  });

  return merchant;
};
