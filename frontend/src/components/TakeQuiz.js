import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../design/TakeQuiz.css";

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/quizzes/${id}`);
        setQuiz(response.data);
        initializeSelectedAnswers(response.data);
      } catch (error) {
        setError('Error fetching quiz: ' + error.message);
      }
    };

    fetchQuiz();
  }, [id]);

  const initializeSelectedAnswers = (quizData) => {
    const initialAnswers = {};
    quizData.questions.forEach((question, index) => {
      initialAnswers[index] = null; // Initialize selected answer for each question
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/quizzes/${id}/submit`, { answers: selectedAnswers });
      setScore(response.data.score);
    } catch (error) {
      setError('Error submitting quiz: ' + error.message);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="take-quiz-container">
      <h2>Take Quiz: {quiz.title}</h2>
      <form onSubmit={handleSubmitQuiz}>
        <ul>
          {quiz.questions.map((question, questionIndex) => (
            <li key={questionIndex}>
              <p>{question.questionText}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={selectedAnswers[questionIndex] === optionIndex}
                        onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      />
                      {option.optionText}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button type="submit">Submit Quiz</button>
      </form>
      {score !== null && (
        <div className="score">
          <h3>Your Score: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
