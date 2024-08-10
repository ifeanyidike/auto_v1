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
  amount: number;
  location: string;
  isFullfilled: boolean;
  isOutsideWork: boolean;
  info: string;
  paymentMode: string;
  user: Prisma.UserGetPayload<Prisma.UserDefaultArgs<DefaultArgs>> | null;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type bookingByUserItem = BookingItem & {
  merchant: Prisma.MerchantGetPayload<
    Prisma.MerchantDefaultArgs<DefaultArgs>
  > | null;
};

export default class Booking extends Utility {
  constructor() {
    super();
  }
  public async create(
    data: Omit<
      Prisma.BookingCreateInput,
      'merchant' | 'merchantService' | 'user'
    >,
    serviceId: string,
    merchantId: string,
    pricingItems: string[],
    userId: string
  ) {
    return this.process(async () => {
      return await this.db.booking.create({
        data: {
          ...data,
          merchantService: {
            connect: { id: serviceId },
          },
          merchant: {
            connect: { id: merchantId },
          },

          user: {
            connect: { id: userId },
          },

          items: {
            connect: pricingItems.map(k => ({ id: k })),
          },
        },
      });
    });
  }

  public async update(id: string, data: Prisma.BookingUpdateInput) {
    return this.process(async () => {
      return await this.db.booking.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.booking.findFirst({
        where: { id },
        include: {
          review: true,
        },
      });
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
            amount: d.amount.toNumber(),
            isPaid: d.isPaid,
            location: d.location,
            isFullfilled: d.isFulfilled,
            isOutsideWork: d.isOutsideWork,
            info: d.info,
            paymentMode: d.paymentMode,
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
            amount: d.amount.toNumber(),
            location: d.location,
            isFullfilled: d.isFulfilled,
            isOutsideWork: d.isOutsideWork,
            info: d.info,
            user: d.user,
            paymentMode: d.paymentMode,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as bookingByUserItem,
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
            amount: d.amount.toNumber(),
            location: d.location,
            isFullfilled: d.isFulfilled,
            isOutsideWork: d.isOutsideWork,
            info: d.info,
            paymentMode: d.paymentMode,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as Omit<BookingItem, 'user'>
      );
    });
  }
}
