const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Joi = require('joi');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB
});

// OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.SECRET_KEY
});
const openai = new OpenAIApi(configuration);

// Resume schema validation
const resumeSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  currentPosition: Joi.string().required(),
  currentLength: Joi.string().required(),
  currentTechnologies: Joi.array().items(Joi.string()).required(),
  workHistory: Joi.string().required(),
});

// GPT-3 function
const GPTFunction = async (text) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.6,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating text from OpenAI:', error);
    throw error;
  }
};

// API route to test server
app.get('/api', (req, res) => {
  res.json({
    message: "Subscribe to the Channel"
  });
});

// Create resume route
app.post('/resume/create', upload.single('headShotImage'), async (req, res) => {
  try {
    const { error } = resumeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: 'Invalid resume data' });
    }

    const { fullname, currentPosition, currentLength, currentTechnologies, workHistory } = req.body;
    const headShot = req.file;

    const workArray = JSON.parse(workHistory);

    // Generate resume data using GPT-3
    const prompt1 = `I am writing a resume, my details are as follows: \nName: ${fullname} \nRole: ${currentPosition} (${currentLength} years) \nTechnologies: ${currentTechnologies.join(', ')}. Can you write a 100-word description for the top of the resume?`;
    const prompt2 = `Please write 10 key points for a resume on what I am good at, based on the following details: \nName: ${fullname} \nRole: ${currentPosition} (${currentLength} years) \nTechnologies: ${currentTechnologies.join(', ')}`;
    const prompt3 = `For the following work experience, please write 50 words for each company describing my success: \n${workArray.map((work, index) => `${index + 1}. Company: ${work.name}, Role: ${work.position}`).join('\n')}`;

    const objective = await GPTFunction(prompt1);
    const keypoints = await GPTFunction(prompt2);
    const jobResponsibilities = await GPTFunction(prompt3);

    const resume = {
      fullname,
      currentPosition,
      currentLength,
      currentTechnologies,
      headShot: headShot ? `/uploads/${headShot.filename}` : null,
      workExperience: workArray,
      education: [], // Populate as needed
      skills: currentTechnologies,
      objective,
      keypoints,
      jobResponsibilities,
    };

    // Save the resume to a file
    fs.writeFileSync(`resumes/${fullname}.json`, JSON.stringify(resume));

    res.json({
      message: 'Request Successful',
      data: resume
    });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
