import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Snake from './Snake';
import Food from './SnakeFood';
import GameOverMessage from './SnakeGameOverMessage'; // Adjust the path as per your project structure

const BoardContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #333;
  position: relative;
`;

const Board = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef();

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
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const moveSnake = () => {
      if (!gameOver) {
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
      }
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, speed]);

  return (
    <BoardContainer ref={boardRef}>
      <Snake snake={snake} />
      <Food food={food} />
      {gameOver && <GameOverMessage>Game Over</GameOverMessage>}
    </BoardContainer>
  );
};

export default Board;
