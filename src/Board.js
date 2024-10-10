import React, { useEffect } from 'react';
import { Stage, Layer } from 'react-konva';

const Board = ({ children, width, height }) => {
  
  const boardStyle = {
    position: 'relative',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'black', // Color de fondo del tablero
  };

  const wallStyle = {
    position: 'absolute',
    backgroundColor: 'blue', // Color de las paredes
  };

  return (
    <div style={boardStyle}>
      <Stage width={width} height={height}>
        <Layer>
          {children}
        </Layer>
      </Stage>
    </div>
  );
};

export default Board;
