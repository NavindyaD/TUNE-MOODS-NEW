import React from 'react';
import './Services.css'; // Import the CSS file

// Import local images
import image1 from '../assets/images/Music_Playlist.jpg';
import image2 from '../assets/images/Engagement_Activities.jpg';
import image3 from '../assets/images/Inspirational Quotes.jpg';

const ThreeImages = () => {
  // Define image URLs and texts
  const images = [
    { url: image1, boldText: 'Personalized Music Playlists', normalText: 'Based on your identified mood, we generate custom playlists that cater to your emotional state, providing the right tunes to uplift or soothe you.' },
    { url: image2, boldText: 'Engagement Activities', normalText: 'Have an opportunity to play games, watch videos, and do some mind-relaxing exercises as the preference.' },
    { url: image3, boldText: 'Inspirational Quotes', normalText: 'Receive motivational and uplifting quotes tailored to your current mood to inspire and support your emotional well-being.' },
  ];

  return (
    <div className="container">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img
            src={image.url}
            alt={`Service Images`}
            className="image"
          />
          <div className="text-container">
            <div className="bold-text">{image.boldText}</div>
            <div className="normal-text">{image.normalText}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreeImages;
