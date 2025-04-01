import React, { useState, useEffect } from 'react';
import './game.css';

const width = 8;
const candyColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const pointsPerMatch = 10;
const initialScore = 0; // Initial score

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [draggedTile, setDraggedTile] = useState(null);
  const [replacedTile, setReplacedTile] = useState(null);
  const [score, setScore] = useState(initialScore); // State for score

  const checkForColumnOfThree = () => {
    let matched = false;
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === '';

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '');
        setScore(prevScore => prevScore + pointsPerMatch);
        matched = true;
      }
    }
    return matched;
  };

  const checkForRowOfThree = () => {
    let matched = false;
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === '';

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '');
        setScore(prevScore => prevScore + pointsPerMatch);
        matched = true;
      }
    }
    return matched;
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      if (currentColorArrangement[i + width] === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = '';
      }
    }
  };

  const dragStart = (e) => {
    setDraggedTile(e.target);
  };

  const dragDrop = (e) => {
    setReplacedTile(e.target);
  };

  const dragEnd = () => {
    const draggedId = parseInt(draggedTile.getAttribute('data-id'));
    const replacedId = parseInt(replacedTile.getAttribute('data-id'));

    currentColorArrangement[replacedId] = draggedTile.style.backgroundColor;
    currentColorArrangement[draggedId] = replacedTile.style.backgroundColor;

    const validMoves = [
      draggedId - 1,
      draggedId - width,
      draggedId + 1,
      draggedId + width
    ];

    const validMove = validMoves.includes(replacedId);

    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (replacedId && validMove && (isAColumnOfThree || isARowOfThree)) {
      setDraggedTile(null);
      setReplacedTile(null);
    } else {
      currentColorArrangement[replacedId] = replacedTile.style.backgroundColor;
      currentColorArrangement[draggedId] = draggedTile.style.backgroundColor;
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
    setScore(initialScore); // Reset score to initial value
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [currentColorArrangement]);

  return (
    <div className="app">
      <div className="game">
        <div className="score">Score: {score}</div>
        {currentColorArrangement.map((candyColor, index) => (
          <div
            key={index}
            style={{ backgroundColor: candyColor }}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            className="candy"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;
