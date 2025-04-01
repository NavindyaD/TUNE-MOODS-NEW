import React from 'react';
import './Snake.css';

const Snake = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div 
          key={index} 
          className="SnakeSegment" 
          style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }} 
        />
      ))}
    </>
  );
};

export default Snake;
