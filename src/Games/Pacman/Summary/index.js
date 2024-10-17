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
        RECOGE LOS PUNTOS QUE ESTÁN REPARTIDOS POR EL TABLERO CON CIPO MIENTRAS QUE EVADES LOS TROYANOS
      </div>
      <div>
        TIENES 3 VIDAS PARA LOGRARLO ¡TU PUEDES!
      </div>
    </div>
  );
};

export default Home;
