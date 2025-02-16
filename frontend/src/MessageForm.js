// src/MessageForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = ({ setMessages }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5001/messages', {
      sender_name: senderName,
      message: message,
    })
      .then(response => {
        console.log('Message sent:', response);
        // Re-fetch messages after sending a new one
        axios.get('http://localhost:5001/messages')
          .then(response => {
            setMessages(response.data); // Update messages in parent component
          })
          .catch(error => {
            console.error('Error fetching messages:', error);
          });
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });

    setSenderName('');
    setMessage('');
  };

  return (
    <div>
  <h2>Send a New Message</h2>
  <form onSubmit={handleSubmit} className="message-form">
    <input
      type="text"
      placeholder="Your name"
      value={senderName}
      onChange={(e) => setSenderName(e.target.value)}
      required
      className="input-field"
    />
    <textarea
      placeholder="Your message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      required
      className="textarea-field"
    />
    <button type="submit" className="submit-btn">Send</button>
  </form>
</div>
  );
};

export default MessageForm;
