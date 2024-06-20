import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (error) {
    return <div>Error fetching quiz: {error.message}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {/* Render other details of the quiz */}
    </div>
  );
};

export default QuizDetails;
