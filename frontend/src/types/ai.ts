export interface AIResponse {
  type: 'fill' | 'analyze' | 'generate';
  cells: Record<string, string>;
  error?: string;
}

export interface AICommand {
  type: string;
  target: string[];
  content: string;
  cells?: Record<string, string>;
} 