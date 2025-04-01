import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/MainPlayGames.css';
import Snake from '../assets/images/Snake.jpg';
import ColorMatching from '../assets/images/Color-Matching.jpg';
import Quiz from '../assets/images/Quiz.jpg';
import Hangman from '../assets/images/Hangman.jpg';

const Main = () => {
    return (
        
      <main className="main">

        
        <div className="box-container">
          <Link to="/snake" className="box-wrapper">
          <div className="box" style={{ backgroundImage: `url(${Snake})`, backgroundSize: 'cover' }}></div>
            <p className="box-text">Snake Game</p>
          </Link>
          <Link to="/color-matching" className="box-wrapper">
          <div className="box" style={{ backgroundImage: `url(${ColorMatching})`, backgroundSize: 'cover' }}></div>
            <p className="box-text">Color Matching</p>
          </Link>
          <Link to="/quiz" className="box-wrapper">
          <div className="box" style={{ backgroundImage: `url(${Quiz})`, backgroundSize: 'cover' }}></div>
            <p className="box-text">Quiz Game</p>
          </Link>
          <Link to="/hangman" className="box-wrapper">
          <div className="box" style={{ backgroundImage: `url(${Hangman})`, backgroundSize: 'cover' }}></div>
            <p className="box-text">Hangman</p>
          </Link>
        </div>
      </main>
    );
  };
  
  export default Main;