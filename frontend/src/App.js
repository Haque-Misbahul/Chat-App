// src/App.js
import React from 'react';
import './App.css';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

function App() {
  return (
    <div className="App">
      <h1>Chat App</h1>
      <MessageForm />
      <MessageList />
    </div>
  );
}

export default App;
