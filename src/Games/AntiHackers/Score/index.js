import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearCurrentScore } from '../../../Redux/scores';
import Logo from '../../../assets/img/logo-fondo-blanco-ciberseguridad2024.png'
import { resetMundos } from '../Redux';
import FinalAntiHackerImage from '../../../assets/img/img-antihackers/img-final-puntaje.png';

const AntiHackersScore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const score = useSelector( state => state.scores.current );

  useEffect(() => {

    dispatch(saveScore('antihackers'));

    const timer = setTimeout(() => {
      dispatch(clearCurrentScore());
      dispatch(resetMundos());
      navigate('/selector');
    }, 5000); // 5000ms = 5 segundos

    // Limpiar el timeout si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="antihacker-score-container">
        <div>
            <img src={FinalAntiHackerImage} />
        </div>
        <div>
            <img src={Logo} alt="Logo"/>
            <div className='texto-felicitaciones'>
                Felicitaciones
            </div>
            <div className='texto-tu-puntaje'>
                Total puntaje:
            </div>
            <div className='texto-puntos'>
                { score } pts
            </div>
        </div>
        
    </div>
  );
};

export default AntiHackersScore;
