// Pacman.js
import React, { useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const Pacman = ({ position, cellSize }) => {
  const [pacmanImage] = useImage(require('../../assets/img/pacman/cipo-pacman.png')); // Cargar el GIF de Pacman
  const imageRef = useRef(null);

  return (
    <Image
      ref={imageRef}
      x={position.x}
      y={position.y}
      image={pacmanImage}
      width={cellSize}
      height={cellSize}
    />
  );
};

export default Pacman;
