import Merchant from './logic';

export const GET = async (req: Request) => {
  console.log('request', req);
  console.log('host', req.headers.get('host'));
  const merchant = new Merchant();
  const all_merchants = await merchant.getAll();
  return new Response(JSON.stringify(all_merchants));
};
