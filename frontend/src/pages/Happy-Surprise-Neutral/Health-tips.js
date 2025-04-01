// App.js
import React from 'react';
import './Health-tips.css';

const App = () => {
  return (
    <div className="health-tips-container">
      <div className="health-tips-row">
        <div className="health-tips-box">
          <iframe
            src="https://www.youtube.com/embed/xNoanoQ5syY"
            title="Box 1 Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
        <div className="health-tips-box">
          <iframe
            src="https://www.youtube.com/embed/-_VhU5rqyko"
            title="Box 2 Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
      </div>
      <div className="health-tips-row">
        <div className="health-tips-box">
          <iframe
            src="https://www.youtube.com/embed/4egM_a_nmKk"
            title="Box 3 Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
        <div className="health-tips-box">
          <iframe
            src="https://www.youtube.com/embed/aofq5o7OiCI"
            title="Box 4 Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default App;
