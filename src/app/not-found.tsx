import Link from 'next/link';
import { headers } from 'next/headers';
import Merchant from './api/merchant/logic';

export default async function NotFound() {
  //   const headersList = headers();
  //   const hostname = headersList.get('host');
  //   const slug = getSubdomain(hostname ?? '');
  //   const merchant = new Merchant();
  //   const merchantData = await merchant.getOne({ slug });
  //   console.log('merchantData', merchantData);
  return (
    <div>
      <h2>Not Found: subdomain</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  );
}
