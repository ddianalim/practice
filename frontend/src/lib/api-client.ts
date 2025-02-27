const API_BASE_URL = 'http://localhost:3001/api';

export async function processAICommand(prompt: string) {
  const response = await fetch(`${API_BASE_URL}/ai/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to process AI command');
  }

  return response.json();
} 