import React from 'react';

const TileIcon = () => {
  return (
    <svg viewBox="0 0 32 32">
      <style type="text/css">
        {
          '\n\t.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n\t.st1{fill:none;stroke:#000000;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}\n'
        }
      </style>
      <rect x={4} y={4} className="st0" width={10} height={10} />
      <rect x={4} y={18} className="st0" width={10} height={10} />
      <rect x={18} y={4} className="st0" width={10} height={10} />
      <rect x={18} y={18} className="st0" width={10} height={10} />
    </svg>
  );
};

export default TileIcon;
