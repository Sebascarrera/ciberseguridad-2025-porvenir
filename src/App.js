import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Point from './Point';
import Board from './Board';
import './App.css';
import logo from './assets/img/logo.png'; // Asegúrate de tener el logo en tu carpeta de proyecto


const App = () => {
  const boardWidth = 400;  // Ancho del tablero
  const boardHeight = 650; // Alto del tablero
  const cellSize = 20; // Cada celda será de 20x20 píxeles

  const [ghosts, setGhosts] = useState([
    { x: 40, y: 40, type: 'chaser' },
    { x: 180, y: 40, type: 'random' },
    { x: 320, y: 40, type: 'chaser' },
  ]);
  const [points, setPoints] = useState([]);
  const [score, setScore] = useState(0);
  const [mazeLayout, setMazeLayout] = useState(generateMaze());
  const [pacmanPosition, setPacmanPosition] = useState(initializePacmanPosition());

  // Generar el laberinto con paredes internas
  function generateMaze() {
    const rows = Math.floor(boardHeight / cellSize);
    const cols = Math.floor(boardWidth / cellSize);
    const maze = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Agregar paredes alrededor del borde
    for (let row = 0; row < rows; row++) {
      maze[row][0] = 1; // Pared izquierda
      maze[row][cols - 1] = 1; // Pared derecha
    }
    for (let col = 0; col < cols; col++) {
      maze[0][col] = 1; // Pared superior
      maze[rows - 1][col] = 1; // Pared inferior
    }

    // Crear el laberinto interno
    for (let row = 1; row < rows - 1; row += 2) {
      for (let col = 1; col < cols - 1; col += 2) {
        maze[row][col] = 1; // Crear una pared en una celda

        // Elegir una dirección aleatoria para crear una pared
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
          case 0: // Arriba
            if (row - 1 > 0) maze[row - 1][col] = 1;
            break;
          case 1: // Abajo
            if (row + 1 < rows - 1) maze[row + 1][col] = 1;
            break;
          case 2: // Izquierda
            if (col - 1 > 0) maze[row][col - 1] = 1;
            break;
          case 3: // Derecha
            if (col + 1 < cols - 1) maze[row][col + 1] = 1;
            break;
          default:
            break;
        }
      }
    }

    return maze;
  }

  // Inicializar la posición de Pacman lejos de los fantasmas
  function initializePacmanPosition() {
    const rows = Math.floor(boardHeight / cellSize);
    const cols = Math.floor(boardWidth / cellSize);
    
    let validPositionFound = false;
    let pacmanPosition = { x: 0, y: 0 };

    while (!validPositionFound) {
      // Generar una posición aleatoria
      pacmanPosition.x = Math.floor(Math.random() * (cols - 2)) * cellSize + cellSize; // Evitar el borde
      pacmanPosition.y = Math.floor(Math.random() * (rows - 2)) * cellSize + cellSize; // Evitar el borde

      // Verificar que la posición no esté cerca de los fantasmas
      validPositionFound = ghosts.every(ghost => {
        const distance = Math.sqrt(
          (pacmanPosition.x - ghost.x) ** 2 +
          (pacmanPosition.y - ghost.y) ** 2
        );
        return distance > 100; // Distancia mínima de 100 píxeles
      });
    }

    return pacmanPosition;
  }

  // Función para generar puntos aleatorios, evitando las paredes
  function generateRandomPoints(num) {
    const newPoints = [];
    while (newPoints.length < num) {
      const randomX = Math.floor(Math.random() * (boardWidth / cellSize)) * cellSize;
      const randomY = Math.floor(Math.random() * (boardHeight / cellSize)) * cellSize;

      const row = Math.floor(randomY / cellSize);
      const col = Math.floor(randomX / cellSize);

      // Verificar que la posición no sea una pared
      if (mazeLayout[row][col] === 0) {
        newPoints.push({ x: randomX, y: randomY });
      }
    }
    return newPoints;
  }

  useEffect(() => {
    // Generar el laberinto y los puntos al cargar
    setMazeLayout(generateMaze());
    setPoints(generateRandomPoints(5));
  }, []);

  const handleKeyDown = (e) => {
    movePacman(e.key);
  };

  const movePacman = (direction) => {
    let { x, y } = pacmanPosition;
    const step = cellSize * 2; // Ampliar el movimiento para que el camino sea más ancho
  
    const newPosition = { ...pacmanPosition };
  
    switch (direction) {
      case 'ArrowUp':
        if (!isWall(x, y - step)) newPosition.y = y - step;
        break;
      case 'ArrowDown':
        if (!isWall(x, y + step)) newPosition.y = y + step;
        break;
      case 'ArrowLeft':
        if (!isWall(x - step, y)) newPosition.x = x - step;
        break;
      case 'ArrowRight':
        if (!isWall(x + step, y)) newPosition.x = x + step;
        break;
      default:
        break;
    }
  
    setPacmanPosition(newPosition);
    checkCollisions(newPosition);
  };
  

  const isWall = (x, y) => {
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);
    return mazeLayout[row] && mazeLayout[row][col] === 1;
  };

  const checkCollisions = (newPosition) => {
    for (const ghost of ghosts) {
      if (
        newPosition.x < ghost.x + 40 &&
        newPosition.x + 40 > ghost.x &&
        newPosition.y < ghost.y + 40 &&
        newPosition.y + 40 > ghost.y
      ) {
        alert("¡Te atrapó un fantasma!");
        setPacmanPosition(initializePacmanPosition());
        setScore(0);
      }
    }

    points.forEach((point, index) => {
      if (
        newPosition.x < point.x + 10 &&
        newPosition.x + 40 > point.x &&
        newPosition.y < point.y + 10 &&
        newPosition.y + 40 > point.y
      ) {
        setScore(score + 1);
        const newPoints = [...points];
        newPoints.splice(index, 1);
        newPoints.push({
          x: Math.floor(Math.random() * (boardWidth / cellSize)) * cellSize,
          y: Math.floor(Math.random() * (boardHeight / cellSize)) * cellSize,
        });
        setPoints(newPoints);
      }
    });
  };

  // Modificación del movimiento de los fantasmas para tener en cuenta las paredes
