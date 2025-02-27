export type CellPosition = {
  row: number;
  col: number;
};

export type CellValue = {
  id: string;
  value: string;
  formula: string | null;
  isComputing: boolean;
  error: string | null;
};

export interface SpreadsheetState {
  cells: Record<string, CellValue>;
  selectedCell: string | null;
  isProcessing: boolean;
  currentSpreadsheetId: string | null;
  clearCells: () => void;
  setCell: (id: string, value: Partial<CellValue>) => void;
  setSelectedCell: (id: string | null) => void;
  setCurrentSpreadsheetId: (id: string | null) => void;
  processAICommand: (prompt: string) => Promise<void>;
  saveSpreadsheet: (title: string) => Promise<any>;
  deleteSpreadsheet: (id: string) => Promise<void>;
}