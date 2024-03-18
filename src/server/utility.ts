import { type DefaultArgs } from '@prisma/client/runtime/library';
import { db } from './db';
import { type Prisma, type PrismaClient } from '@prisma/client';

export default class Utility {
  protected db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor() {
    this.db = db;
  }

  protected async process<T>(func: () => Promise<T>): Promise<T> {
    try {
      return await func();
    } catch (error: any) {
      console.error('Error:', error);
      if (error.message?.toLowerCase()?.includes('unique constraint failed')) {
        throw new Error('unique_constraint_failed');
      }
      throw error;
    } finally {
      await this.db.$disconnect();
    }
  }
}
