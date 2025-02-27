"use client";

import React from "react";
import { Cell } from "./Cell";
import { useSpreadsheetStore } from "@/lib/store/spreadsheet-store";

export function Grid() {
  const ROWS = 26; // A-Z
  const COLS = 10;

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  const getCellId = (row: number, col: number) =>
    `${getColumnLabel(col)}${row + 1}`;

  const store = useSpreadsheetStore();
  console.log('Store state:', store);

  return (
    <div className="overflow-auto border border-gray-800 rounded-lg bg-white">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `auto repeat(${COLS}, minmax(100px, 1fr))`,
        }}
      >
        {/* Header row */}
        <div className="bg-gray-200 p-2 border-b border-r border-gray-300" />
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={`header-${i}`}
            className="bg-gray-200 p-2 border-b border-r border-gray-300 text-center font-medium text-black"
          >
            {getColumnLabel(i)}
          </div>
        ))}

        {/* Grid cells */}
        {Array.from({ length: ROWS }).map((_, row) => (
          <React.Fragment key={row}>
            <div className="bg-gray-200 p-2 border-b border-r border-gray-300 text-center font-medium text-black">
              {row + 1}
            </div>
            {Array.from({ length: COLS }).map((_, col) => (
              <Cell key={getCellId(row, col)} id={getCellId(row, col)} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
