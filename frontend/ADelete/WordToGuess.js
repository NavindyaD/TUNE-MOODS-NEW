import React from 'react';

const WordToGuess = ({ word, guessedLetters }) => {
  // Display the word with hidden letters
  const displayWord = word
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_ '))
    .join('');

  return <div className="word-to-guess">{displayWord}</div>;
};

export default WordToGuess;
