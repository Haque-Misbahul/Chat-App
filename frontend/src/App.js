// src/App.js
import React, { useState } from 'react';
import './App.css';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <h1>Chat App</h1>
      <MessageForm setMessages={setMessages} />  {/* Pass setMessages function */}
      <MessageList messages={messages} setMessages={setMessages} />      {/* Pass messages to MessageList */}
    </div>
  );
}

export default App;
