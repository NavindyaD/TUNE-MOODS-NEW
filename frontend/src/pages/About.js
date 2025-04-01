import React from 'react';
import './About.css';

const About = () => {
  return (
    <main className="about">
      <div className="black-box">
        <h3 className="section-title">Welcome to TUNE MOODS</h3>
        <p className="description">
          At TUNE MOODS, we harness the power of music to help you manage stress and uplift your mood. Our unique web application detects your current emotions through your webcam and recommends personalized music playlists to match your feelings.
        </p>
        <h3 className="section-title">How It Works</h3>
        <p className="description">
        • Using advanced deep learning techniques, TUNE MOODS analyzes your facial expressions and curates a playlist that aligns with moods angry, disgust, fear, happy, sad, surprise, neutral.<br/>
        • In addition to music, we offer activities like games, videos, exercises, and mood-relevant quotes to further enhance your emotional well-being.
        </p>
        <h3 className="section-title">Our Vision</h3>
        <p className="description">
          We aim to provide a holistic approach to emotional well-being through personalized music and engaging activities.
        </p>
        <p className="thank-you">Thank you for choosing TUNE MOODS.</p>
      </div>
      <br/> <br/> <br/>
    </main>
  );
};

export default About;
