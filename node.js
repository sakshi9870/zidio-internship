// server.js (or app.js)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/resumeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
app.get('/api/resume', (req, res) => {
  // Handle the request, e.g., get resume data from the database
  res.json({ message: 'Resume data' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
