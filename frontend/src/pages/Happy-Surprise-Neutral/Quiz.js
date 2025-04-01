// src/Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  // Define questions
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: [
        { id: 1, text: "Paris" },
        { id: 2, text: "London" },
        { id: 3, text: "Rome" },
        { id: 4, text: "Berlin" }
      ],
      correctAnswerId: 1
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: [
        { id: 1, text: "3" },
        { id: 2, text: "4" },
        { id: 3, text: "5" },
        { id: 4, text: "6" }
      ],
      correctAnswerId: 2
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: [
        { id: 1, text: "Earth" },
        { id: 2, text: "Mars" },
        { id: 3, text: "Jupiter" },
        { id: 4, text: "Saturn" }
      ],
      correctAnswerId: 2
    }
  ];

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    // Shuffle the questions when component mounts
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowNextButton(false);
  }, [currentIndex]);

  const handleAnswerClick = (id) => {
    setSelectedAnswer(id);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You've completed the quiz!");
    }
  };

  if (shuffledQuestions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="quiz-container">
      <h1 className="question-text">{currentQuestion.question}</h1>
      <ul>
        {currentQuestion.options.map(option => (
          <li
            key={option.id}
            onClick={() => handleAnswerClick(option.id)}
            className="answer-text"
            style={{
              cursor: 'pointer',
              backgroundColor: selectedAnswer === option.id ? 'lightgray' : 'white',
              padding: '10px',
              border: '1px solid #ccc',
              margin: '5px 0'
            }}
          >
            {option.text}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
      {isSubmitted && (
        <div>
          {selectedAnswer === currentQuestion.correctAnswerId ? (
            <p>Correct! 🎉</p>
          ) : (
            <p>Sorry, that's not right. The correct answer is {currentQuestion.options.find(option => option.id === currentQuestion.correctAnswerId)?.text}.</p>
          )}
        </div>
      )}
      {showNextButton && (
        <button onClick={handleNext} style={{ marginTop: '20px' }}>Next</button>
      )}
    </div>
  );
};

export default Quiz;
