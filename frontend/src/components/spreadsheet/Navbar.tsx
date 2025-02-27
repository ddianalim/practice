"use client";

import { useState, useEffect } from 'react';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';

export function Navbar({ onSave }: { onSave?: () => void }) {
  const [title, setTitle] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const currentSpreadsheetId = useSpreadsheetStore((state) => state.currentSpreadsheetId);
  const deleteSpreadsheet = useSpreadsheetStore((state) => state.deleteSpreadsheet);
  const clearCells = useSpreadsheetStore((state) => state.clearCells);
  
  useEffect(() => {
    setMounted(true);
    setTitle('Untitled Spreadsheet');
  }, []);

  useEffect(() => {
    const handleTitleUpdate = (event: CustomEvent) => {
      setTitle(event.detail);
    };

    window.addEventListener('updateSpreadsheetTitle', handleTitleUpdate as EventListener);
    return () => {
      window.removeEventListener('updateSpreadsheetTitle', handleTitleUpdate as EventListener);
    };
  }, []);

  const handleSave = async () => {
    if (!title) return;
    try {
      await useSpreadsheetStore.getState().saveSpreadsheet(title);
      if (onSave) onSave();
      alert('Spreadsheet saved successfully!');
    } catch (error) {
      alert('Failed to save spreadsheet');
    }
  };

  const handleDelete = async () => {
    if (!currentSpreadsheetId) return;
    
    if (confirm('Are you sure you want to delete this spreadsheet?')) {
      try {
        await deleteSpreadsheet(currentSpreadsheetId);
        clearCells();
        setTitle('Untitled Spreadsheet');
        if (onSave) onSave(); // This will refresh the list
        alert('Spreadsheet deleted successfully!');
      } catch (error) {
        alert('Failed to delete spreadsheet');
      }
    }
  };
  
  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between py-2 px-4 border-t border-x border-gray-200 rounded-t-lg bg-white">
      <input
        type="text"
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold px-2 py-1 border border-transparent hover:border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 w-96"
        placeholder="Untitled Spreadsheet"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Save Spreadsheet"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
        {currentSpreadsheetId && (
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Delete Spreadsheet"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 