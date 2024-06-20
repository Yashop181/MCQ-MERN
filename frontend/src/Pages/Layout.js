import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css'
const Layout = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/quizzes">Quizzes</Link>
          </li>
          <li>
            <Link to="/add">Add Quiz</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
