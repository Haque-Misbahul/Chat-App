// src/MessageList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the backend API
  useEffect(() => {
    axios.get('http://localhost:5001/messages')
      .then(response => {
        setMessages(response.data); // Store messages in state
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <strong>{message.sender_name}</strong>: {message.message} <em>({message.timestamp})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
