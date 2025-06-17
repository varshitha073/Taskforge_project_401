import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/infoPages.css';

const featuresList = [
  { icon: '✅', title: 'Task Creation & Deadlines' },
  { icon: '💬', title: 'Real-time AI Suggestions' },
  { icon: '📊', title: 'Progress Tracking' },
  { icon: '🔔', title: 'Push Notifications' },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="info-wrapper">
      <div className="info-card">
        <div className="emoji">✨</div>
        <h2 className="title">TaskForge Features</h2>
        <div className="features-list">
          {featuresList.map((feature, index) => (
            <div
              className="feature-item fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
              key={index}
            >
              <span className="feature-icon">{feature.icon}</span>
              <p className="feature-text">{feature.title}</p>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={() => navigate('/')}>
          ← 
        </button>
      </div>
    </div>
  );
};

export default Features;
