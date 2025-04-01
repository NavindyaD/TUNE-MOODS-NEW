import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [inputData, setInputData] = useState({
    age: '',
    height: '',
    weight: '',
    exercise_type: '',
    duration: ''
  });
  const [prediction, setPrediction] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', inputData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div>
      <h1>Model Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={inputData.age}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="height"
          placeholder="Enter height (e.g., 5.8)"
          value={inputData.height}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="weight"
          placeholder="Enter weight (e.g., 70.5)"
          value={inputData.weight}
          onChange={handleChange}
        />
        <input
          type="text"
          name="exercise_type"
          placeholder="Enter exercise type (e.g., running)"
          value={inputData.exercise_type}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="duration"
          placeholder="Enter duration (e.g., 45.0)"
          value={inputData.duration}
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default PredictionForm;
