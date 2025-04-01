// src/components/Candy.js
import React from 'react';

const Candy = ({ type, onClick }) => {
  const candyColors = ['red', 'blue', 'green', 'yellow', 'purple'];

  return (
    <div
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: candyColors[type],
        border: '1px solid black',
        boxSizing: 'border-box',
        cursor: 'pointer'
      }}
    />
  );
};

export default Candy;
