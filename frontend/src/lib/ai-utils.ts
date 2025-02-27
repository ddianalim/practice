import { processAICommand } from './api-client';

export async function parseAICommand(prompt: string): Promise<AICommand> {
  const response = await processAICommand(prompt);
  
  // Expect OpenAI to return a structured response like:
  // { type: 'fill', cells: { 'A1': 'Monthly Budget', 'A2': 'Income', ... } }
  return {
    type: response.type || 'fill',
    target: Object.keys(response.cells || {}),
    content: prompt
  };
}

export async function processAIResponse(command: AICommand): Promise<AIResponse> {
  // The AI has already provided the cell values in the response
  return {
    cells: command.cells || { [command.target[0]]: command.content }
  };
} 