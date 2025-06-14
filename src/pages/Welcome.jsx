import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const quote = '“Stay focused and never give up!” — TaskForge AI';

  return (
    <div className="welcome-container">
      <div className="background-animation"></div>

      <div className="welcome-content">
        <h1 className="logo">🚀 TaskForge</h1>
        <p className="quote">{quote}</p>
        <div className="buttons">
          <button className="btn" onClick={() => navigate('/register')}>
            Get Started
          </button>
          <button className="btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
