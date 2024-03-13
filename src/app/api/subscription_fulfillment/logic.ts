import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import { type SubscriptionItem } from '../subscription/logic';
import { type DefaultArgs } from '@prisma/client/runtime/library';

export type SubscriptionFulfillmentType =
  Prisma.SubscriptionFulfillmentGetPayload<
    Prisma.SubscriptionFulfillmentDefaultArgs<DefaultArgs>
  >;
export default class SubscriptionFulfillment extends Utility {
  constructor() {
    super();
  }
  public async create(
    subscriptionId: string,
    data: Omit<Prisma.SubscriptionFulfillmentCreateInput, 'subscription'>
  ) {
    return this.process(async () => {
      return await this.db.subscriptionFulfillment.create({
        data: {
          subscription: {
            connect: { id: subscriptionId },
          },
          ...data,
        },
      });
    });
  }

  public async update(
    id: string,
    data: Prisma.SubscriptionFulfillmentUpdateInput
  ) {
    return this.process(async () => {
      return await this.db.subscriptionFulfillment.update({
        where: { id },
        data,
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionFulfillment.findFirst({ where: { id } });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionFulfillment.delete({ where: { id } });
    });
  }

  public async findBySubscription(
    subscriptionId: string,
    limit?: number,
    offset?: number
  ) {
    return this.process(async () => {
      const data = await this.db.subscriptionFulfillment.findMany({
        where: { subscriptionId },
        ...(limit && { take: limit, skip: offset }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          subscription: {
            include: {
              plan: true,
              user: true,
              merchantService: {
                include: {
                  service: true,
                  discounts: true,
                },
              },
            },
          },
        },
      });

      return data.map(d => ({
        ...d,
        subscription: d.subscription as unknown as SubscriptionItem,
      }));
    });
  }
}
