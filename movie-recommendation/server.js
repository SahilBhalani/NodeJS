const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = 3000;

if (!process.env.GEMINI_API_KEY) {
  throw new Error('❌ GEMINI_API_KEY is missing in .env');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(express.static('public'));

app.get('/recommend', async (req, res) => {
  try {
    const userInput = req.query.input;

    if (!userInput) {
      return res.status(400).send('Input is required');
    }

    console.log('User input:', userInput);

    const prompt = `
You are a movie recommendation system.
Recommend movies in bullet points.

User preference:
${userInput}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.send(text);
  } catch (error) {
    console.error('🔥 Gemini Error:', error);
    res.status(500).send('Error generating recommendation');
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
