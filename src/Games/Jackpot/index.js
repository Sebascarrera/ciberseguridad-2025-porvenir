import React, { useState, useEffect, useRef } from 'react';
import machine from '../../assets/img/machine-jackpot.png';
import seguridad from '../../assets/img/img-jackpot/img-jackpot-1.png';
import proteccion from '../../assets/img/img-jackpot/img-jackpot-2.png';
import cipo from '../../assets/img/img-jackpot/img-jackpot-3.png';
import troyano from '../../assets/img/img-jackpot/img-jackpot-4.png';
import tarjeta from '../../assets/img/img-jackpot/img-jackpot-5.png';
import logoCiberseguridad from '../../assets/img/logo-ciberseguridad.png';
import spinSound from '../../assets/sounds/spinSound.mp3'; // Sonido de girar
import winSound from '../../assets/sounds/winSound.mp3'; // Sonido de ganar

import './jackpot.css';

function App() {
  const symbols = [
    { id: 1, symbol: seguridad }, 
    { id: 2, symbol: proteccion }, 
    { id: 3, symbol: cipo }, 
    { id: 4, symbol: troyano }, 
    { id: 5, symbol: tarjeta }];

  const [slot1, setSlot1] = useState(symbols[0]);
  const [slot2, setSlot2] = useState(symbols[1]);
  const [slot3, setSlot3] = useState(symbols[2]);
  const [message, setMessage] = useState('¡Buena suerte!');
  const [isSpinning, setIsSpinning] = useState(false);

  const spinAudio = useRef(new Audio(spinSound)); // Referencia al sonido de girar
  const winAudio = useRef(new Audio(winSound)); // Referencia al sonido de ganar

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const spin = () => {
    setIsSpinning(true);
    const spinDuration = 2000;
    const spinInterval = 100;
    let spinTime = 0;

    const spinSlots = setInterval(() => {
      setSlot1(getRandomSymbol());
      setSlot2(getRandomSymbol());
      setSlot3(getRandomSymbol());
      spinTime += spinInterval;

      if (spinTime >= spinDuration) {
        clearInterval(spinSlots);
        spinAudio.current.pause(); // Detener el sonido cuando termine de girar
        spinAudio.current.currentTime = 0; // Reiniciar el sonido para la próxima vez
        showFinalResult();
      }
    }, spinInterval);
  };

  const showFinalResult = () => {
    const finalSlot1 = getRandomSymbol();
    const finalSlot2 = getRandomSymbol();
    const finalSlot3 = getRandomSymbol();

    const shouldWin = Math.random() < 0.5;
    if (shouldWin) {
      setSlot1(finalSlot1);
      setSlot2(finalSlot1);
      setSlot3(finalSlot1);
    } else {
      setSlot1(finalSlot1);
      setSlot2(finalSlot2);
      setSlot3(finalSlot3);
    }

    setIsSpinning(false);
  };

  useEffect( () => {

    if (isSpinning) return;

    if (slot1.id == slot2.id && slot2.id == slot3.id) {
      setMessage('¡Ganaste!');
      winAudio.current.play(); // Reproducir el sonido de ganar
    } else {
      setMessage('Inténtalo de nuevo');
    }
  }, [slot1, slot2, slot3, isSpinning])

  return (
    <div className="jackpot-game">
      <h1>Juego de Jackpot</h1>
      <div className="machine-slot">
        <img src={machine} alt="machine jackpot" />
        <div className="slot-machine">
          <div className={`slot ${isSpinning ? 'spinning' : ''}`}>
            <img src={slot1.symbol} alt="symbol 1" />
          </div>
          <div className={`slot ${isSpinning ? 'spinning' : ''}`}>
            <img src={slot2.symbol} alt="symbol 2" />
          </div>
          <div className={`slot ${isSpinning ? 'spinning' : ''}`}>
            <img src={slot3.symbol} alt="symbol 3" />
          </div>
        </div>
      </div>

      <button onClick={spin} disabled={isSpinning}>
        {isSpinning ? 'Girando...' : 'Girar'}
      </button>
      <p>{message}</p>
      <div className="logo-container">
        <img src={logoCiberseguridad} alt="Game Logo" />
      </div>
    </div>
    
  );
}

export default App;
