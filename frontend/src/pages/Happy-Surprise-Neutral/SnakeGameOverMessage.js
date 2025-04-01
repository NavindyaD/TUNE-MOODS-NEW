import React from 'react';
import './SnakeGameOverMessage.css';

const GameOverMessage = () => {
  return (
    <div className="MessageContainer">
      <h2>Game Over</h2>
      <p>Press R to restart</p>
    </div>
  );
};

export default GameOverMessage;
