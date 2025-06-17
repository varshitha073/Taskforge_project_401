import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/infoPages.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="info-wrapper">
      <div className="info-card">
        <div className="emoji">🚀</div>
        <h2 className="title">About TaskForge</h2>
        <p className="description">
          TaskForge is a powerful and intuitive task management platform designed to help individuals stay organized, productive, and focused. Whether you're managing daily routines, project deadlines, or long-term goals, TaskForge offers the tools you need to keep everything on track.
        </p>
        <button className="back-button" onClick={() => navigate('/')}>
          ← 
        </button>
      </div>
    </div>
  );
};

export default About;
