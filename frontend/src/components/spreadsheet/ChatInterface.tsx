"use client";

import React, { useState } from "react";
import { useSpreadsheetStore } from "@/lib/store/spreadsheet-store";

export function ChatInterface() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log("Processing prompt:", prompt);
    setPrompt("");
    setIsProcessing(false);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm">
      <div className="p-4 border border-gray-200 rounded-lg">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter instructions (e.g., 'Create a monthly budget template')"
            className="flex-1 px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isProcessing || !prompt}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? "Processing..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
