// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';




//import Hangman from './components/HamngmanMain1';
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
import SlideBar from './components/Slider'
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
                {/* <Route path="/hangman" element={<Hangman />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/play-games" element={<MainPlayGames />} />
                <Route path="/hangman" element={<Hangman />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/health-tips" element={<HealthTips />} />
                <Route path="/candy" element={<Game />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/snake" element={<Puzzle />} />
            </Routes>
            {/* Render Footer only if the current path is not /dashboard */}
            {(location.pathname === "/about" || location.pathname === "/services" || location.pathname === "/" || location.pathname === "signup" || location.pathname === "login") && <Footer />}
            {(location.pathname !== "/about" && location.pathname !== "/services" && location.pathname !== "/" && location.pathname !== "signup" && location.pathname !== "login") && <SlideBar />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

// // src/App.js



// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Services from './pages/Services';




// import Hangman from './components/HamngmanMain1';
// import Emotions from './components/Emotions3';
// import Quotes from './components/Quotes';
// import Browse from './components/BrowseSongs';
// import Quiz from './components/Quiz';
// import SignUp from './components/Signup2';
// import Login from './components/login2';
// import Dashboard from './components/dashboard';
// import MainPlayGames from './components/MainPlayGames'; 


// function App() {
  
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />


//           <Route path="/emotions1" element={<Emotions />} />
//           <Route path="/quotes" element={<Quotes />} />
//           <Route path="/browse" element={<Browse />} />
//           <Route path="/quiz" element={<Quiz />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/hangman" element={<Hangman />} />
//           <Route path="/dashboard" element={<Dashboard />} />

//           <Route path="/play-games" element={<MainPlayGames />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import SignUp1 from './components/Signup1';
// import Login from './components/login';
// import Emotions from './components/Emotions';
// import Game from './components/game';
// import Puzzle from './components/Snakepuzzle';
// import Hangman from './components/HamngmanMain';
// import Home from './pages/Main Home';
// import About from './pages/Main About';
// import Work from './pages/How we work'
// function App() {
//     return (
//         <Router>
//             <div>
//                 <Routes>
//                 <Route path="/" element={<Home />} />
//                     <Route path="/signin" element={<SignIn />} />
//                     <Route path="/signup" element={<SignUp />} />
//                     <Route path="/signup1" element={<SignUp1 />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/emotions" element={<Emotions />} />
//                     <Route path="/game" element={<Game />} />
//                     <Route path="/puzzle" element={<Puzzle />} />
//                     <Route path="/hangman" element={<Hangman />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/help" element={<Work />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
