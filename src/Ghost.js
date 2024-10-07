// Ghost.js
import React from 'react';
import './Ghost.css';

const Ghost = ({ position }) => {
  return (
    <div
      className="ghost"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    ></div>
  );
};

export default Ghost;
