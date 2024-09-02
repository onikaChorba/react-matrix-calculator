import React from "react"
import { Cell } from "../../types"
export const MatrixRow = ({ row, rowIndex }: { row: Cell[], rowIndex: number }) => {
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
      </tr>
    </>
  )
}