# **Chat Message System - Setup and Test Guide**  

## **Overview**  

This repository contains a simple chat message system built with **Node.js, Express**, **React**, **PostgreSQL**, and **Elasticsearch**. The application allows users to send messages, view all messages, and search through messages.  

## **Technologies Used**  

- **Backend**: Node.js, Express  
- **Database**: PostgreSQL  
- **Search**: Elasticsearch  
- **Frontend**: React  

## **Prerequisites**  

Before setting up this project, ensure you have the following installed:  

1. **Node.js** (14.18.1)  
2. **PostgreSQL** (13.4)  
3. **Elasticsearch** (7.10.0)  

---

## **Setup**  

### **Clone the Repository**  

Clone the repository to your local machine:  

```bash
git clone https://github.com/Haque-Misbahul/Chat-App.git
cd Chat-App
```

---

## **Backend Setup**  

### **Install Backend Dependencies**  

Navigate to the backend folder and install the required dependencies:  

```bash
cd backend
npm install
```

---

### **Create the Database in PostgreSQL**  

Run the following command in your PostgreSQL terminal to create a database:  

```sql
CREATE DATABASE chat_app;
```

Next, create a `messages` table:  

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(255),
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **Configure Database Connection**  

Open `backend/db.js` and ensure your database connection details are correct:  

```javascript
const { Client } = require('pg');

const dbClient = new Client({
  user: 'your_postgresql_user',   // Change to your PostgreSQL username
  host: 'localhost',
  database: 'chat_app',
  password: 'your_password',      // Change to your PostgreSQL password
  port: 5432,
});

dbClient.connect();
module.exports = dbClient;
```

---

### **Start Elasticsearch**  

Ensure Elasticsearch is up and running by executing the following command:  

```bash
elasticsearch
```

You can check if Elasticsearch is running correctly by visiting:  
[http://localhost:9200](http://localhost:9200)  

---

### **Start the Backend Server**  

In the `backend` directory, start the Express server:  

```bash
node server.js
```

The backend should now be running at:  
[http://localhost:5001](http://localhost:5001)  

---

## **Frontend Setup**  

### **Install Frontend Dependencies**  

Navigate to the frontend folder and install the required dependencies:  

```bash
cd frontend
npm install
```

---

### **Start the Frontend React Application**  

In the `frontend` directory, start the React development server:  

```bash
npm start
```

The frontend should now be running at:  
[http://localhost:3000](http://localhost:3000)  

---

## **Testing the Application**  

### **Test Message Sending**  

1. Open the app in your browser at [http://localhost:3000](http://localhost:3000).  
2. Enter your name and a message in the input fields and click the **Send** button.  
3. The message should be:  
   - Sent to the backend  
   - Stored in PostgreSQL  
   - Indexed in Elasticsearch  
4. The message should immediately appear in the message list.  

---

### **Test Message Search**  

1. Use the search bar at the top of the message list to search for a specific message.  
2. The search query will be sent to Elasticsearch.  
3. Matching messages will be displayed.  

---

### **Test Message List**  

- The message list should display all messages in the database.  
- Each message will show:  
  - Sender's name  
  - Message content  
  - Timestamp  

---

## **Testing the Backend API Manually (Optional)**  

You can test the backend API using **Postman** or **cURL**. Below are the relevant endpoints:  

### **Send a New Message**  

**POST** `/messages`:  

```bash
curl -X POST http://localhost:5001/messages -H "Content-Type: application/json" -d '{"sender_name": "John", "message": "Hello World!"}'
```

---

### **Fetch All Messages**  

**GET** `/messages`:  

```bash
curl -X GET http://localhost:5001/messages
```

---

### **Search Messages**  

**GET** `/search?query=<search_term>`:  

```bash
curl -X GET "http://localhost:5001/search?query=hello"
```

---

