import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Home = () => {
  const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate('/pacman/juego');
//     }, 5000); // 5000ms = 5 segundos

//     // Limpiar el timeout si el componente se desmonta antes
//     return () => clearTimeout(timer);
//   }, [navigate]);

  return (
    <div className="pacman-summary-container">
        <div>
            FELICITACIONES
        </div>
        <div>
            nombre
        </div>
        <div>
            TU PUNTAJE FINAL ES DE:
        </div>
        <div>
            500 PTS
        </div>
    </div>
  );
};

export default Home;
