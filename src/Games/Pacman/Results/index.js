import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

import Card1  from '../../../assets/img/pacman-mensaje1.png'
import Card2  from '../../../assets/img/pacman-mensaje2.png'
import Card3  from '../../../assets/img/pacman-mensaje3.png'
import Card4  from '../../../assets/img/pacman-mensaje4.png'

const PacmanResults = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const availableCards = [Card1, Card2, Card3, Card4];

  const [cards, setCards] = useState([]);

  function getUniqueRandomIndexes(arr, numIndexes) {
    const uniqueIndexes = new Set();

    while (uniqueIndexes.size < numIndexes) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        uniqueIndexes.add(randomIndex); // El `Set` solo guarda valores únicos
    }

    return Array.from(uniqueIndexes); // Convertir a arreglo
}

  useEffect(() => {
    // Obtener los query parameters de la URL
    const params = new URLSearchParams(location.search);

    // Obtener el valor del parámetro 'name'
    const eaten = params.get('eaten');
    const indexes = [];
    if (eaten) {

        if (eaten == 0) {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            setCards([availableCards[randomIndex]]);
            return;
        }

        const randomIndexes = getUniqueRandomIndexes(availableCards, eaten);
        setCards(randomIndexes.map(index => availableCards[index]));
    }
  }, [location.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pacman/puntaje');
    }, 5000); // 5000ms = 5 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="pacman-results-container">
      <div>
            {/* Logo */}
      </div>
      <div>
        <p>Hiciste un trabajo excelente evitando ser victima de las distintas</p>
        <p>Técnicas de Fraude</p>
      </div>
      <div className='pacman-results-cards'>
            { cards.map( card => (
                <div>
                    <img src={card} />
                </div>
            ))}
      </div>
      
    </div>
  );
};

export default PacmanResults;
