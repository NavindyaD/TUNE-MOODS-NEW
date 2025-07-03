import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import './Emotions4.css';

function Emotions() {
    const { user, isLoggedIn } = useAuth(); 
    const [emotion, setEmotion] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [faceImage, setFaceImage] = useState(null);
    const [webcamActive, setWebcamActive] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate(); 

    const videoConstraints = {
        width: 480,
        height: 480,
        facingMode: "user"
    };

    useEffect(() => {
        if (playlist.length > 0 && playing) {
            setCurrentSongIndex(0);
        }
    }, [playlist, playing]);

    useEffect(() => {
        if (currentSongIndex >= playlist.length) {
            setPlaying(false);
        }
    }, [currentSongIndex, playlist.length]);

    const startCamera = () => {
        setWebcamActive(true);
    };

    const stopCamera = () => {
        if (webcamRef.current && webcamRef.current.stream) {
            const stream = webcamRef.current.stream;
            stream.getTracks().forEach(track => track.stop());
        }
        setWebcamActive(false);
    };

    const captureMood = async (base64Image) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict_emotion', { image: base64Image }, { timeout: 60000 });
            console.log('API Response:', response.data);
            setEmotion(response.data.emotion);
            setPlaylist(response.data.songs || []);
            setQuotes(response.data.quotes || []);
            setFaceImage(response.data.face_image || null);
            stopCamera();
            setPlaying(true);
        } catch (error) {
            console.error('Error capturing mood:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1];
                captureMood(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const recaptureMood = () => {
        setEmotion(null);
        setPlaylist([]);
        setQuotes([]);
        setFaceImage(null);
        setPlaying(false);
        startCamera();
    };

    const extractYouTubeID = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get("v");
        } catch (error) {
            console.error('Invalid URL:', error);
            return null;
        }
    };

    const handleEnd = () => {
        if (currentSongIndex < playlist.length - 1) {
            setCurrentSongIndex(prevIndex => prevIndex + 1);
        } else {
            setPlaying(false);
        }
    };

    const handleReady = (event) => {
        event.target.playVideo();
    };

    const saveFavorite = async () => {
        if (!isLoggedIn) {
            alert('User not logged in. Please log in to save favorites.');
            return;
        }

        if (playlist.length > 0 && user.id) {  
            const currentVideoUrl = playlist[currentSongIndex];
            try {
                await axios.post('http://127.0.0.1:5000/favorite', {
                    user_id: user.id, 
                    video_url: currentVideoUrl
                });
                alert('Song added to favorites!');
            } catch (error) {
                console.error('Error saving favorite:', error);
                alert('Failed to add song to favorites!');
            }
        } else {
            alert('Please make sure you are logged in and a song is selected.');
        }
    };

    return (
        <div className="emotions-app-container">
            <h1>Emotion-Driven Music Playlist Generator with Engagement Activities</h1>

            {/* User image upload to predict mood */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="emotions-file-input"
            />

            {/* Start/Stop Webcam */}
            {!webcamActive && (
                <button onClick={startCamera} className="emotions-button">
                    Start Camera
                </button>
            )}
            {webcamActive && (
                <>
                    <Webcam
                        audio={false}
                        height={480}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={480}
                        videoConstraints={videoConstraints}
                    />
                    <button onClick={stopCamera} className="emotions-button">
                        Stop Camera
                    </button>
                    <button onClick={() => {
                        const imageSrc = webcamRef.current.getScreenshot();
                        const base64Image = imageSrc.split(',')[1];
                        captureMood(base64Image);
                    }} disabled={loading} className="emotions-button">
                        {loading ? 'Capturing Mood...' : 'Capture Mood'}
                    </button>
                </>
            )}

            {/* Recapture mood button */}
            {!webcamActive && (
                <button onClick={recaptureMood} className="emotions-button">
                    Recapture Mood
                </button>
            )}

            {emotion && emotion.toLowerCase() === "angry" && (
                <a href="/breathing-exercise" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Do Breathing Exercises
                    </button>
                </a>
            )}

            {emotion && emotion.toLowerCase() === "angry" && (
                <a href="/color-matching-game" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Play a matching game
                    </button>
                </a>
            )}

            {emotion && emotion.toLowerCase() === "fear" && (
                <a href="/grounding-exercise" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Do Grounding Exercises
                    </button>
                </a>
            )}

            {emotion && emotion.toLowerCase() === "disgust" && (
                <a href="/funnyvideos" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Watch funny Videos
                    </button>
                </a>
            )}

            {emotion && emotion.toLowerCase() === "sad" && (
                <a href="/meditation" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Do Meditation
                    </button>
                </a>
            )}

            {(emotion && (emotion.toLowerCase() === "happy" || emotion.toLowerCase() === "surprise" || emotion.toLowerCase() === "neutral")) && (
                <a href="/snake" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Play Snake Game
                    </button>
                </a>
            )}

            {(emotion && (emotion.toLowerCase() === "happy" || emotion.toLowerCase() === "surprise" || emotion.toLowerCase() === "neutral")) && (
                <a href="/quiz" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        What to play Quiz game
                    </button>
                </a>
            )}

            {(emotion && (emotion.toLowerCase() === "happy" || emotion.toLowerCase() === "surprise" || emotion.toLowerCase() === "neutral")) && (
                <a href="/hangman" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Let's Play Hangman Game
                    </button>
                </a>
            )}

            {(emotion && (emotion.toLowerCase() === "happy" || emotion.toLowerCase() === "surprise" || emotion.toLowerCase() === "neutral")) && (
                <a href="/health-tips" target="_blank" rel="noopener noreferrer">
                    <button className="hello-button">
                        Watch Health-tips
                    </button>
                </a>
            )}


            {/* Display Emotion, Quotes, Playlist */}
            {emotion && (
                <div className="emotions-results">
                <h2>Detected Emotion: {emotion}</h2>
            
                {/* Display a random quote */}
                <h3>Quote:</h3>
                {quotes.length > 0 && <p>{quotes[Math.floor(Math.random() * quotes.length)]}</p>} {/* Display random quote */}
            
                <h3>Playlist:</h3>
                {playing && playlist.length > 0 && (
                    <>
                        <YouTube
                            videoId={extractYouTubeID(playlist[currentSongIndex])}
                            opts={{ height: '315', width: '560' }}
                            onEnd={handleEnd}
                            onReady={handleReady}
                        />
                        <button onClick={saveFavorite} className="emotions-button">
                            Add to Favorites
                        </button>
                    </>
                )}
            </div>
            
            )}

            {/* Display Detected Face */}
            {faceImage && (
                <div className="emotions-face-image">
                    <h3>Detected Face:</h3>
                    <img src={`data:image/jpeg;base64,${faceImage}`} alt="Detected Face" />
                </div>
            )}
        </div>
    );
}

export default Emotions;
