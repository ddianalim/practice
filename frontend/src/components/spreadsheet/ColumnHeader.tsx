export function ColumnHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-8 bg-gray-100 border-b-2 border-gray-300 font-bold text-sm text-gray-900">
      {label}
    </div>
  );
} 