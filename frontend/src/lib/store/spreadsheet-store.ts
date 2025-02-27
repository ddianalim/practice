import { create } from 'zustand';
import type { SpreadsheetState, CellValue } from '@/types/spreadsheet';

export const useSpreadsheetStore = create<SpreadsheetState>((set) => ({
  cells: {},
  selectedCell: null,
  setCell: (id: string, value: Partial<CellValue>) =>
    set((state) => ({
      cells: {
        ...state.cells,
        [id]: { ...state.cells[id], ...value },
      },
    })),
  setSelectedCell: (id: string | null) =>
    set({ selectedCell: id }),
})); 