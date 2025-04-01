import React, { useState, useEffect } from 'react';
import './game1.css';

// Importing candy images
import redCandy from '../images/red.png';
import blueCandy from '../images/blue.png';
import greenCandy from '../images/green.png';
import yellowCandy from '../images/yellow.png';
import purpleCandy from '../images/purple.png';
import orangeCandy from '../images/orange.png';

const width = 8;
const candyImages = [redCandy, blueCandy, greenCandy, yellowCandy, purpleCandy, orangeCandy];
const pointsPerMatch = 10;

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [draggedTile, setDraggedTile] = useState(null);
  const [replacedTile, setReplacedTile] = useState(null);

  const checkForColumnOfThree = () => {
    let matched = false;
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedImage = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === '';

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedImage && !isBlank)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '');
        matched = true;
      }
    }
    return matched;
  };

  const checkForRowOfThree = () => {
    let matched = false;
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedImage = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === '';

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedImage && !isBlank)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '');
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

    currentColorArrangement[replacedId] = draggedTile.src;
    currentColorArrangement[draggedId] = replacedTile.src;

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
      currentColorArrangement[replacedId] = replacedTile.src;
      currentColorArrangement[draggedId] = draggedTile.src;
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomImageArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomImage = candyImages[Math.floor(Math.random() * candyImages.length)];
      randomImageArrangement.push(randomImage);
    }
    setCurrentColorArrangement(randomImageArrangement);
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
        {currentColorArrangement.map((candyImage, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${candyImage})` }}
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
