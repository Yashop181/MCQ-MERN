// App.js

import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';

import QuizzesList from './components/QuizList';
import QuizDetails from './components/QuizDetails';
import AddQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';

function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path="quizzes" element={<QuizzesList />} />
            <Route path="add" element={<AddQuiz />} />
            <Route path="quizzes/:id" element={<QuizDetails />} />
            <Route path="quizzes/:id/take" element={<TakeQuiz />} />

          </Route>
        </Routes>
      </div>

  );
}

export default App;
