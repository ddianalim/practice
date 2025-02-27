import { Grid } from "@/components/spreadsheet/Grid";
import { ChatInterface } from "@/components/spreadsheet/ChatInterface";

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Practice</h1>
      <ChatInterface />
      <Grid />
    </div>
  );
}
