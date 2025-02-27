export const API_BASE_URL = 'http://localhost:3001/api';

export async function processAICommand(prompt: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to process AI command');
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 