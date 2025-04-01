// src/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SlideBar.css'; // Import the CSS file for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/emotions1">Generate playlist</Link></li>
        {/* <li><Link to="/play-games">Play games</Link></li>
        <li><Link to="/health-tips">Watch health tips</Link></li>
        <li><Link to ="/exercise">Do exercises</Link></li> */}
        <li><Link to="/favourite">Favorite songs</Link> </li>
        <li><Link to ="/browse">Browse songs</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
