import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import Point from './Point';
import Board from './Board';
import Maze from './Maze';
import './index.css';
import logo from '../../assets/img/logo.png';
import Layout from './Layout/web'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { markScore, startGame, endGame } from '../../Redux/scores';

const App = () => {

  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boardWidth = isMobile() ? 320 : 600;
  const boardHeight = isMobile() ? 320 : 600;
  const cellSize = isMobile() ? 16 : 30;
  const pointSize = isMobile() ? 10 : 20;
  const numGhosts = 3;
  const ghostSpeed = 200;
  const pointScore = 10;
  const numPoints = 4;

  const [ghosts, setGhosts] = useState([]);
  const [points, setPoints] = useState([]);
  const [eatenPoints, setEatenPoints] = useState(0);
  const [score, setScore] = useState(0);
  const [mazeLayout] = useState(Layout);
  const [pacmanPosition, setPacmanPosition] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [coolDown, setCoolDown] = useState(false);
  const [numLifes, setNumLifes] = useState(3);
  const [isReady, setIsReady] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const username = useSelector( state => state.user.user.fullname);
  

  useEffect(() => {
    // Generar el laberinto y los puntos al cargar
    resetAvatars();
    setPoints(initializePoints());
    setIsReady(true);
    dispatch(startGame());
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
  const initializeGhostAndPacman = () => {
    const pacmanStart = getRandomPassagePosition(mazeLayout, cellSize);
    const ghosts = Array.from({ length: numGhosts }, () => getRandomPassagePosition(mazeLayout, cellSize));
    return { pacmanStart, ghosts };
  };

  const initializePoints = () => {
    return generateRandomPoints(mazeLayout, cellSize, numPoints);
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

    if(gameOver || coolDown) return; 
  
    // Verificar colisión con fantasmas
    for (const ghost of ghosts) {
      if (
        newPosition.x < ghost.x + cellSize &&
        newPosition.x + cellSize > ghost.x &&
        newPosition.y < ghost.y + cellSize &&
        newPosition.y + cellSize > ghost.y
      ) {
        setNumLifes( prev => prev - 1);
        resetAvatars();  // Reset the game
        setCoolDown(true);
        alert("¡Te atrapó un fantasma!");

        setTimeout( () => {
          setCoolDown(false);
        }, 1000)
      
        return; // Terminar la función si hay colisión con un fantasma
      }
    }
  
    // Verificar colisión con puntos
    points.forEach((point, index) => {
      if (
        newPosition.x < point.x + pointSize &&
        newPosition.x + cellSize > point.x &&
        newPosition.y < point.y + pointSize &&
        newPosition.y + cellSize > point.y
      ) {
        // Incrementar el puntaje
        setScore(score + pointScore);
        setEatenPoints( prev => prev + 1);

        dispatch(markScore(pointScore));
  
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


const resetAvatars = () => {
    const { pacmanStart, ghosts } = initializeGhostAndPacman();
    setGhosts(ghosts);
    setPacmanPosition(pacmanStart);
}

  // Actualizar la posición de los fantasmas en cada frame
  useEffect(() => {
    if (coolDown || gameOver) return;
    const interval = setInterval(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) =>
          moveGhostTowardsPacman(ghost)
        )
      );
    }, ghostSpeed); // Actualizar cada 100ms para simular movimiento continuo
  
    return () => clearInterval(interval);
  }, [pacmanPosition, gameOver, coolDown]);

  // useEffect para actualizar la posición de Pacman y verificar colisiones
  useEffect(() => {
    checkCollision(pacmanPosition);
  }, [pacmanPosition, ghosts, points, gameOver, coolDown]); // Dependencias: cuando Pacman, los fantasmas o los puntos cambien
  

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

  useEffect( () => {
    if (gameOver) {
      const timer = setTimeout(() => {
        navigate(`/pacman/resultados?eaten=${eatenPoints}`);
      }, 3000); // 3000ms = 5 segundos

      // Limpiar el timeout si el componente se desmonta antes
      return () => clearTimeout(timer);
    }
  }, [gameOver])

  useEffect( () => {
    if((numLifes == 0 || points.length == 0) && isReady) {
      setGameOver(true);
      dispatch(endGame());
    }
  }, [dispatch, points, numLifes, isReady])

  useEffect(() => {
    // Verificar si el dispositivo es táctil
    const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouchScreen);
  }, []);

  return (
    <div className="Pacman_screen">
      <h1 style={{ textAlign: 'center', color: '#FFF' }}>{ username }</h1>
      <h2 style={{ textAlign: 'center', color: '#FFF' }}>Puntaje: {score}</h2>
      <h3 style={{ textAlign: 'center', color: '#FFF' }}>Te quedan {numLifes} vidas</h3>
      <Board 
        width={boardWidth} 
        height={boardHeight} 
        cellSize={cellSize}>
          <Maze maze={mazeLayout} cellSize={cellSize} />
          
          {ghosts.map((ghost, index) => (
            <Ghost key={index} position={ghost} cellSize={cellSize}/>
          ))}

          {points.map((point, index) => (
            <Point key={index} position={point} size={pointSize}/>
          ))}

          <Pacman position={pacmanPosition} cellSize={cellSize} />
      </Board>

      {isTouchDevice && (
        <div className="controls">
          <button className="control-button up" onClick={() => movePacman('up')}>↑</button>
          <div className="horizontal-buttons">
            <button className="control-button left" onClick={() => movePacman('left')}>←</button>
            <button className="control-button right" onClick={() => movePacman('right')}>→</button>
          </div>
          <button className="control-button down" onClick={() => movePacman('down')}>↓</button>
        </div>
      )}

      {/* Logo del juego */}
      <div className="logo-container">
        <img src={logo} alt="Logo del juego" className="game-logo" />
      </div>
    </div>
  );
};

export default App;
