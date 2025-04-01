import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;

const GameOverMessage = () => {
  return (
    <MessageContainer>
      <h2>Game Over</h2>
      <p>Press R to restart</p>
    </MessageContainer>
  );
};

export default GameOverMessage;
