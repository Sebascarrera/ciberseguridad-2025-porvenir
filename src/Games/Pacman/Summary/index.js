import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Logo from '../../../assets/img/logo-fondo-blanco-ciberseguridad2024.png'


const PacmanSummary = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pacman/juego');
    }, 5000); // 5000ms = 5 segundos

    // Limpiar el timeout si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="pacman-summary-container">
      <div>
        <img className="home-logo" src={Logo} alt="Logo"/>
      </div>
      <div className='container-text-summary'>
        <div className='texto-summary1'>
          RECOGE LOS PUNTOS QUE ESTÁN REPARTIDOS POR EL TABLERO CON CIPO MIENTRAS QUE EVADES LOS TROYANOS
        </div>
        <div className='texto-summary2'>
          TIENES 3 VIDAS PARA LOGRARLO ¡TÚ PUEDES!
        </div>
      </div>
    </div>
  );
};

export default PacmanSummary;
