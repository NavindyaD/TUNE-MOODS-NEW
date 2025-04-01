import React, { useState } from 'react';
import Hangman from './Hangman';
import WordToGuess from './Hangman-WordToGuess';
import Letters from './Hangman-Letters';
import './Hamngman.css'; // Ensure this path is correct

const MAX_WRONG_GUESSES = 7; // Maximum wrong guesses allowed

const App = () => {
  const words = ['hangman', 'apple', 'banana', 'computer', 'elephant', 'javascript'];
  const [wordToGuess, setWordToGuess] = useState(selectRandomWord(words));
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  function selectRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }

  const handleLetterClick = (letter) => {
    if (!guessedLetters.includes(letter)) {
      const isCorrect = wordToGuess.includes(letter);
      if (isCorrect) {
        setGuessedLetters([...guessedLetters, letter]);
      } else {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const handleNewGame = () => {
    const newWord = selectRandomWord(words);
    setWordToGuess(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const isGameOver = wrongGuesses >= MAX_WRONG_GUESSES;
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));
  const isGameOverMessage = isGameOver ? 'Game Over! The word was: ' + wordToGuess : '';
  const isWinMessage = isWinner ? 'Congratulations! You guessed the word!' : '';

  return (
    <div className="hangs-container">
    <div className="hangman-wrapper">
      <h1>Hangman Game</h1>
      <Hangman className="hangman-figure" wrongGuesses={wrongGuesses} />
      <WordToGuess className="word-display" word={wordToGuess} guessedLetters={guessedLetters} />
      <Letters className="letters-container" guessedLetters={guessedLetters} handleLetterClick={handleLetterClick} />
      <button className="new-game-button" onClick={handleNewGame}>New Game</button>
      <div className="game-status-container">
        {isWinMessage && <p className="win-message">{isWinMessage}</p>}
        {isGameOverMessage && <p className="game-over-message">{isGameOverMessage}</p>}
      </div>
    </div>
    </div>
  );
};

export default App;
