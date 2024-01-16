import React from 'react';
import Auth0 from '~/server/auth0';

const Home = async () => {
  return <div></div>;
};

export default Auth0.ProtectedPage(Home, { returnTo: '/manage' });
