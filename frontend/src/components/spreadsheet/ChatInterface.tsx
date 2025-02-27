"use client";

import React, { useState } from "react";
import { useSpreadsheetStore } from "@/lib/store/spreadsheet-store";

export function ChatInterface() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { processAICommand, isProcessing } = useSpreadsheetStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setError(null);
    try {
      await processAICommand(prompt);
      setPrompt("");
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process command');
    }
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm">
      <div className="p-4 border border-gray-200 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter instructions (e.g., 'Create a monthly budget template')"
            className="w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isProcessing}
          />
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={isProcessing || !prompt}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? "Processing..." : "Send"}
          </button>
          <button
            onClick={async () => {
              try {
                await useSpreadsheetStore.getState().saveSpreadsheet();
                alert('Spreadsheet saved successfully!');
              } catch (error) {
                alert('Failed to save spreadsheet');
              }
            }}
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
          >
            Save to MongoDB
          </button>
        </form>
      </div>
    </div>
  );
}
