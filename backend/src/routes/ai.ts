import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are a spreadsheet AI assistant. Convert natural language into structured table data.
Always respond with JSON in this format:
{
  "type": "table",
  "headers": ["Company", "Industry", "CEO", "Size", "Location", "Revenue"],
  "rows": [
    ["Salesforce", "Technology", "Marc Benioff", "50000+", "San Francisco", "$21.25B"],
    // ... more rows
  ]
}`;

router.post('/process', async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Given this request: "${prompt}"
          Return a JSON response with structured table data.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    res.json(JSON.parse(content));
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to process AI command' });
  }
});

export default router; 