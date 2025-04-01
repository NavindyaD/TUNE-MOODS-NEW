// src/components/Score.js
import React from 'react';

const Score = ({ score }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h1>Score: {score}</h1>
    </div>
  );
};

export default Score;
