import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class Notification extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.NotificationCreateInput) {
    return this.process(async () => {
      return await this.db.notification.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.notification.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.NotificationUpdateInput) {
    return this.process(async () => {
      return await this.db.notification.update({
        where: { id },
        data,
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.notification.findUnique({
        where: { id },
      });
    });
  }

  public getManyByUser(
    receiverId: string | undefined | null,
    subdomain: string
  ) {
    return this.process(async () => {
      return await this.db.notification.findMany({
        where: { receiverId, subdomain, isRead: false },
      });
    });
  }
}
