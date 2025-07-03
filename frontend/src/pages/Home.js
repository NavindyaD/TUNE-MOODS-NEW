import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/emotions1');
  };

  return (
    <main className="home">
      <h1>Do you know?</h1>
      <p>
        "TUNE MOODS" leverages deep learning to analyze your webcam facial expressions and determine your mood from a range of emotions including anger, disgust, fear, happiness, sadness, surprise, and neutrality, and support you to fix the mood when you are in a negative mood.
      </p>
      <button onClick={handleGetStarted}>Get Started</button>
    </main>
  );
};

export default Home;
