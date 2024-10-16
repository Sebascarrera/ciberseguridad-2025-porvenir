// Pacman.js
import React, { useRef, useEffect } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const Pacman = ({ position, cellSize, direction }) => {
  const [pacmanImage] = useImage(require('../../assets/img/pacman/cipo-pacman.png')); // Cargar el GIF de Pacman
  const imageRef = useRef(null);

  // Rotar la imagen según la dirección
  let rotationAngle = 0;
  switch (direction) {
    case 'up':
      rotationAngle = 270;
      break;
    case 'down':
      rotationAngle = 90;
      break;
    case 'left':
      rotationAngle = 180;
      break;
    case 'right':
      rotationAngle = 0;
      break;
    default:
      rotationAngle = 0;
  }

  // Actualizar la posición y rotación de Pacman
  // useEffect(() => {
  //   if (imageRef.current) {
  //     imageRef.current.rotation(rotationAngle);
  //   }
  // }, [rotationAngle]);

  return (
    <Image
      ref={imageRef}
      x={position.x}
      y={position.y}
      image={pacmanImage}
      width={cellSize}
      height={cellSize}
      rotation={rotationAngle}
    />
  );
};

export default Pacman;
