import React, { useState, useEffect, useRef } from 'react';
import './SnakeBoard.css';
import Snake from './Snake';
import Food from './SnakeFood';
import GameOverMessage from './SnakeGameOverMessage';
import styled from 'styled-components';
const Board = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const boardRef = useRef();

  const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setSpeed(100);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        case 'a':
        case 'A':
          if (!gameStarted) {
            startGame();
          }
          break;
        case 'r':
        case 'R':
          if (gameOver) {
            startGame();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      if (head.x === food.x && head.y === food.y) {
        // Snake eats food, grow the snake
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        });
      } else {
        // Remove the tail of the snake
        newSnake.pop();
      }

      // Check if snake hits walls or itself
      if (
        head.x < 0 ||
        head.x >= 20 ||
        head.y < 0 ||
        head.y >= 20 ||
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      }

      newSnake.unshift(head);
      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, speed, gameStarted]);

  return (
    <div className="GameWrapper">
      <div className="BoardContainer" ref={boardRef}>
        <Snake snake={snake} />
        <Food food={food} />
        {gameOver && <GameOverMessage />}
        {!gameStarted && !gameOver && 
        <MessageContainer>
          <h2 style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>Start the Game</h2>
          <p>Press A to restart</p>
        </MessageContainer>}
      </div>
    </div>
  );
};

export default Board;
