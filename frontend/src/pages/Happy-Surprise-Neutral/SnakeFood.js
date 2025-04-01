import React from 'react';
import './SnakeFood.css';

const Food = ({ food }) => {
  return <div className="FoodItem" style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }} />;
};

export default Food;
