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

export interface SpreadsheetStore {
  cells: Record<string, CellValue>;
  selectedCell: string | null;
  setCell: (id: string, value: Partial<CellValue>) => void;
  setSelectedCell: (id: string | null) => void;
  processAICommand: (prompt: string) => Promise<void>;
  isProcessing: boolean;
}