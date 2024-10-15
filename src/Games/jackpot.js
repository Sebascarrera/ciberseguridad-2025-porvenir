import React, { useState } from 'react';
import 'pacman-antifraude/src/Games/jackpot.css';

function App() {
  const symbols = ['🍒', '🍋', '🍉', '🍇', '⭐', '🍀']; // símbolos de la tragamonedas
  const [slot1, setSlot1] = useState('');
  const [slot2, setSlot2] = useState('');
  const [slot3, setSlot3] = useState('');
  const [message, setMessage] = useState('¡Buena suerte!');

  const spin = () => {
    const newSlot1 = symbols[Math.floor(Math.random() * symbols.length)];
    const newSlot2 = symbols[Math.floor(Math.random() * symbols.length)];
    const newSlot3 = symbols[Math.floor(Math.random() * symbols.length)];
    setSlot1(newSlot1);
    setSlot2(newSlot2);
    setSlot3(newSlot3);

    if (newSlot1 === newSlot2 && newSlot2 === newSlot3) {
      setMessage('¡Ganaste!');
    } else {
      setMessage('Inténtalo de nuevo');
    }
  };

  return (
    <div className="jackpot-game">
      <h1>Juego de Jackpot</h1>
      <div className="slot-machine">
        <div className="slot">{slot1}</div>
        <div className="slot">{slot2}</div>
        <div className="slot">{slot3}</div>
      </div>
      <button onClick={spin}>Girar</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
