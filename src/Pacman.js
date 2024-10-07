// Pacman.js
import React from 'react';
import backgroundImage from './assets/img/cipo-animado.gif';
import './Pacman.css';


const Pacman = ({ position }) => {
  return (
    <div
      className="pacman"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};

export default Pacman;
