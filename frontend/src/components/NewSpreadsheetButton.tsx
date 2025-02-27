import React from 'react';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';

export function NewSpreadsheetButton() {
  const { clearCells } = useSpreadsheetStore();

  const handleNewSpreadsheet = () => {
    clearCells();
    window.dispatchEvent(new CustomEvent('updateSpreadsheetTitle', { detail: 'Untitled Spreadsheet' }));
  };

  return (
    <button
      onClick={handleNewSpreadsheet}
      className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
    >
     New Spreadsheet
    </button>
  );
} 