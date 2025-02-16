import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);  // Track the current page
  const [totalPages, setTotalPages] = useState(1);  // Track total number of pages

  const messagesPerPage = 10;

  useEffect(() => {
    // Fetch messages for the current page and search query
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/messages`, {
          params: {
            page: page,
            limit: messagesPerPage,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [page]);  // Fetch messages whenever page changes

  // Handle search query change
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    setPage(1);  // Reset to page 1 when the search query changes
    // You may need to modify the search API call to handle search along with pagination
  };

  // Render page buttons
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          disabled={i === page}  // Disable the current page button
          className={`page-btn ${i === page ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="message-container">
      <h2>Messages</h2>
      <input
        type="text"
        placeholder="Search messages..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message._id || message.id} className="message-item">
            <div className="message-header">
              <strong>{message.sender_name}</strong>
              <span className="timestamp">{message.timestamp}</span>
            </div>
            <p className="message-content">{message.message}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default MessageList;
