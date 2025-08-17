import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SignUp from './components/Signup3';
import Login from './components/login2';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Browse from './pages/BrowseSongs';
import MainPlayGames from './pages/MainPlayGames';
import Contact from './pages/Contact';
import Emotions from './components/Emotions7';
import Quotes from './components/Quotes';
import Favourite from './components/Favourite1';
import { AuthProvider, useAuth } from './components/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute';
import ColorMatching from './pages/Angry/Angry-ColorMatching';
import Breathing from './pages/Angry/Angry-Breathing';
import Grounding from './pages/Fear/Fear-Grounding';
import Meditation from './pages/Sad/Sad-Meditation';
import Quiz from './pages/Happy-Surprise-Neutral/Quiz';
import Hangman from './pages/Happy-Surprise-Neutral/HamngmanMain';
import SnakeGame from './pages/Happy-Surprise-Neutral/SnakeBoard';
import HealthTips from './pages/Happy-Surprise-Neutral/Health-tips';
import FunnyVideos from './pages/Disgust/FunnyVideos';
import SlideBar from './components/SlideBar';
import About from './pages/About';
import Services from './pages/Services';
import Home from './pages/Home';


function App() {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    return (
        <div className={isLoggedIn ? 'logged-in' : ''}>
            <Navbar />
            <br /><br /><br /><br />
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/hangman" element={<Hangman />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/snake" element={<SnakeGame />} />
                <Route path="/health-tips" element={<HealthTips />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/play-games" element={<MainPlayGames />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/emotions1" element={<Emotions />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/grounding-exercise" element={<Grounding />} />
                <Route path="/breathing-exercise" element={<Breathing />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/funnyvideos" element={<FunnyVideos />} />

                {/* Protected routes*/}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                           
                        </ProtectedRoute>
                    }
                />
                <Route path="/color-matching-game" element={<ColorMatching />} />
            </Routes>
            {(location.pathname === "/about" || location.pathname === "/services" || location.pathname === "/home" || location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login") && <Footer />}
            {(location.pathname !== "/about" && location.pathname !== "/services" && location.pathname !== "/home" && location.pathname !== "/" && location.pathname !== "/signup" && location.pathname !== "/login") && <SlideBar />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    );
}
