import React from 'react';
import Auth0 from '~/server/auth0';

async function Booking() {
  const session = await Auth0.getSessionUser();

  return (
    <main>
      <h1>Profile</h1>
      <h2>Page:</h2>
      <h3>Access Token</h3>
      <pre>
        {/* {JSON.stringify({ accessToken: session?.accessToken }, null, 2)} */}
      </pre>
      <h3>User</h3>
      <pre>{JSON.stringify(session.name, null, 2)}</pre>
    </main>
  );
}

export default Auth0.ProtectedPage()(Booking, { returnTo: '/booking' });
