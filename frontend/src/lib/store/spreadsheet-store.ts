import { create } from 'zustand';
import type { SpreadsheetState, CellValue } from '@/types/spreadsheet';
import type { AICommand, AIResponse } from '@/types/ai';
import { parseAICommand, processAIResponse } from '@/lib/ai-utils';
import { API_BASE_URL } from '@/lib/api-client';
import { populateTableData } from '@/lib/spreadsheet-utils';

export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  cells: {},
  selectedCell: null,
  isProcessing: false,
  currentSpreadsheetId: null,
  title: 'Untitled Spreadsheet',

  clearCells: () => set({ 
    cells: {}, 
    currentSpreadsheetId: null,
    title: 'Untitled Spreadsheet'
  }),

  setTitle: (title: string) => set({ title }),

  setCell: (id: string, value: Partial<CellValue>) =>
    set((state) => ({
      cells: {
        ...state.cells,
        [id]: { ...state.cells[id], ...value },
      },
    })),

  setSelectedCell: (id: string | null) =>
    set({ selectedCell: id }),

  setCurrentSpreadsheetId: (id: string | null) => set({ currentSpreadsheetId: id }),

  processAICommand: async (prompt: string) => {
    try {
      set({ isProcessing: true });
      
      const response = await fetch(`${API_BASE_URL}/ai/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      
      if (data.type === 'table') {
        const cells = populateTableData(data.headers, data.rows);
        set((state) => ({ cells }));
      }
    } catch (error) {
      console.error('Error processing AI command:', error);
    } finally {
      set({ isProcessing: false });
    }
  },

  saveSpreadsheet: async (title: string) => {
    try {
      const cells = get().cells;
      const currentId = get().currentSpreadsheetId;
      const method = currentId ? 'PUT' : 'POST';
      const url = currentId 
        ? `${API_BASE_URL}/spreadsheet/update/${currentId}`
        : `${API_BASE_URL}/spreadsheet/save`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cells, title }),
      });

      if (!response.ok) {
        throw new Error('Failed to save spreadsheet');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  },

  deleteSpreadsheet: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/spreadsheet/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete spreadsheet');
      }
      
      set({ currentSpreadsheetId: null });
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
})); 