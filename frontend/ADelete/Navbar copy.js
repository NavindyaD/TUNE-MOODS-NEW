import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import homeIcon from '../images/Logo.png';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-icon">
      <img src={homeIcon} alt="Home" />
      </div>
      <ul className="nav-links">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/services">Services</Link></li>
        <li className="nav-item"><Link to="/about">About Us</Link></li>
      </ul>
      <div className="user-icon">
      <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
