import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class User extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.UserCreateInput) {
    return this.process(async () => {
      return await this.db.user.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.user.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.UserUpdateInput) {
    return this.process(async () => {
      return await this.db.user.update({ where: { id }, data });
    });
  }

  public async getOne(data: { id?: string; email?: string }) {
    const { id, email } = data || {};
    return this.process(async () => {
      if (!id && !email) throw new Error('Either id or email must be provided');

      return await this.db.user.findFirst({
        where: { ...(email ? { email } : { id }) },
      });
    });
  }

  public async getAll(limit?: number) {
    return this.process(async () => {
      return await this.db.user.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async findOrCreate(email: string, data: Prisma.UserCreateInput) {
    return this.process(async () => {
      return await this.db.user.upsert({
        where: { email },
        update: {},
        create: { ...data },
      });
    });
  }
}
