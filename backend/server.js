const express = require('express');
const cors = require('cors');
const dbClient = require('./db');  // PostgreSQL client from './db'
const searchMessages = require('./searchMessages'); // Import  searchMessages function

// Elasticsearch client
const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://localhost:9200' });

const app = express();
const PORT = 5001;

// Middleware to parse JSON bodies
app.use(cors({
  origin: '*', 
}));

app.use(express.json());

// Route to post a new message
app.post('/messages', async (req, res) => {
  const { sender_name, message } = req.body;
  const timestamp = new Date().toISOString();

  try {
    // Insert message into PostgreSQL
    await dbClient.query(
      'INSERT INTO messages (sender_name, message, timestamp) VALUES ($1, $2, $3)',
      [sender_name, message, timestamp]
    );

    // Insert message into Elasticsearch
    await esClient.index({
      index: 'messages_v2', // Define the index name
      body: {
        sender_name,
        message,
        timestamp
      }
    });
    res.status(201).send('Message sent');
  } catch (err) {
    console.error('Error inserting message:', err.stack);
    res.status(500).send('Error sending message');
  }
});

// Route to get all messages (for testing)
app.get('/messages', async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM messages');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err.stack);
    res.status(500).send('Error fetching messages');
  }
});

// Route to search messages
app.get('/search', async (req, res) => {
  const query = req.query.query || '';
  console.log('Search query received:', query); // Log the query received

  try {
    const searchResults = await searchMessages(query);  // Call the new search function

    if (searchResults.length > 0) {
      res.status(200).json(searchResults.map(result => result._source)); // Return the search results
    } else {
      console.log('No search results found');
      res.status(404).send('No results found');
    }
  } catch (err) {
    console.error('Error searching messages:', err);
    res.status(500).send(`Error searching messages: ${err.message}`);
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
