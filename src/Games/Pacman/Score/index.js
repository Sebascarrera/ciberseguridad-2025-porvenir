import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearCurrentScore } from '../../../Redux/scores';

const Home = () => {
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
            FELICITACIONES
        </div>
        <div>
            { username }
        </div>
        <div>
            TU PUNTAJE FINAL ES DE:
        </div>
        <div>
            { score } PTS
        </div>
    </div>
  );
};

export default Home;
