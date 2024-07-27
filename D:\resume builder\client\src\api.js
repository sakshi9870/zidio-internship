// src/api.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

export const fetchResumeData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/resume`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};
