import { type Prisma } from '@prisma/client';
import Utility from './utility';

export default class ServiceKeypoint extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.ServiceKeyPointCreateInput) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.merchant.findFirst({ where: { id } });
    });
  }
}
