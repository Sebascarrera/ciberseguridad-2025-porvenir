// Ghost.js
import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const Ghost = ({ position, cellSize }) => {

  const [ghostImage] = useImage(require('../../assets/img/pacman/troyano-pacman.png'));

  return (
    <Image
      x={position.x}
      y={position.y}
      image={ghostImage}
      width={cellSize}
      height={cellSize}
    />
  );
};

export default Ghost;
