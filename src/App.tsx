import React, { useState } from "react";
import { MatrixProvider } from "./components/matrixContext.tsx";
import { MatrixTable } from "./components/matrixTable.tsx";
import { MatrixGenerator } from "./components/matrixGenerator.tsx";

export const App = () => {

  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);

  return (
    <MatrixProvider>
      <h1>Matrix Generator</h1>
      <div>
        <label>
          Rows (M):
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            min={0}
            max={100} />
        </label>
        <label>
          Columns (N):
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            min={0}
            max={100} />
        </label>
      </div>
      <MatrixGenerator rows={rows} columns={columns} />
      <MatrixTable />
    </MatrixProvider>
  )
}
