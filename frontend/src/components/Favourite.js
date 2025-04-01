import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming you have this context for user authentication
import axios from 'axios';
import './Favorite.css';

function Favorite() {
    const { user, isLoggedIn } = useAuth(); // Get user data from context
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="favorites-page">
            <h1>My Favorite Songs</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {favorites.length === 0 ? (
                        <p>You have no favorite songs yet.</p>
                    ) : (
                        <ul>
                            {favorites.map((songUrl, index) => (
                                <li key={index}>
                                    <a href={songUrl} target="_blank" rel="noopener noreferrer">
                                        Watch on YouTube
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Favorite;
