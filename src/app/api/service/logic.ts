import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class Service extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.ServiceCreateInput) {
    return this.process(async () => {
      return await this.db.service.create({
        data: {
          ...data,
        },
      });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.service.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.ServiceUpdateInput) {
    return this.process(async () => {
      return await this.db.service.update({ where: { id }, data });
    });
  }

  public async getOne(data: { id?: string; title?: string }) {
    const { id, title } = data || {};
    return this.process(async () => {
      if (!id && !title) throw new Error('Either id or title must be provided');
      return await this.db.service.findFirst({
        where: { ...(title ? { title } : { id }) },
      });
    });
  }
}
