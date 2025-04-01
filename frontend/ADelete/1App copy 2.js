// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SignUp from './components/Signup2';
import Login from './components/login2';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Quiz from './components/Quiz';
import SnakeGame from './components/snake/Board';
import Exercise from './pages/Exercises';
import Browse from './pages/BrowseSongs';
import MainPlayGames from './pages/MainPlayGames';
import Contact from './pages/Contact';
import HealthTips from './pages/Health-tips';
import Emotions from './components/Emotions3';
import Quotes from './components/Quotes';
// import Dashboard from './components/dashboard';
import Hangman from './components/HamngmanMain1';
import ColorMatching from './pages/ColorMatching';
import SlideBar from './pages/SlideBar';
import { AuthProvider, useAuth } from './components/AuthContext'; // Adjust the path if needed
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Signup3 from './components/Signup3';

function App() {
    const location = useLocation();
    const { isLoggedIn } = useAuth(); // Get login state from AuthContext

    return (
        <div className={isLoggedIn ? 'logged-in' : ''}> {/* Change background based on login state */}
            <Navbar />
            <br /><br /><br /><br />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/hangman" element={<Hangman />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/snake" element={<SnakeGame />} />
                <Route path="/health-tips" element={<HealthTips />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/play-games" element={<MainPlayGames />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/emotions1" element={<Emotions />} />
                <Route path="/quotes" element={<Quotes />} />

                <Route path="/signup3" element={<Signup3 />} />
                {/* Protected routes - only accessible when logged in */}
                {/* <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                /> */}
                {/* <Route
                  path="/health-tips"
                  element={
                    <ProtectedRoute>
                      <HealthTips />
                    </ProtectedRoute>
                  }
                /> */}
                {/* <Route path="/health-tips" element={<ProtectedRoute element={<HealthTips />} />} /> */}
                <Route path="/color-matching" element={<ColorMatching />} />
                {/* <Route path="/snake" element={<Puzzle />} /> */}
            </Routes>
            {/* Render Footer only if the current path is not /dashboard */}
            {(location.pathname === "/about" || location.pathname === "/services" || location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login") && <Footer />}
            {(location.pathname !== "/about" && location.pathname !== "/services" && location.pathname !== "/" && location.pathname !== "/signup" && location.pathname !== "/login") && <SlideBar />}
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
