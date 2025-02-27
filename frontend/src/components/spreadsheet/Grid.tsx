'use client';

import { useState } from 'react';
import { useSpreadsheetStore } from '@/lib/store/spreadsheet-store';
import React from 'react';

export function Grid() {
  const ROWS = 26; // A-Z
  const COLS = 10;

  const getColumnLabel = (index: number) => 
    String.fromCharCode(65 + index);

  return (
    <div className="overflow-auto border border-gray-200 rounded-lg">
      <div className="grid" 
        style={{ 
          gridTemplateColumns: `auto repeat(${COLS}, minmax(100px, 1fr))` 
        }}>
        {/* Header row */}
        <div className="bg-gray-50 p-2 border-b border-r border-gray-200" />
        {Array.from({ length: COLS }).map((_, i) => (
          <div key={i} className="bg-gray-50 p-2 border-b border-r border-gray-200 text-center">
            {getColumnLabel(i)}
          </div>
        ))}
        
        {/* Grid cells */}
        {Array.from({ length: ROWS }).map((_, row) => (
          <React.Fragment key={row}>
            <div className="bg-gray-50 p-2 border-b border-r border-gray-200 text-center">
              {row + 1}
            </div>
            {Array.from({ length: COLS }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="p-2 border-b border-r border-gray-200 min-h-[40px]"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}