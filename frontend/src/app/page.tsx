import { Grid } from "@/components/spreadsheet/Grid";
import { ChatInterface } from "@/components/spreadsheet/ChatInterface";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Spreadsheet</h1>
        <ChatInterface />
        <Grid />
      </div>
    </div>
  );
}
