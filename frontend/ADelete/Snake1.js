import React from 'react';
import styled from 'styled-components';

const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #5cb85c;
  border: 2px solid #4cae4c;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px; /* Slightly rounded corners */
`;

const Snake = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <SnakeSegment 
          key={index} 
          style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }} 
        />
      ))}
    </>
  );
};

export default Snake;
