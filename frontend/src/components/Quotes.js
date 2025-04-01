import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

function Emotions() {
    const [emotion, setEmotion] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [faceImage, setFaceImage] = useState(null);
    const [webcamActive, setWebcamActive] = useState(false); // Start with camera off
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 480,
        height: 480,
        facingMode: "user"
    };

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
            setPlaylist(response.data.songs);
            setQuotes(response.data.quotes);
            setFaceImage(response.data.face_image);

            // Turn off the webcam
            stopCamera();
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
        startCamera();
    };

    const extractYouTubeID = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v");
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
                    {playlist.map((song, index) => {
                        const videoID = extractYouTubeID(song);
                        return (
                            <div key={index}>
                                <iframe 
                                    width="560" 
                                    height="315" 
                                    src={`https://www.youtube.com/embed/${videoID}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                </iframe>
                                <p><a href={song} target="_blank" rel="noopener noreferrer">{song}</a></p>
                            </div>
                        );
                    })}
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
