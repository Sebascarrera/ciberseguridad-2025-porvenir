import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Point from './Point';
import Board from './Board';
import Maze from './Maze';
import './index.css';
import logo from '../../assets/img/logo.png';
import Layout from './Layout/touch'


const App = () => {
  const boardWidth = 570;  // Ancho del tablero
  const boardHeight = 1140; // Alto del tablero
  const cellSize = 29; // Cada celda será de 20x20 píxeles
  const numGhosts = 3;
  const ghostSpeed = 200;

  const [ghosts, setGhosts] = useState([]);
  const [points, setPoints] = useState([]);
  const [score, setScore] = useState(0);
  const [mazeLayout] = useState(Layout);
  const [pacmanPosition, setPacmanPosition] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Generar el laberinto y los puntos al cargar
    reset();
  }, [mazeLayout]);

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

  // Función para generar puntos en pasillos aleatorios, asegurando que no están en paredes
  const generateRandomPoints = (maze, cellSize, maxPoints) => {
    const points = [];
    let availablePassages = [];

    // Recorremos el laberinto para encontrar todas las posiciones de los pasillos
    maze.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) { // Solo si es un pasillo
          availablePassages.push({
            x: colIndex * cellSize + cellSize / 2, // Centro del pasillo
            y: rowIndex * cellSize + cellSize / 2
          });
        }
      });
    });

    // Elegimos posiciones aleatorias de los pasillos sin repetir
    while (points.length < maxPoints && availablePassages.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePassages.length);
      points.push(availablePassages[randomIndex]);

      // Eliminamos la posición para no repetirla
      availablePassages.splice(randomIndex, 1);
    }

    return points;
  };


  // Función para inicializar las posiciones de Pacman, fantasmas y puntos
  const initializeEntities = (maze, cellSize, numGhosts) => {
    const pacmanStart = getRandomPassagePosition(maze, cellSize);
    
    // Generar varios fantasmas
    const ghosts = Array.from({ length: numGhosts }, () => getRandomPassagePosition(maze, cellSize));

    const points = generateRandomPoints(maze, cellSize, 5);

    return { pacmanStart, ghosts, points };
  };

  // Función para mover Pacman
  const moveEntity = (position, direction) => {
    let { x, y } = position;
  
    // Actualizar la posición en función de la dirección
    switch (direction) {
      case 'up':
        y -= cellSize;
        break;
      case 'down':
        y += cellSize;
        break;
      case 'left':
        x -= cellSize;
        break;
      case 'right':
        x += cellSize;
        break;
      default:
        break;
    }
  
    // Verificar si el nuevo movimiento colisionaría con una pared
    if (!isWall(x, y)) {
      return { x, y }; // Devolver nueva posición si no hay colisión
    }
    
    return position; // Mantener la posición original si hay colisión
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
  

  const checkCollision = (newPosition) => {

    if(gameOver) return; 
    // Tamaños dinámicos para Pacman y los fantasmas (ajusta según el tamaño real de los sprites)
    const pacmanSize = 40; // Tamaño de Pacman
    const ghostSize = 40;  // Tamaño de los fantasmas
    const pointSize = 10;  // Tamaño de los puntos
  
    // Verificar colisión con fantasmas
    for (const ghost of ghosts) {
      if (
        newPosition.x < ghost.x + ghostSize &&
        newPosition.x + pacmanSize > ghost.x &&
        newPosition.y < ghost.y + ghostSize &&
        newPosition.y + pacmanSize > ghost.y
      ) {

        setGameOver(true)
        reset();  // Reset the game
        alert("¡Te atrapó un fantasma!");

        setTimeout(() => {
            setGameOver(false); // Re-enable the game
        }, 1000); // Cooldown period to prevent multiple alerts


        return; // Terminar la función si hay colisión con un fantasma
      }
    }
  
    // Verificar colisión con puntos
    points.forEach((point, index) => {
      if (
        newPosition.x < point.x + pointSize &&
        newPosition.x + pacmanSize > point.x &&
        newPosition.y < point.y + pointSize &&
        newPosition.y + pacmanSize > point.y
      ) {
        // Incrementar el puntaje
        setScore(score + 1);
  
        // Eliminar el punto recolectado
        const newPoints = [...points];
        newPoints.splice(index, 1);
  
        setPoints(newPoints);
      }
    });
  };
  
  const aStarPathfinding = (start, goal) => {
    const openList = [];
    const closedList = [];
    const startNode = { x: start.x, y: start.y, g: 0, h: heuristic(start, goal), f: 0, parent: null };
    startNode.f = startNode.g + startNode.h;
    openList.push(startNode);

    const neighbors = (node) => {
        const directions = [
            { x: 0, y: -cellSize }, // up
            { x: 0, y: cellSize },  // down
            { x: -cellSize, y: 0 }, // left
            { x: cellSize, y: 0 },  // right
        ];
        return directions
            .map(dir => ({ x: node.x + dir.x, y: node.y + dir.y }))
            .filter(pos => !isWall(pos.x, pos.y)); // Solo posiciones válidas (no pared)
    };

    while (openList.length > 0) {
        const currentNode = openList.reduce((a, b) => (a.f < b.f ? a : b)); // Nodo con el f más bajo

        if (currentNode.x === goal.x && currentNode.y === goal.y) {
            // Reconstruir el camino desde el goal hacia el start
            let path = [];
            let current = currentNode;
            while (current) {
                path.unshift({ x: current.x, y: current.y });
                current = current.parent;
            }
            return path; // Retorna el camino hacia Pacman
        }

        // Mover el nodo actual de openList a closedList
        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        neighbors(currentNode).forEach(neighbor => {
            if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) return;

            const gScore = currentNode.g + cellSize; // Costo para moverse al vecino
            const neighborNode = {
                ...neighbor,
                g: gScore,
                h: heuristic(neighbor, goal),
                f: gScore + heuristic(neighbor, goal),
                parent: currentNode
            };

            const openNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
            if (!openNode || gScore < openNode.g) {
                openList.push(neighborNode);
            }
        });
    }

    return []; // No se encontró camino
};

