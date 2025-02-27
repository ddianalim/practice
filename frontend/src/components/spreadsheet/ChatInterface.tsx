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
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter instructions (e.g., 'List of top 100 companies in the world')"
            className="flex-1 px-4 py-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !prompt}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {isProcessing ? "..." : "Send"}
          </button>
        </form>
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
