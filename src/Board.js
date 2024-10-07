import React from 'react';

const Board = ({ children, maze }) => {
  console.log(maze)
  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '650px',
        backgroundColor: '#000',
        border: '2px solid #FFF',
        margin: '0 auto',
      }}
    >
      {/* Renderizar el laberinto */}
      {maze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (cell === 1) {
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'blue',
                  left: `${cellIndex * 20}px`,
                  top: `${rowIndex * 20}px`,
                }}
              />
            );
          }
          return null;
        })
      )}
      {children}
    </div>
  );
};

export default Board;
