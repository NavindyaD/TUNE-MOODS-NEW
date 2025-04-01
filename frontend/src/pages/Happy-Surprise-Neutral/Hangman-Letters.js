import React from 'react';

const Letters = ({ guessedLetters, handleLetterClick }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="letters">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Letters;
