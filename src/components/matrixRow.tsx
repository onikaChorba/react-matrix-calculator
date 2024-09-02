import React from "react"
import { Cell } from "../../types"
import { useMatrix } from "./matrixContext.tsx";
export const MatrixRow = ({ row, rowIndex }: { row: Cell[], rowIndex: number }) => {

  const { updateCellAmount } = useMatrix();

  const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);

  const handleCellClick = (colIndex: number) => {
    updateCellAmount(rowIndex, colIndex, 1);
  }

  return (
    <>
      <tr>
        <td>Cell values M = {rowIndex + 1}</td>
        {
          row.map((cell, cellIndex) => (
            <td key={cellIndex} onClick={() => handleCellClick(cellIndex)}>
              {cell.amount}
            </td>
          ))
        }
        <td>{rowSum}</td>
      </tr>
    </>
  )
}