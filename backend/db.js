const { Client } = require('pg');

const client = new Client({
  user: 'misbahulhaque',
  host: 'localhost',
  database: 'chat_app',
  password: 'password',
  port: 5432,
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.stack);
  });

module.exports = client;
