import React from 'react';
import styled from 'styled-components';

const FoodItem = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #d9534f;
`;

const Food = ({ food }) => {
  return <FoodItem style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }} />;
};

export default Food;
