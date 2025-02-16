// Import Elasticsearch client
const { Client } = require('@elastic/elasticsearch');

// Create Elasticsearch client
const esClient = new Client({
  node: 'http://localhost:9200',
});

// Function to search messages in Elasticsearch
async function searchMessages(query) {
  try {
    // Perform search with fuzziness
    const { body } = await esClient.search({
      index: 'messages_v2',  // The index where your messages are stored
      body: {
        query: {
          match: {
            message: {
              query: query,
              fuzziness: 'AUTO',  // Allow fuzzy search
            },
          },
        },
      },
    });

    // Return search results
    return body.hits.hits;
  } catch (err) {
    console.error('Error searching messages:', err);
    throw err;  // Rethrow error to be handled by the caller
  }
}

module.exports = searchMessages;
