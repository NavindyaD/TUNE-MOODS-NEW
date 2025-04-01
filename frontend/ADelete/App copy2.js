// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Emotions from './components/Emotions3';
import Quotes from './components/Quotes';
import Browse from './components/BrowseSongs';
import Quiz from './components/Quiz1';
import SignUp from './components/Signup2';
import Login from './components/login2';
import Dashboard from './components/dashboard';
import MainPlayGames from './components/MainPlayGames';
import Hangman from './components/HamngmanMain1';
import Contact from './pages/Contact';
import HealthTips from './pages/Health-tips';
import Game from './components/game1';
import Exercise from './components/Exercises';
import Puzzle from './components/Snakepuzzle1';
import SlideBar from './components/Slider';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <Navbar />
            <br/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/emotions1" element={<Emotions />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes - only accessible when logged in */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/play-games"
                  element={
                    <ProtectedRoute>
                      <MainPlayGames />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/health-tips"
                  element={
                    <ProtectedRoute>
                      <HealthTips />
                    </ProtectedRoute>
                  }
                /> */}

<Route path="/health-tips" element={<ProtectedRoute element={<HealthTips />} />} /> 


                <Route path="/contact" element={<Contact />} />
                {/* <Route path="/health-tips" element={<HealthTips />} /> */}
                <Route path="/candy" element={<Game />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/snake" element={<Puzzle />} />
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
