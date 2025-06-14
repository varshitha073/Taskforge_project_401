import React, { useState } from 'react';
import '../styles/AIChatBot.css';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am your AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    const botReply = {
      from: 'bot',
      text: generateBotResponse(input),
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  const generateBotResponse = (text) => {
    text = text.toLowerCase();
    if (text.includes('add')) return 'To add a task, fill in the form and click "Add Task".';
    if (text.includes('delete')) return 'Click on a task and use the Delete button to remove it.';
    if (text.includes('edit') || text.includes('update')) return 'Click on a task and hit "Edit" to update it.';
    if (text.includes('complete') || text.includes('done')) return 'Click on a task and hit "Mark as Done" to complete it.';
    return "I'm here to help with your task management! Try asking about adding, editing, or deleting tasks.";
  };

  return (
    <div className="ai-container"> 
      <div className={`ai-chatbot ${isOpen ? 'open' : ''}`}>
        <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
          🤖 AI Assistant
        </div>

        {isOpen && (
          <div className="chat-body">
            <div className="messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.from}`}>{msg.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatBot;
