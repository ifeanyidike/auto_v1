import { useParams } from 'next/navigation';
import React from 'react';

const Client = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Client</div>;
};

export default Client;
