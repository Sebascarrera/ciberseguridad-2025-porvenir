import React, { useState, useEffect } from 'react';
import './jackpot.css';

function App() {
  const symbols = ['🍒', '🍋', '🍉', '🍇', '⭐', '🍀'];
  const [slot1, setSlot1] = useState('🍒');
  const [slot2, setSlot2] = useState('🍋');
  const [slot3, setSlot3] = useState('🍉');
  const [message, setMessage] = useState('¡Buena suerte!');
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  // Función que controla el giro de los slots
  const spin = () => {
    setIsSpinning(true); // Comienza el giro

    const spinDuration = 2000; // Duración total del giro en milisegundos
    const spinInterval = 100; // Intervalo en el que cambian los símbolos durante el giro

    let spinTime = 0;

    const spinSlots = setInterval(() => {
      setSlot1(getRandomSymbol());
      setSlot2(getRandomSymbol());
      setSlot3(getRandomSymbol());
      spinTime += spinInterval;

      if (spinTime >= spinDuration) {
        clearInterval(spinSlots); // Detiene el giro cuando alcanza la duración total
        showFinalResult();
      }
    }, spinInterval);
  };

  // Función que muestra el resultado final
  const showFinalResult = () => {
    const finalSlot1 = getRandomSymbol();
    const finalSlot2 = getRandomSymbol();
    const finalSlot3 = getRandomSymbol();
  
    // Aumentar la probabilidad de ganar (50% de chance)
    const shouldWin = Math.random() < 0.5;  // Cambia 0.5 a un valor más alto o más bajo para ajustar la probabilidad
    if (shouldWin) {
      // Forzar una combinación ganadora
      setSlot1(finalSlot1);
      setSlot2(finalSlot1);
      setSlot3(finalSlot1);
    } else {
      // Resultados aleatorios
      setSlot1(finalSlot1);
      setSlot2(finalSlot2);
      setSlot3(finalSlot3);
    }
  
    setIsSpinning(false);
  
    // Mensaje final
    if (finalSlot1 === finalSlot2 && finalSlot2 === finalSlot3) {
      setMessage('¡Ganaste!');
    } else {
      setMessage('Inténtalo de nuevo');
    }
  };

  return (
    <div className="jackpot-game">
      <h1>Juego de Jackpot</h1>
      <div className="slot-machine">
        <div className={`slot ${isSpinning ? 'spinning' : ''}`}>{slot1}</div>
        <div className={`slot ${isSpinning ? 'spinning' : ''}`}>{slot2}</div>
        <div className={`slot ${isSpinning ? 'spinning' : ''}`}>{slot3}</div>
      </div>
      <button onClick={spin} disabled={isSpinning}>
        {isSpinning ? 'Girando...' : 'Girar'}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
