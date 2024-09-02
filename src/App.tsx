import React, { useState } from "react";
import './App.scss';
import { MatrixProvider } from "./components/matrixContext.tsx";
import { MatrixTable } from "./components/matrixTable.tsx";
import { MatrixGenerator } from "./components/matrixGenerator.tsx";

export const App = () => {

  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);

  return (
    <MatrixProvider>
      <div className="container">
        <h1>Matrix Generator</h1>
        <div className="inputsBlock">
          <label className="label">
            Rows (M):
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              min={0}
              max={100}
              className="inputField" />
          </label>
          <label className="label">
            Columns (N):
            <input
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              min={0}
              max={100}
              className="inputField" />
          </label>
        </div>
        <MatrixGenerator rows={rows} columns={columns} />
        <MatrixTable />
      </div>
    </MatrixProvider>
  )
}
