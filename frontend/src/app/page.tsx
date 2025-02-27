"use client";

import { Grid } from "@/components/spreadsheet/Grid";
import { ChatInterface } from "@/components/spreadsheet/ChatInterface";
import { SavedSpreadsheets } from "@/components/spreadsheet/SavedSpreadsheets";
import { Navbar } from "@/components/spreadsheet/Navbar";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Full Stack Practice</h1>
        <SavedSpreadsheets key={refreshKey} />
        <ChatInterface />
        <div className="mb-6 flex flex-col">
          <Navbar onSave={handleRefresh} />
          <Grid />
        </div>
      </div>
    </div>
  );
}
