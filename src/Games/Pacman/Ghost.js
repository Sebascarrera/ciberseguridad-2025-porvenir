// Ghost.js
import React from 'react';
import { Circle } from 'react-konva';

const Ghost = ({ position, color = 'red', cellSize }) => {
  return (
    <Circle
      x={position.x + cellSize / 2}
      y={position.y + cellSize / 2}
      radius={cellSize / 2}
      fill={color}
    />
  );
};

export default Ghost;
