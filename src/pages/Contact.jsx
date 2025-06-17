import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/infoPages.css';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="info-wrapper">
      <div className="info-card">
        <div className="emoji">📬</div>
        <h2 className="title">Contact Us</h2>
        <p className="description">
          We'd love to hear from you! If you have any questions, suggestions, or feedback, feel free to reach out to us.
        </p>
        <div className="contact-details">
          <p><strong>Email:</strong> Taskforge07@gmail.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
          <p><strong>Address:</strong> Bhimavaram, Andhra Pradesh, India</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>
          ← 
        </button>
      </div>
    </div>
  );
};

export default Contact;
