"use client";

import React, { useState } from "react";
import { useSpreadsheetStore } from "@/lib/store/spreadsheet-store";

export function ChatInterface() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // TODO: We'll implement the AI processing logic here
    console.log("Processing prompt:", prompt);

    setPrompt("");
    setIsProcessing(false);
  };

  return (
    <div className="mb-6 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter instructions for the spreadsheet (e.g., 'Create a monthly budget template')"
          className="flex-1 p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isProcessing || !prompt}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          {isProcessing ? "Processing..." : "Send"}
        </button>
      </form>
    </div>
  );
}
