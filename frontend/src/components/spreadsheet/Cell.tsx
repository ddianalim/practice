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

  const isColumnHeader = id.match(/^[A-Z]1$/);
  const isRowHeader = id.match(/^A[0-9]+$/);
  
  const cellClassName = `
    p-2 border border-gray-200 outline-none min-w-[100px] h-[40px] text-gray-900
    ${isColumnHeader ? 'bg-gray-100 font-bold text-center border-b-2 text-gray-900' : ''}
    ${isRowHeader ? 'bg-gray-50 font-semibold text-center border-r-2 text-gray-900' : ''}
    ${selectedCell === id ? 'ring-2 ring-blue-500' : ''}
    ${isEditing ? 'bg-white' : 'hover:bg-gray-50'}
  `.trim();

  return (
    <div
      className={cellClassName}
      onDoubleClick={handleDoubleClick}
      onClick={() => setSelectedCell(id)}
    >
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full h-full outline-none p-1 text-gray-900"
        />
      ) : (
        <div className="w-full h-full overflow-hidden text-ellipsis text-gray-900">
          {cell.value}
        </div>
      )}
    </div>
  );
}