useEffect(() => {
  const interval = setInterval(() => {
    setGhosts((prevGhosts) => prevGhosts.map((ghost) => {
      if (ghost.type === 'chaser') {
        const directionX = pacmanPosition.x - ghost.x;
        const directionY = pacmanPosition.y - ghost.y;
        const step = 5;

        const distance = Math.sqrt(directionX * directionX + directionY * directionY);
        const moveX = distance > step ? (directionX / distance) * step : directionX;
        const moveY = distance > step ? (directionY / distance) * step : directionY;

        const newX = ghost.x + moveX;
        const newY = ghost.y + moveY;

        // Comprobar si hay una pared en la nueva posición del fantasma
        if (!isWall(newX, ghost.y)) {
          ghost.x = newX;
        }
        if (!isWall(ghost.x, newY)) {
          ghost.y = newY;
        }

        return ghost; // Devolver la nueva posición del fantasma
      } else if (ghost.type === 'random') {
        const randomDirection = Math.floor(Math.random() * 4);
        const step = 5;
        let newX = ghost.x;
        let newY = ghost.y;

        switch (randomDirection) {
          case 0: 
            if (!isWall(ghost.x, ghost.y - step)) newY = ghost.y - step;
            break;
          case 1: 
            if (!isWall(ghost.x, ghost.y + step)) newY = ghost.y + step;
            break;
          case 2: 
            if (!isWall(ghost.x - step, ghost.y)) newX = ghost.x - step;
            break;
          case 3: 
            if (!isWall(ghost.x + step, ghost.y)) newX = ghost.x + step;
            break;
          default:
            break;
        }

        return {
          x: newX,
          y: newY,
          type: ghost.type,
        };
      }
    }));
  }, 100);

  return () => clearInterval(interval);
}, [pacmanPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pacmanPosition]);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#FFF' }}>Pacman Game</h1>
      <h2 style={{ textAlign: 'center', color: '#FFF' }}>Puntaje: {score}</h2>
      <Board maze={mazeLayout}>
        <Pacman position={pacmanPosition} />
        {ghosts.map((ghost, index) => (
          <Ghost key={index} position={ghost} />
        ))}
        {points.map((point, index) => (
          <Point key={index} position={point} />
        ))}
      </Board>

      {/* Controles de Pacman */}
      <div className="controls">
        <button className="control-button up" onClick={() => movePacman('ArrowUp')}>↑</button>
        <div className="horizontal-buttons">
          <button className="control-button left" onClick={() => movePacman('ArrowLeft')}>←</button>
          <button className="control-button right" onClick={() => movePacman('ArrowRight')}>→</button>
        </div>
        <button className="control-button down" onClick={() => movePacman('ArrowDown')}>↓</button>
      </div>

      {/* Logo del juego */}
      <div className="logo-container">
        <img src={logo} alt="Logo del juego" className="game-logo" />
      </div>
    </div>
  );
};

export default App;
