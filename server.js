const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/techstack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const techSchema = new mongoose.Schema({
  name: String,
});

const Tech = mongoose.model('Tech', techSchema);

app.get('/api/technologies', async (req, res) => {
  try {
    const technologies = await Tech.find();
    res.json(technologies);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

