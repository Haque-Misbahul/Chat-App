import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = ({ messages, setMessages }) => {
    const [searchQuery, setSearchQuery] = useState('');

  // Fetch messages from the backend API
  useEffect(() => {
    if (searchQuery) {
      console.log('Fetching search results for:', searchQuery); // Debugging log
      axios.get(`http://localhost:5001/search?query=${searchQuery}`)
        .then(response => {
          console.log('Search response:', response.data); // Check what response we are getting
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    } else {
      console.log('Fetching all messages');
      axios.get('http://localhost:5001/messages')
        .then(response => {
          setMessages(response.data); // Store all messages
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [searchQuery]);  // Run whenever searchQuery changes

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    console.log("Search query:", query);  // check that it's being captured correctly
    setSearchQuery(query); // Update the search query state
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  // Filter messages based on the search query
  const filteredMessages = messages.filter(message =>
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="message-container">
      <h2>Messages</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search messages..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Message List */}
      <ul className="message-list">
        {filteredMessages.map((message, index) => (
          <li key={message._id || index} className="message-item">
            <div className="message-header">
              <strong>{message.sender_name}</strong>
              <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
            </div>
            <p className="message-content">{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
