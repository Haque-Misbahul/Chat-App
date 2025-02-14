// src/MessageForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the new message to the backend API
    axios.post('http://localhost:5001/messages', {
      sender_name: senderName,
      message: message,
    })
      .then(response => {
        console.log('Message sent:', response);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });

    // Clear the form fields after submitting
    setSenderName('');
    setMessage('');
  };

  return (
    <div>
      <h2>Send a New Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
