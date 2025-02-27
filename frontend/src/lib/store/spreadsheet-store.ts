import { create } from 'zustand';
import type { SpreadsheetState, CellValue } from '@/types/spreadsheet';
import type { AICommand, AIResponse } from '@/types/ai';
import { parseAICommand, processAIResponse } from '@/lib/ai-utils';

export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  cells: {},
  selectedCell: null,
  isProcessing: false,

  setCell: (id: string, value: Partial<CellValue>) =>
    set((state) => ({
      cells: {
        ...state.cells,
        [id]: { ...state.cells[id], ...value },
      },
    })),

  setSelectedCell: (id: string | null) =>
    set({ selectedCell: id }),

  processAICommand: async (prompt: string) => {
    try {
      set({ isProcessing: true });
      
      // Parse the natural language command
      const command = await parseAICommand(prompt);
      
      // Process the command and get response
      const response = await processAIResponse(command);
      
      // Update cells with the response
      Object.entries(response.cells).forEach(([cellId, value]) => {
        get().setCell(cellId, {
          value,
          formula: null,
          isComputing: false,
          error: null,
        });
      });
    } catch (error) {
      console.error('Error processing AI command:', error);
    } finally {
      set({ isProcessing: false });
    }
  }
})); 