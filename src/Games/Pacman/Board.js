import React, { useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';

const Board = ({ children, width, height }) => {

  const stageRef = useRef(null);
  
  const boardStyle = {
    position: 'relative',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'black', // Color de fondo del tablero
  };

  useEffect(() => {
    const canvas = stageRef.current.getStage().content;
    
    // Set CSS width/height explicitly to match the desired size
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // Manually set canvas internal resolution
    canvas.width = width;  // Set internal canvas width
    canvas.height = height; // Set internal canvas height
  }, [width, height]);

  return (
    <div style={boardStyle}>
      <Stage 
        ref={stageRef}
        width={width} 
        height={height} 
        pixelRatio={1}>
        <Layer>
          {children}
        </Layer>
      </Stage>
    </div>
  );
};

export default Board;
