// Point.js
import React from 'react';
import { Circle } from 'react-konva';

const Point = ({ position, size }) => {
  return (
    <Circle
      x={position.x}
      y={position.y}
      radius={size / 2} // El radio será la mitad del tamaño especificado
      fill="yellow" // Color del punto
    />
  );
};

export default Point;
