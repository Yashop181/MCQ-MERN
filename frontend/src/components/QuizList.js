import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../design/QuizList.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/quizzes/')
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteQuiz = (id) => {
    axios.delete('http://localhost:8000/quizzes/' + id)
      .then(response => { console.log(response.data) });

    setQuizzes(quizzes.filter(el => el._id !== id));
  };

  return (
    <div className="quiz-list-container">
      <h3>Quiz List</h3>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id}>
            {quiz.title}
            <div className="quiz-actions">
              <button className="delete-button" onClick={() => deleteQuiz(quiz._id)}>Delete</button>
              <Link to={`/quizzes/${quiz._id}`} className="quiz-link">View Details</Link>
              <Link to={`/quizzes/${quiz._id}/take`} className="quiz-link">Take Quiz</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
