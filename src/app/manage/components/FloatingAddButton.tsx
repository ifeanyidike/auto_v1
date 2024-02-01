import React from 'react';
import PlusIcon from '~/commons/icons/PlusIcon';
import Button from '~/components/Button';

const FloatingAddButton = () => {
  return (
    <div className="fixed bottom-10 right-10">
      <Button
        hasGradient={true}
        hasShadow={true}
        shadowColor="shadow-stone-500"
        bgColor="bg-yellow"
        radius="rounded-full"
        px="px-4"
        py="py-4"
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default FloatingAddButton;
