import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const systemPrompt = `You are a spreadsheet AI assistant. Convert natural language into structured table data.
IMPORTANT: You must ONLY respond with valid JSON. Do not include any other text.
The JSON must follow this exact format with maximum 30 rows:

{
  "type": "table",
  "headers": ["Company", "Industry", "CEO", "Size", "Location", "Revenue"],
  "rows": [
    ["Salesforce", "Technology", "Marc Benioff", "50000+", "San Francisco", "$21.25B"]
  ]
}

Rules:
1. Never return more than 30 rows
2. Only return the JSON object, no other text
3. Ensure the JSON is properly formatted`;

router.post('/process', async (req, res) => {
  try {
    const { prompt } = req.body;

    const payload = {
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
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
      ]
    };

    const groqResponse = await axios.post<GroqResponse>(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const content = groqResponse.data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from Groq');
    }

    try {
      const parsedContent = JSON.parse(content.trim());
      res.json(parsedContent);
    } catch (parseError) {
      console.error('Failed to parse Groq response:', content);
      res.status(500).json({ 
        error: 'Invalid response format from AI',
        details: content 
      });
    }
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({ error: 'Failed to process AI command' });
  }
});

export default router; 