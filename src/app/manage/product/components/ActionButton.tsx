import React, { type SetStateAction, type Dispatch, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

function ActionButton({
  setLoading,
  children,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const status = useFormStatus();
  useEffect(() => {
    setLoading(status.pending);
  }, [status.pending]);
  return <button disabled={status.pending}>{children}</button>;
}

export default ActionButton;
