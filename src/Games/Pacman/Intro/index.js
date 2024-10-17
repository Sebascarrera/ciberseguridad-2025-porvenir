import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Asegúrate de crear un archivo CSS para los estilos
import Logo from '../../../assets/img/logo-fondo-blanco-ciberseguridad2024.png'
import LogoPacman from '../../../assets/img/pacman/logo-pacman-antifraude-titulo-home.png'

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/pacman/resumen'); // Redirige a la ruta del juego
  };

  return (
    <div className="home-container">
      <img className="home-logo" src={Logo} alt="Logo"/>
      <div className="home-text-container">
      <img className="home-logo-titulo-juego" src={LogoPacman} alt="Logo"/>
      </div>
      <button className="home-play-button" onClick={handleStartGame}>
        Jugar
      </button>
    </div>
  );
};

export default Home;
