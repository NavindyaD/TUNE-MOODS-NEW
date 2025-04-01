import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming you have this context for user authentication
import axios from 'axios';
import './Favorite.css';

function Favorite() {
    const { user, isLoggedIn } = useAuth(); // Get user data from context
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        if (isLoggedIn && user?.id) {
            fetchFavorites(user.id);
        }
    }, [isLoggedIn, user]);

    const fetchFavorites = async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/get_favorites/${userId}`);
            setFavorites(response.data.favorites); // Set the favorites data from the backend
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setLoading(false);
        }
    };

    const getVideoDetails = (url) => {
        // Extract video ID from YouTube URL
        const videoId = url.split('v=')[1];
        return {
            videoId,
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        };
    };

    const handleVideoChange = (index) => {
        if (index >= 0 && index < favorites.length) {
            setCurrentVideoIndex(index);
        }
    };

    return (
        <div className="favorites-page">
            <h1 className="favorites-header">My Favorite Songs</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="playlist-container">
                    <div className="video-player">
                        {favorites.length > 0 && (
                            <iframe
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${getVideoDetails(favorites[currentVideoIndex]).videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube Video Player"
                            ></iframe>
                        )}
                    </div>

                    <div className="playlist">
                        <div className="playlist-controls">
                            <button onClick={() => handleVideoChange(currentVideoIndex - 1)} disabled={currentVideoIndex === 0}>
                                Previous
                            </button>
                            <button onClick={() => handleVideoChange(currentVideoIndex + 1)} disabled={currentVideoIndex === favorites.length - 1}>
                                Next
                            </button>
                        </div>

                        {favorites.length === 0 ? (
                            <p className="empty-message">You have no favorite songs yet.</p>
                        ) : (
                            <ul className="playlist-list">
                                {favorites.map((songUrl, index) => {
                                    const { thumbnailUrl, videoUrl } = getVideoDetails(songUrl);
                                    return (
                                        <li
                                            key={index}
                                            className={`playlist-item ${currentVideoIndex === index ? 'active' : ''}`}
                                            onClick={() => handleVideoChange(index)}
                                        >
                                            <img src={thumbnailUrl} alt="Song Thumbnail" className="song-thumbnail" />
                                            <div className="song-details">
                                                <h3>Song {index + 1}</h3> {/* Customize to show actual title if available */}
                                                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                                                    Watch on YouTube
                                                </a>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Favorite;
