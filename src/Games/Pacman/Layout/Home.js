import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Asegúrate de crear un archivo CSS para los estilos

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game'); // Redirige a la ruta del juego
  };

  return (
    <div className="home-container">
      <img className="home-logo" src="/assets/img/logo-fondo-blanco-ciberseguridad2024.png" alt="Logo"/>
      <div className="home-text-container">
      <img className="home-logo-titulo-juego" src="/assets/img/pacman/logo-pacman-antifraude-titulo-home.png" alt="Logo"/>
      </div>
      <button className="home-play-button" onClick={handleStartGame}>
        Jugar
      </button>
    </div>
  );
};

export default Home;
