import React from 'react';
import { Rect } from 'react-konva';

const Maze = ({ maze, cellSize }) => {
  return (
    <>
      {maze.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === 1) {
            return (
              <Rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * cellSize}
                y={rowIndex * cellSize}
                width={cellSize}
                height={cellSize}
                fill="blue" // Color de las paredes
              />
            );
          }
          return null; // No dibujar nada si es un camino
        })
      )}
    </>
  );
};

export default Maze;
