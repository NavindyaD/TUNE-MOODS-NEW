import React, { useState } from 'react';
import './BrowseSongs.css';
const API_KEY = 'AIzaSyCgKGEIsfmf31P5go8cpD2fU5vdr8-EENg'; // Replace with your YouTube API key

const App = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    }
  };

  return (
    <div className="BrowseSongs-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Browse Songs..."
          className="BrowseSongs-input"
        />
        <button type="submit" className="BrowseSongs-button">Search</button>
      </form>

      <div className="BrowseSongs-videoList">
        {videos.map((video) => (
          <div 
            key={video.id.videoId} 
            onClick={() => setSelectedVideo(video.id.videoId)} 
            className="BrowseSongs-videoItem"
          >
            <h3>{video.snippet.title}</h3>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="BrowseSongs-videoPlayer">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default App;
