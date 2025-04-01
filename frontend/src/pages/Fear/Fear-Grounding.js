import React from 'react';
import './Fear-Grounding.css'; // Import the CSS file for styling
import GroundingExercise from '../../assets/images/A Grounding Exercise.mp4';


function App() {
  return (
    <div className="exercise-container">
      <div className="exercise-box-container">
        <div className="exercise-box exercise-box1">
          <video className="box-video" controls>
          <source src={GroundingExercise} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="box-text">Grounding Exercises</p>
      </div>
    </div>
  );
}

export default App;
