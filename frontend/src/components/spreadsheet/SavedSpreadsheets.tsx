"use client";

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-client';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';

export function SavedSpreadsheets({ onRefresh }: { onRefresh?: () => void }) {
  const [spreadsheets, setSpreadsheets] = useState([]);
  const { cells, setCell, clearCells } = useSpreadsheetStore();

  const fetchSpreadsheets = async () => {
    const response = await fetch(`${API_BASE_URL}/spreadsheet/list`);
    const data = await response.json();
    setSpreadsheets(data);
    if (onRefresh) onRefresh();
  };

  useEffect(() => {
    fetchSpreadsheets();
  }, []);

  const loadSpreadsheet = (sheet) => {
    clearCells();
    Object.entries(sheet.cells).forEach(([id, value]) => {
      setCell(id, value);
    });
    useSpreadsheetStore.getState().setCurrentSpreadsheetId(sheet._id);
    window.dispatchEvent(new CustomEvent('updateSpreadsheetTitle', { detail: sheet.title }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">Saved Spreadsheets</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {spreadsheets.map((sheet) => (
          <button
            key={sheet._id}
            onClick={() => loadSpreadsheet(sheet)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-900"
          >
            {sheet.title || 'Untitled Spreadsheet'}
          </button>
        ))}
      </div>
    </div>
  );
} 