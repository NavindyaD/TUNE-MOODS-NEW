import React, { useEffect, useState } from 'react';
import './Angry-ColorMatching.css';
import blueCandy from '../../assets/images/blue.png';
import greenCandy from '../../assets/images/green.png';
import orangeCandy from '../../assets/images/orange.png';
import purpleCandy from '../../assets/images/purple.png';
import redCandy from '../../assets/images/red.png';
import yellowCandy from '../../assets/images/yellow.png';
import blank from '../../assets/images/all.png'; // A blank or default image

const width = 8;
const candyImages = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];

const App = () => {
  const [currentCandyArrangement, setCurrentCandyArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const createBoard = () => {
    const randomCandyArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomCandy = candyImages[Math.floor(Math.random() * candyImages.length)];
      randomCandyArrangement.push(randomCandy);
    }
    setCurrentCandyArrangement(randomCandyArrangement);
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedCandy = currentCandyArrangement[i];
      const isBlank = currentCandyArrangement[i] === '';
  
      if (rowOfThree.every(square => currentCandyArrangement[square] === decidedCandy && !isBlank)) {
        rowOfThree.forEach(square => {
          currentCandyArrangement[square] = candyImages[Math.floor(Math.random() * candyImages.length)]; // Replace with new candy
        });
        return true;
      }
    }
  };
  

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedCandy = currentCandyArrangement[i];
      const isBlank = currentCandyArrangement[i] === '';

      if (columnOfThree.every(square => currentCandyArrangement[square] === decidedCandy && !isBlank)) {
        columnOfThree.forEach(square => currentCandyArrangement[square] = '');
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      if (currentCandyArrangement[i + width] === '') {
        currentCandyArrangement[i + width] = currentCandyArrangement[i];
        currentCandyArrangement[i] = '';
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentCandyArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentCandyArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + width
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (squareBeingReplacedId && validMove && (isARowOfThree || isAColumnOfThree)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentCandyArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentCandyArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentCandyArrangement([...currentCandyArrangement]);
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentCandyArrangement([...currentCandyArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentCandyArrangement]);

  return (
    <div className="MatchingGameWrapper">
      <div className="game">
        {currentCandyArrangement.map((candyImage, index) => (
          <img
            key={index}
            src={candyImage || blank} // Fallback to the blank image if candyImage is missing
            alt="candy"
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            className="candy"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
