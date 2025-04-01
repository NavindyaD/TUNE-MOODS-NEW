// src/components/dashboard.js
import React from 'react';
import Sidebar from './Slider'; // Ensure this path is correct
import { Route, Routes } from 'react-router-dom';
import MainPlayGames from './MainPlayGames';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="play-games" element={<MainPlayGames />} />
          {/* Define additional routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
