import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

import Card1  from '../../../assets/img/pacman-mensaje1.png'
import Card2  from '../../../assets/img/pacman-mensaje2.png'
import Card3  from '../../../assets/img/pacman-mensaje3.png'
import Card4  from '../../../assets/img/pacman-mensaje4.png'
import troyanoPerdiste from '../../../assets/img/troyano-perdiste.png'

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

    // Obtener el valor del parámetro 'eaten'
    const eaten = params.get('eaten');

    if (eaten) {
      if (eaten == 0) {
        // Mostrar la imagen troyano-perdiste.png si eaten es 0
        setCards([troyanoPerdiste]); // Directamente la imagen
        return;
      }

      const randomIndexes = getUniqueRandomIndexes(availableCards, eaten);
      setCards(randomIndexes.map(index => availableCards[index]));
    }
  }, [location.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pacman/puntaje');
    }, 20000); // 20000ms = 20 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
      <div className='container-todo-frases'>
        <div className="pacman-results-container">
        <div>
              {/* Logo */}
        </div>
        <div className='texto-buen-trabajo'>
          <p>Hiciste un trabajo excelente evitando ser victima de las distintas</p>
          <p className='titulo-tecnicas-fraude'>Técnicas de Fraude</p>
        </div>
        <div className='pacman-results-cards'>
          {cards.map((card, index) => (
            <div key={index}>
              <img src={card} alt={`Resultado ${index}`} />
            </div>
          ))}
        </div>  
      </div>
      </div>
    
  );
};

export default PacmanResults;
