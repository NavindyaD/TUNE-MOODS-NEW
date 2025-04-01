import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Snake from './Snake1';
import Food from './SnakeFood1';
import GameOverMessage from './SnakeGameOverMessage1';

const BoardContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 2px solid #333;
  position: relative;
  background-color: #f4f4f4;
  background-image: linear-gradient(45deg, #e3e3e3 25%, transparent 25%),
                    linear-gradient(-45deg, #e3e3e3 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #e3e3e3 75%),
                    linear-gradient(-45deg, transparent 75%, #e3e3e3 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const StartButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: #5bc0de;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #31b0d5;
  }
`;

const Board = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const boardRef = useRef();

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setSpeed(100);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) return;

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
    <BoardContainer ref={boardRef}>
      <Snake snake={snake} />
      <Food food={food} />
      {gameOver && <GameOverMessage />}
      {!gameStarted && !gameOver && <StartButton onClick={startGame}>Start Game</StartButton>}
    </BoardContainer>
  );
};

export default Board;