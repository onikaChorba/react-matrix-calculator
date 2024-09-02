import React from "react"
import { Cell } from "../../types"
export const MatrixRow = ({ row, rowIndex }: { row: Cell[], rowIndex: number }) => {

  const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);

  return (
    <>
      <tr>
        <td>Cell values M = {rowIndex + 1}</td>
        {
          row.map((cell, cellIndex) => (
            <td key={cellIndex}>
              {cell.amount}
            </td>
          ))
        }
        <td>{rowSum}</td>
      </tr>
    </>
  )
}