import React, { useState, useEffect } from 'react';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';

interface CellProps {
  id: string;
  isHeader?: boolean;
}

export function Cell({ id, isHeader = false }: CellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { cells, setCell, selectedCell, setSelectedCell } =
    useSpreadsheetStore();
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

  return (
    <div
      className={`relative w-full h-full min-h-[40px] ${
        selectedCell === id ? "bg-blue-50" : ""
      }`}
      onClick={() => !isHeader && setSelectedCell(id)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          className="absolute inset-0 w-full h-full p-2 border-2 border-blue-500"
          autoFocus
        />
      ) : (
        <div className="p-2">{cell.value}</div>
      )}
    </div>
  );
}
