import Utility from '../../../server/utility';
import { type TransactionDataResponse } from '~/types/payment';

export default class PaymentAuthorization extends Utility {
  constructor() {
    super();
  }

  private async create(
    userId: string,
    data: TransactionDataResponse['data']['authorization']
  ) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.create({
        data: {
          ...data,
          user: {
            connect: { id: userId },
          },
        },
      });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.findMany({
        ...(limit && { take: limit }),
        orderBy: {
          updatedAt: 'asc',
        },
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.findFirst({ where: { id } });
    });
  }

  public async updateOne(
    id: string,
    data: TransactionDataResponse['data']['authorization']
  ) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.update({ where: { id }, data });
    });
  }

  public async upsert(
    id: string,
    data: TransactionDataResponse['data']['authorization'],
    userId: string
  ) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.upsert({
        where: { id },
        update: { ...data },
        create: {
          ...data,
          user: {
            connect: { id: userId },
          },
        },
      });
    });
  }

  public async findByUser(userId: string) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.findMany({ where: { userId } });
    });
  }

  public async findOneBySignature(signature: string) {
    return this.process(async () => {
      return await this.db.paymentAuthorization.findFirst({
        where: { signature },
      });
    });
  }

  private async getLatest() {
    const data = await this.getMany();
    if (data.length === 3) {
      return data[data.length - 1];
    }
  }

  public async add(
    userId: string,
    data: TransactionDataResponse['data']['authorization']
  ) {
    const item = await this.findOneBySignature(data.signature);
    console.log('item', item);
    console.log('data', data);
    if (item) {
      return this.updateOne(item.id, data);
    }

    const latest = await this.getLatest();
    if (latest) {
      return this.updateOne(latest.id, data);
    }
    return this.create(userId, data);
  }
}
