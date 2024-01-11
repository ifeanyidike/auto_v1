import MerchantService from '../logic';

export const GET = async (
  req: Request,
  query: { params: { param: string } }
) => {
  const s = new MerchantService();
  const { params } = query;
  const service = await s.getOne({ title: params.param });

  return new Response(JSON.stringify(service));
};