const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Distancia Manhattan

const moveGhostTowardsPacman = (ghost) => {
    const path = aStarPathfinding(ghost, pacmanPosition);
    if (path.length > 1) {
        return { x: path[1].x, y: path[1].y }; // Mover hacia el siguiente nodo
    }
    return ghost; // Mantener posición si no hay camino
};


const reset = () => {
    const { pacmanStart, ghosts, points } = initializeEntities(mazeLayout, cellSize, numGhosts);
    setPoints(points);
    setGhosts(ghosts);
    setScore(0);
    setPacmanPosition(pacmanStart);
}

     
  
  // Actualizar la posición de los fantasmas en cada frame
  useEffect(() => {
    const interval = setInterval(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) =>
          moveGhostTowardsPacman(ghost)
        )
      );
    }, ghostSpeed); // Actualizar cada 100ms para simular movimiento continuo
  
    return () => clearInterval(interval);
  }, [pacmanPosition]);

  // useEffect para actualizar la posición de Pacman y verificar colisiones
  useEffect(() => {
    const interval = setInterval(() => {
      checkCollision(pacmanPosition);
    }, 100); // Este intervalo puede ajustarse dependiendo de la velocidad del juego

    return () => clearInterval(interval);
  }, [pacmanPosition, ghosts, points]); // Dependencias: cuando Pacman, los fantasmas o los puntos cambien
  

  const movePacman = (direction) => {
    const newPosition = moveEntity(pacmanPosition, direction);
    setPacmanPosition(newPosition);
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
    <div className="Pacman_screen">
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
        <button className="control-button up" onClick={() => movePacman('up')}>↑</button>
        <div className="horizontal-buttons">
          <button className="control-button left" onClick={() => movePacman('left')}>←</button>
          <button className="control-button right" onClick={() => movePacman('right')}>→</button>
        </div>
        <button className="control-button down" onClick={() => movePacman('down')}>↓</button>
      </div>

      {/* Logo del juego */}
      <div className="logo-container">
        <img src={logo} alt="Logo del juego" className="game-logo" />
      </div>
    </div>
  );
};

export default App;
