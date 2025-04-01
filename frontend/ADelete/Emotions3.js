import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';

function Emotions() {
    const [emotion, setEmotion] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [faceImage, setFaceImage] = useState(null);
    const [webcamActive, setWebcamActive] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 480,
        height: 480,
        facingMode: "user"
    };

    useEffect(() => {
        if (playlist.length > 0 && playing) {
            setCurrentSongIndex(0); // Start from the beginning of the playlist
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

    const captureMood = async () => {
        setLoading(true);
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const base64Image = imageSrc.split(',')[1];

            console.log("Sending image to backend for emotion detection...");
            const response = await axios.post('http://127.0.0.1:5000/predict_emotion', { image: base64Image }, { timeout: 60000 });
            console.log("Received response from backend:", response.data);
            setEmotion(response.data.emotion);
            setPlaylist(response.data.songs || []); // Ensure playlist is always an array
            setQuotes(response.data.quotes || []); // Ensure quotes is always an array
            setFaceImage(response.data.face_image || null);

            stopCamera();
            setPlaying(true); // Start playing songs
        } catch (error) {
            console.error('Error capturing mood:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        } finally {
            setLoading(false);
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

    return (
        <div className="App">
            <h1>Emotion-Driven Music Playlist and Quotes Generator</h1>
            {!webcamActive && (
                <button onClick={startCamera}>
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
                    <button onClick={stopCamera}>
                        Stop Camera
                    </button>
                    <button onClick={captureMood} disabled={loading}>
                        {loading ? 'Capturing Mood...' : 'Capture Mood'}
                    </button>
                </>
            )}
            {!webcamActive && (
                <button onClick={recaptureMood}>
                    Recapture Mood
                </button>
            )}
            {emotion && (
                <div>
                    <h2>Detected Emotion: {emotion}</h2>
                    <h3>Quotes:</h3>
                    <ul>
                        {quotes.map((quote, index) => (
                            <li key={index}>{quote}</li>
                        ))}
                    </ul>
                    <h3>Playlist:</h3>
                    {playing && playlist.length > 0 && (
                        <YouTube
                            videoId={extractYouTubeID(playlist[currentSongIndex])}
                            opts={{ height: '315', width: '560' }}
                            onEnd={handleEnd}
                            onReady={handleReady}
                        />
                    )}
                </div>
            )}
            {faceImage && (
                <div>
                    <h3>Detected Face:</h3>
                    <img src={`data:image/jpeg;base64,${faceImage}`} alt="Detected Face" />
                </div>
            )}
        </div>
    );
}

export default Emotions;
