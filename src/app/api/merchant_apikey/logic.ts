import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class MerchantApiKey extends Utility {
  constructor() {
    super();
  }

  public async create(
    merchantId: string,
    data: Omit<Prisma.MerchantApiKeysCreateInput, 'merchant'>
  ) {
    return this.process(async () => {
      return await this.db.merchantApiKeys.create({
        data: {
          ...data,
          merchant: {
            connect: {
              id: merchantId,
            },
          },
        },
      });
    });
  }

  public async createOrUpdate(
    merchantId: string,
    paystack: string,
    calendlyLink: string
  ) {
    return this.process(async () => {
      await this.db.merchantApiKeys.upsert({
        where: { merchantId },
        update: { paystack },
        create: {
          paystack,
          merchant: {
            connect: { id: merchantId },
          },
        },
      });

      await this.db.merchant.update({
        where: { id: merchantId },
        data: { calendlyLink },
      });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.merchantApiKeys.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.MerchantApiKeysUpdateInput) {
    return this.process(async () => {
      return await this.db.merchantApiKeys.update({ where: { id }, data });
    });
  }

  public async getMany(merchantId: string, limit?: number) {
    return this.process(async () => {
      return await this.db.merchantApiKeys.findMany({
        where: { merchantId },
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.merchantApiKeys.findFirst({ where: { id } });
    });
  }

  public async getOneByMerchantId(merchantId: string) {
    return this.process(async () => {
      return await this.db.merchantApiKeys.findFirst({ where: { merchantId } });
    });
  }
}
