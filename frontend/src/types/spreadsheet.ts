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

export type SpreadsheetState = {
  cells: Record<string, CellValue>;
  selectedCell: string | null;
}; 