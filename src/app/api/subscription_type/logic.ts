import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class SubscriptionType extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.SubscriptionTypeCreateInput) {
    return this.process(async () => {
      return await this.db.subscriptionType.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionType.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.subscriptionType.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionType.findFirst({ where: { id } });
    });
  }

  public async getManyByData(data: string[]) {
    return this.process(async () => {
      return await Promise.all(
        data.map(name =>
          this.db.subscriptionType.findFirst({
            where: { name },
          })
        )
      );
    });
  }

  public async findItem(name: string) {
    return this.process(async () => {
      return await this.db.subscriptionType.findFirst({
        where: { name },
      });
    });
  }

  public async getOrCreateMany(data: string[]) {
    return await Promise.all(
      data.map(async name => {
        const type = await this.findItem(name);
        if (type) return type.id;
        const subscription_type_data = await this.create({ name });
        return subscription_type_data.id;
      })
    );
  }
}
