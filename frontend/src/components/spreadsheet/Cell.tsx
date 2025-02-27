import React, { useState, useEffect } from 'react';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';

interface CellProps {
  id: string;
  isHeader?: boolean;
}

export function Cell({ id, isHeader = false }: CellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { cells, setCell, selectedCell, setSelectedCell } = useSpreadsheetStore();
  const cell = cells[id] || {
    value: "",
    formula: null,
    isComputing: false,
    error: null,
  };

  // In Cell component
//   console.log("Rendering cell:", id, cell);

  const handleDoubleClick = () => {
    if (!isHeader) {
      setIsEditing(true);
      setInputValue(cell.formula || cell.value);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (cell.value !== inputValue) {
      const isFormula = inputValue.startsWith("=AI(");
      setCell(id, {
        value: inputValue,
        formula: isFormula ? inputValue : null,
        isComputing: isFormula,
        error: null,
      });
    }
  };

  // Add useEffect to handle formula evaluation
  useEffect(() => {
    if (cell.formula?.startsWith('=AI(')) {
      const prompt = cell.formula.slice(4, -1).replace(/['"]/g, '');
      useSpreadsheetStore.getState().processAICommand(prompt);
    }
  }, [cell.formula]);

  return (
    <div
      className={`relative w-full h-full min-h-[40px] border-b border-r border-gray-300 ${
        selectedCell === id ? "bg-blue-50" : ""
      } ${cell.isComputing ? "bg-gray-50" : ""}`}
      onClick={() => !isHeader && setSelectedCell(id)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBlur();
            }
          }}
          className="absolute inset-0 w-full h-full p-2 border-2 border-blue-500 focus:outline-none text-black"
          autoFocus
        />
      ) : (
        <div className="p-2 text-black">{cell.value}</div>
      )}
      {cell.isComputing && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
          Processing...
        </div>
      )}
    </div>
  );
}
