import React from 'react';
import { dmSans } from '~/font';

type Props = {
  pb?: string;
};
const LoginButton = (props: Props) => {
  const { pb = '' } = props;
  return (
    <a
      className={`${dmSans.className} flex items-center text-content-light font-medium bg-gradient-to-r from-red-1 via-content-light to-red-2 text-transparent bg-clip-text text-sm border-b border-content-light ${pb}`}
      href="/api/auth/login"
    >
      Login or Signup
    </a>
  );
};

export default LoginButton;
