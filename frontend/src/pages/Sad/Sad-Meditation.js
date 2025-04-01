import React from 'react';
import './Sad-Meditation.css'; // Import the CSS file for styling
import MeditationVideo from '../../assets/images/Sitting with our Sadness- A meditation for letting go. Calming, relaxing, peaceful..mp4'; // Import the video

const MeditationPage = () => {
  return (
    <div className="meditation-container">
      <h1>Sitting with our Sadness - A meditation for letting go</h1>
      {/* Video Player */}
      <video controls className="meditation-video">
        <source src={MeditationVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MeditationPage;
