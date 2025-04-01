import React from 'react';
import './Angry-Breathing.css'; // Import the CSS file for styling
//import GroundingExercise from '../../assets/images/A Grounding Exercise.mp4';
import BreathingExercise from '../../assets/images/Calm Breathing Exercise.mp4';

function App() {
  return (
    <div className="exercise-container">
      <div className="exercise-box-container">
        <div className="exercise-box exercise-box1">
          <video className="box-video" controls>
          <source src={BreathingExercise} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="box-text">Breathing Exercises</p>
      </div>
    </div>
  );
}

export default App;
