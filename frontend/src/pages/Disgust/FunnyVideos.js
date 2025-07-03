import React, { useEffect, useState } from "react";
import axios from "axios";
import './FunnyVideos.css';

const YouTubeVideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const API_KEY = "AIzaSyBoaTNljQ-TQv9ZkduE0yDryjD3w18_kZw";
  const searchQuery = "funny videos"; 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`
        );
        // Only get the first two videos
        setVideos(response.data.items.slice(0, 2));
      } catch (error) {
        console.error("Error fetching YouTube videos", error);
      }
    };

    fetchVideos();
  }, [API_KEY]);

  return (
    <div className="funny-container">
      <h1>Funny YouTube Videos</h1>
      <div className="video-gallery">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <iframe
              className="funny-video"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideoGallery;
