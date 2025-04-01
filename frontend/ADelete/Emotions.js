import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

function Emotions() {
    const [emotion, setEmotion] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [faceImage, setFaceImage] = useState(null);
    const [webcamActive, setWebcamActive] = useState(true);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 480,
        height: 480,
        facingMode: "user"
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
            setFaceImage(base64Image);

            // Turn off the webcam
            const stream = webcamRef.current.stream;
            stream.getTracks().forEach(track => track.stop());
            setWebcamActive(false);
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
        setFaceImage(null);
        setWebcamActive(true);
    };

    const extractYouTubeID = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v");
    };

    return (
        <div className="App">
            <h1>Emotion-Driven Music Playlist Generator</h1>
            {webcamActive && (
                <Webcam
                    audio={false}
                    height={480}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={480}
                    videoConstraints={videoConstraints}
                />
            )}
            {!webcamActive && (
                <button onClick={recaptureMood}>
                    Recapture Mood
                </button>
            )}
            <button onClick={captureMood} disabled={loading || !webcamActive}>
                {loading ? 'Capturing Mood...' : 'Capture Mood'}
            </button>
            {emotion && (
                <div>
                    <h2>Detected Emotion: {emotion}</h2>
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





// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';

// function App() {
//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route path="/signin" element={<SignIn />} />
//                     <Route path="/signup" element={<SignUp />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
