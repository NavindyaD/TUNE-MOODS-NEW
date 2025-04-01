import React, { useState } from 'react';
import Hangman from './Hangman';
import WordToGuess from './WordToGuess';
import Letters from './Letters';
import './hamngman.css';

const App = () => {
    const words = ['hangman', 'apple', 'banana', 'computer', 'elephant', 'javascript']; // Add more words as needed
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
  
    return (
      <div className="App">
        <h1>Hangman Game</h1>
        <Hangman wrongGuesses={wrongGuesses} />
        <WordToGuess word={wordToGuess} guessedLetters={guessedLetters} />
        <Letters guessedLetters={guessedLetters} handleLetterClick={handleLetterClick} />
        <button onClick={handleNewGame}>New Game</button>
      </div>
    );
  };
  
  export default App;
