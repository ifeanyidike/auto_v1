import React from 'react';
import Image from 'next/image';
import moxxilimage from 'images/imagesmoxxil.com.png';

const MoxxilLogo = () => {
  return (
    <div>
      <Image width={150} height={150} src={moxxilimage} alt="moxxilimage" />
    </div>
  );
};

export default MoxxilLogo;
