import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import { type DefaultArgs } from '@prisma/client/runtime/library';

export type BookingItem = {
  id: string;
  merchantService: {
    service: Prisma.ServiceGetPayload<
      Prisma.ServiceDefaultArgs<DefaultArgs>
    > | null;

    discounts:
      | Prisma.DiscountGetPayload<Prisma.DiscountDefaultArgs<DefaultArgs>>[]
      | null;
    pricingMode: string;
  };
  user: Prisma.UserGetPayload<Prisma.UserDefaultArgs<DefaultArgs>> | null;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export default class Booking extends Utility {
  constructor() {
    super();
  }
  public async create(serviceId: string, merchantId: string, userId: string) {
    return this.process(async () => {
      return await this.db.booking.create({
        data: {
          merchantService: {
            connect: { id: serviceId },
          },
          merchant: {
            connect: { id: merchantId },
          },

          user: {
            connect: { id: userId },
          },
          isPaid: false,
        },
      });
    });
  }

  public async update(id: string, isPaid: boolean) {
    return this.process(async () => {
      return await this.db.booking.update({
        where: {
          id,
        },
        data: {
          isPaid,
        },
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.booking.findFirst({ where: { id } });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.booking.delete({ where: { id } });
    });
  }

  public async findByMerchant(merchantId: string, limit?: number, n?: number) {
    return this.process(async () => {
      const data = await this.db.booking.findMany({
        where: { merchantId },
        ...(limit && { take: limit, skip: n }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          merchantService: {
            include: {
              service: true,
              discounts: true,
            },
          },
          user: true,
        },
      });

      return data.map(
        d =>
          ({
            id: d.id,
            merchantService: d.merchantService,
            user: d.user,
            isPaid: d.isPaid,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as BookingItem
      );
    });
  }

  public async findByUser(userId: string, limit?: number, n?: number) {
    return this.process(async () => {
      const data = await this.db.booking.findMany({
        where: { userId },
        ...(limit && { take: limit, skip: n }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          merchantService: {
            include: {
              service: true,
              discounts: true,
            },
          },
          user: true,
          merchant: true,
        },
      });

      return data.map(
        d =>
          ({
            id: d.id,
            merchantService: d.merchantService,
            merchant: d.merchant,
            isPaid: d.isPaid,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as Omit<BookingItem, 'user'> & {
            merchant: Prisma.MerchantGetPayload<
              Prisma.MerchantDefaultArgs<DefaultArgs>
            > | null;
          }
      );
    });
  }

  public async findByUserAndMerchant(
    userId: string,
    merchantId: string,
    limit?: number,
    n?: number
  ) {
    return this.process(async () => {
      const data = await this.db.booking.findMany({
        where: { userId, merchantId },
        ...(limit && { take: limit, skip: n }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          merchantService: {
            include: {
              service: true,
              discounts: true,
            },
          },
        },
      });

      return data.map(
        d =>
          ({
            id: d.id,
            merchantService: d.merchantService,
            isPaid: d.isPaid,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as Omit<BookingItem, 'user'>
      );
    });
  }
}
