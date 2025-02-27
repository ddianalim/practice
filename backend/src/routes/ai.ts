import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/process', async (req, res) => {
  try {
    const { prompt, context } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a spreadsheet assistant. Convert natural language into spreadsheet operations. Return only JSON responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to process AI command' });
  }
});

export default router; 