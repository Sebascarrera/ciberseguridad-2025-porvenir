import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearCurrentScore } from '../../../Redux/scores';
import Logo from '../../../assets/img/logo-fondo-blanco-ciberseguridad2024.png'

const PacmanScore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector( state => state.user.user.fullname );
  const score = useSelector( state => state.scores.current );

  useEffect(() => {

    dispatch(saveScore('pacman'));

    const timer = setTimeout(() => {
      dispatch(clearCurrentScore());
      navigate('/selector');
    }, 5000); // 5000ms = 5 segundos

    // Limpiar el timeout si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="pacman-summary-container">
        <div>
        <img className="home-logo" src={Logo} alt="Logo"/>
        </div>
        <div className='texto-felicitaciones'>
            FELICITACIONES
        </div>
        <div className='texto-username'>
            { username }
        </div>
        <div className='texto-tu-puntaje-pacman'>
            TU PUNTAJE FINAL ES DE:
        </div>
        <div className='texto-puntos-pacman'>
            { score } PTS
        </div>
    </div>
  );
};

export default PacmanScore;
