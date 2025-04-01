import React from 'react';

const Hangman = ({ wrongGuesses }) => {
  // Display Hangman figure based on wrong guesses
  const hangmanFigures = [
    `
     _______
    |/      |
    |      
    |       
    |        
    |         
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |       
    |        
    |         
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |       |
    |        
    |         
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |      \\|
    |        
    |         
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |      \\|/
    |        
    |         
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |      \\|/
    |       |
    |        
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |      \\|/
    |       |
    |      / 
   _|___     
   `,
    `
     _______
    |/      |
    |      (_)
    |      \\|/
    |       |
    |      / \\
   _|___     
   `
  ];

  return (
    <div className="hangman">
      <pre>{hangmanFigures[wrongGuesses]}</pre>
    </div>
  );
};

export default Hangman;
