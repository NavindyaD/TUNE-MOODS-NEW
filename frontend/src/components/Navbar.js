// src/Navbar.js
import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import homeIcon from '../assets/images/Logo.png';
import userIcon from '../assets/images/Logo.png';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Clear auth state and log the user out
    navigate('/home'); // Redirect to the About Us page
  };

  return (
    <nav className="navbar">
      <div className="left-icon">
        <img src={homeIcon} alt="Home" />
      </div>
      <ul className="nav-links">
        <li className="nav-item"><Link to="/home">Home</Link></li>
        <li className="nav-item"><Link to="/services">Services</Link></li>
        <li className="nav-item"><Link to="/about">About Us</Link></li>
      </ul>
      <div className="user-icon">
        {isLoggedIn ? (
          <>
            <img src={userIcon} alt="Login" style={{ width: '50px', height: 'auto' }} />

            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="login-button"><Link to="/login">Login</Link></button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
