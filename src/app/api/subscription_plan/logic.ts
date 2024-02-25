import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class SubscriptionPlan extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.SubscriptionPlanCreateInput) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findFirst({ where: { id } });
    });
  }

  public async getManyByData(data: Record<'code' | 'interval', string>[]) {
    return this.process(async () => {
      return await Promise.all(
        data.map(item =>
          this.db.subscriptionPlan.findFirst({
            where: { ...item },
          })
        )
      );
    });
  }

  public async findItem(item: Record<'code' | 'interval', string>) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findFirst({
        where: { ...item },
      });
    });
  }

  public async getOrCreateMany(data: Record<'code' | 'interval', string>[]) {
    return await Promise.all(
      data.map(async item => {
        const plan = await this.findItem(item);
        if (plan) return plan.id;
        const subscriptionPlan = await this.create({ ...item });
        return subscriptionPlan.id;
      })
    );
  }
}
