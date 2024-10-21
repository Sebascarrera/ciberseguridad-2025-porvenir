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
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const symbols = [
    { id: 0, symbol: proteccion }, 
    { id: 1, symbol: seguridad }, 
    { id: 2, symbol: cipo }, 
    { id: 3, symbol: troyano }, 
    { id: 4, symbol: tarjeta }
  ];

  const [slot1, setSlot1] = useState(symbols[0]);
  const [slot2, setSlot2] = useState(symbols[1]);
  const [slot3, setSlot3] = useState(symbols[2]);
  const [message, setMessage] = useState('Recuerda que tienes 6 oportunidades para jugar, entre más preguntas respondas bien, más puntos vas a ganar, ¡Vamos tu puedes!');
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
    const finalSlot = getRandomSymbol(); // Solo obtienes un símbolo final para asegurar que siempre sea igual

    // Asegurar que los tres slots muestren el mismo símbolo (siempre ganar)
    setSlot1(finalSlot);
    setSlot2(finalSlot);
    setSlot3(finalSlot);

    setIsSpinning(false);
    winAudio.current.play(); // Reproducir el sonido de ganar
  };

  useEffect(() => {
    if (isSpinning) return;

    if (slot1.id === slot2.id && slot2.id === slot3.id) {
      // Espera 3 segundos antes de redirigir
      setTimeout(() => {
        navigate(`/jackpot/preguntas?slice=${slot1.id}`);
      }, 2000); // 2 segundos de espera
    }
  }, [slot1, slot2, slot3, isSpinning, navigate]);

  return (
    <div className="jackpot-game">
      <h1></h1>
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
        {isSpinning ? 'Girando...' : 'Jugar'}
      </button>
      <p className='estilos-mensaje-recordatorio'>{message}</p>
      <div className="logo-container">
        <img src={logoCiberseguridad} alt="Game Logo" />
      </div>
    </div>
    
  );
}

export default App;
