import React from 'react';
import { NewSpreadsheetButton } from './NewSpreadsheetButton';

export function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-black">Full Stack Practice</h1>
      <NewSpreadsheetButton />
    </div>
  );
} 