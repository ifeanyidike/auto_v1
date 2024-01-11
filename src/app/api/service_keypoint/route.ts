import { type Prisma } from '@prisma/client';
import ServiceKeypoint from './logic';

export const POST = async (req: Request) => {
  const data = (await req.json()) as Prisma.ServiceKeyPointCreateInput;
  const keypoint = new ServiceKeypoint();
  const newKeypoint = await keypoint.create({ ...data });
  return new Response(JSON.stringify(newKeypoint));
};
