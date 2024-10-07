// Point.js
import React from 'react';
import './Point.css';

const Point = ({ position }) => {
  return (
    <div
      className="point"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    ></div>
  );
};

export default Point;
