// Pacman.js
import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const Pacman = ({ position, cellSize }) => {

  const [pacmanImage] = useImage(require('../../assets/img/pacman/cipo-pacman.png'));

  return (
    <Image
      x={position.x}
      y={position.y}
      image={pacmanImage}
      width={cellSize}
      height={cellSize}
    />
  );
};

export default Pacman;
