"use client";

import React from "react";
import { Cell } from "./Cell";
import { useSpreadsheetStore } from "@/lib/store/spreadsheet-store";
import { ColumnHeader } from './ColumnHeader';

export function Grid() {
  const columns = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const rows = Array.from({ length: 100 }, (_, i) => i + 1);

  const store = useSpreadsheetStore();
  console.log('Store state:', store);

  return (
    <div className="overflow-auto border-b border-x border-gray-200 rounded-b-lg shadow-sm">
      <div className="grid" style={{ 
        gridTemplateColumns: `40px repeat(${columns.length}, minmax(100px, 1fr))`,
      }}>
        {/* Corner cell */}
        <div className="h-8 bg-gray-100 border-b-2 border-r-2 border-gray-300" />
        
        {/* Column headers */}
        {columns.map(col => (
          <ColumnHeader key={col} label={col} />
        ))}

        {/* Row headers and cells */}
        {rows.map(row => (
          <React.Fragment key={row}>
            <div className="flex items-center justify-center h-8 bg-gray-50 border-r-2 border-gray-300 font-semibold text-sm text-gray-900">
              {row}
            </div>
            {columns.map(col => (
              <Cell key={`${col}${row}`} id={`${col}${row}`} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
