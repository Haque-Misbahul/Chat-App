const express = require('express');
const cors = require('cors');
const client = require('./db');  // Import the database connection

const app = express();
const PORT = 5001;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Route to post a new message
app.post('/messages', async (req, res) => {
    const { sender_name, message } = req.body;
    const timestamp = new Date().toISOString();
  
    try {
      await client.query(
        'INSERT INTO messages (sender_name, message, timestamp) VALUES ($1, $2, $3)',
        [sender_name, message, timestamp]
      );
      res.status(201).send('Message sent');
    } catch (err) {
      console.error('Error inserting message:', err.stack); // Log the error
      res.status(500).send('Error sending message');
    }
  });
  

// Route to get all messages
app.get('/messages', async (req, res) => {
  try {
    // Get all messages from the database
    const result = await client.query('SELECT * FROM messages ORDER BY timestamp DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err.stack);
    res.status(500).send('Error fetching messages');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
