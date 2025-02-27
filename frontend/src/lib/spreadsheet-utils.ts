export function populateTableData(headers: string[], rows: string[][]) {
  const cells: Record<string, any> = {};
  
  // Populate headers (Row 1)
  headers.forEach((header, index) => {
    const col = String.fromCharCode(65 + index); // A, B, C, etc.
    cells[`${col}1`] = {
      value: header,
      isHeader: true,
      formula: null,
      isComputing: false
    };
  });

  // Populate data rows
  rows.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const col = String.fromCharCode(65 + colIndex);
      cells[`${col}${rowIndex + 2}`] = {
        value,
        formula: null,
        isComputing: false
      };
    });
  });

  return cells;
} 