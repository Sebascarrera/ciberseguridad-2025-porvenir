import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Point from './Point';
import Board from './Board';
import Maze from './Maze';
import './App.css';
import logo from './assets/img/logo.png'; // Asegúrate de tener el logo en tu carpeta de proyecto


const App = () => {
  const boardWidth = 400;  // Ancho del tablero
  const boardHeight = 650; // Alto del tablero
  const cellSize = 40; // Cada celda será de 20x20 píxeles
  const numGhosts = 3;

  const [ghosts, setGhosts] = useState([]);
  const [points, setPoints] = useState([]);
  const [score, setScore] = useState(0);
  const [mazeLayout, setMazeLayout] = useState(generateMazeDFS());
  const [pacmanPosition, setPacmanPosition] = useState([]);

  useEffect(() => {
    // Generar el laberinto y los puntos al cargar
    const { pacmanStart, ghosts, points } = initializeEntities(mazeLayout, cellSize, numGhosts);
    setPoints(points);
    setGhosts(ghosts);
    setPacmanPosition(pacmanStart);

  }, [mazeLayout]);

  function generateMazeDFS() {
    const rows = Math.floor(boardHeight / cellSize);
    const cols = Math.floor(boardWidth / cellSize);
    
    // Inicialmente, todo el laberinto son paredes
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1)); 
    
    // Dirección de movimiento: arriba, abajo, izquierda, derecha
    const directions = [
      [-2, 0], // Arriba
      [2, 0],  // Abajo
      [0, -2], // Izquierda
      [0, 2],  // Derecha
    ];
  
    // Función auxiliar para verificar si la celda está dentro de los límites
    const isValid = (x, y) => x > 0 && y > 0 && x < rows - 1 && y < cols - 1;
  
    // Algoritmo DFS para generar el laberinto
    function dfs(x, y) {
      maze[x][y] = 0; // Abrir la celda actual
      
      // Mezclar las direcciones para un laberinto aleatorio
      directions.sort(() => Math.random() - 0.5);
      
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (isValid(nx, ny) && maze[nx][ny] === 1) {
          // Eliminar la pared entre la celda actual y la siguiente
          maze[(x + nx) / 2][(y + ny) / 2] = 0;
          // Llamar recursivamente para la siguiente celda
          dfs(nx, ny);
        }
      }
    }
  
    // Iniciar DFS desde una posición aleatoria en el laberinto
    const startX = Math.floor(Math.random() * (rows / 2)) * 2 + 1;
    const startY = Math.floor(Math.random() * (cols / 2)) * 2 + 1;
    
    dfs(startX, startY);
    
    return maze;
  }

  const getRandomPassagePosition = (maze, cellSize) => {
    let row, col;
  
    do {
      row = Math.floor(Math.random() * maze.length);
      col = Math.floor(Math.random() * maze[0].length);
    } while (maze[row][col] !== 0); // Asegurarse de que la celda es un pasillo
  
    // Convertir las coordenadas de la celda en coordenadas en píxeles para el canvas
    return {
      x: col * cellSize,
      y: row * cellSize
    };
  };

  // Función para inicializar las posiciones de Pacman, fantasmas y puntos
  const initializeEntities = (maze, cellSize, numGhosts) => {
    const pacmanStart = getRandomPassagePosition(maze, cellSize);
    
    // Generar varios fantasmas
    const ghosts = Array.from({ length: numGhosts }, () => getRandomPassagePosition(maze, cellSize));

    const points = [];

    // Colocar los puntos en todas las celdas de pasillos
    maze.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) { // Solo en los pasillos
          points.push({
            x: colIndex * cellSize + cellSize / 2, // Centramos el punto en la celda
            y: rowIndex * cellSize + cellSize / 2
          });
        }
      });
    });

    return { pacmanStart, ghosts, points };
  };

  // Función para mover Pacman
  const movePacman = (direction) => {
    let newX = pacmanPosition.x;
    let newY = pacmanPosition.y;

    // Actualizar la posición de Pacman en función de la dirección
    switch (direction) {
      case 'up':
        newY -= cellSize;
        break;
      case 'down':
        newY += cellSize;
        break;
      case 'left':
        newX -= cellSize;
        break;
      case 'right':
        newX += cellSize;
        break;
      default:
        break;
    }

    // Verificar si el nuevo movimiento colisionaría con una pared
    if (!isWall(newX, newY)) {
      setPacmanPosition({ x: newX, y: newY });
    }
  };

  const isWall = (x, y) => {
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);
    // Comprobar si la celda está dentro del rango del laberinto
    if (row >= 0 && row < mazeLayout.length && col >= 0 && col < mazeLayout[0].length) {
      return mazeLayout[row][col] === 1; // Devuelve true si es una pared
    }
    return true; // Considerar fuera de los límites como pared
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

  // Manejar las teclas de movimiento (WASD o flechas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          movePacman('up');
          break;
        case 'ArrowDown':
        case 's':
          movePacman('down');
          break;
        case 'ArrowLeft':
        case 'a':
          movePacman('left');
          break;
        case 'ArrowRight':
        case 'd':
          movePacman('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pacmanPosition]);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#FFF' }}>Pacman Game</h1>
      <h2 style={{ textAlign: 'center', color: '#FFF' }}>Puntaje: {score}</h2>
      <Board 
        width={boardWidth} 
        height={boardHeight} 
        cellSize={cellSize}>
          <Maze maze={mazeLayout} cellSize={cellSize} />
          
          {ghosts.map((ghost, index) => (
            <Ghost key={index} position={ghost} cellSize={cellSize}/>
          ))}

          {points.map((point, index) => (
            <Point key={index} position={point} size={20}/>
          ))}

          <Pacman position={pacmanPosition} cellSize={cellSize} />
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
