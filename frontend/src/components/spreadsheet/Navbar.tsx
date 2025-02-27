"use client";

import { useState } from 'react';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';

export function Navbar({ onSave }: { onSave?: () => void }) {
  const [title, setTitle] = useState('Untitled Spreadsheet');
  
  const handleSave = async () => {
    try {
      await useSpreadsheetStore.getState().saveSpreadsheet(title);
      if (onSave) onSave();
      alert('Spreadsheet saved successfully!');
    } catch (error) {
      alert('Failed to save spreadsheet');
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold px-2 py-1 border border-transparent hover:border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
        placeholder="Untitled Spreadsheet"
      />
      <button
        onClick={handleSave}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Save Spreadsheet"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </button>
    </div>
  );
} 