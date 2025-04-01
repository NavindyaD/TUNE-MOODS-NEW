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

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, []);

  const handleAnswerClick = (id) => {
    setSelectedAnswer(id);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (!currentQuestion) {
    return <p>Loading question...</p>;
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
    </div>
  );
};

export default Quiz;
