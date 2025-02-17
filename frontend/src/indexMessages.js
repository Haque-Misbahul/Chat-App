// Import necessary modules
const { Client: PgClient } = require('pg');
const { Client: EsClient } = require('@elastic/elasticsearch');

// Create PostgreSQL client
const pgClient = new PgClient({
    user: 'misbahulhaque',//Change username 
    host: 'localhost',
    database: 'chat_app',
    password: 'password',//change password
    port: 5432,
});

// Create Elasticsearch client
const esClient = new EsClient({
  node: 'http://localhost:9200',
});

// Connect to PostgreSQL
pgClient.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('PostgreSQL connection error', err.stack));

// Function to index messages from PostgreSQL to Elasticsearch
async function indexMessages() {
  try {
    // Fetch messages from PostgreSQL
    const res = await pgClient.query('SELECT * FROM messages');

    // Index each message into Elasticsearch
    for (let message of res.rows) {
        try {
            const { body } = await esClient.index({
                index: 'messages_v2', // The index name
                body: {
                    sender_name: message.sender_name, // Sender's name
                    message: message.message, // The actual message
                    timestamp: message.timestamp, // The timestamp
                }
            });
    
            console.log(`Indexed message: ${message.message}`);
        } catch (error) {
            console.error(`Error indexing message: ${message.message}`, error);
        }
    }

  } catch (err) {
    console.error('Error indexing messages:', err);
  } finally {
    pgClient.end();
  }
}

// Call the function to start the indexing process
indexMessages();
