export async function parseAICommand(prompt: string): Promise<AICommand> {
  // For now, we'll use a simple parsing logic
  // Later, we can use AI to parse natural language
  const defaultCommand: AICommand = {
    type: 'fill',
    target: ['A1'],
    content: prompt
  };

  return defaultCommand;
}

export async function processAIResponse(command: AICommand): Promise<AIResponse> {
  // TODO: Replace with actual OpenAI API call
  // For now, just echo the command
  return {
    cells: {
      [command.target[0]]: `AI Response to: ${command.content}`
    }
  };
} 