import React from "react"
import { Cell } from "../../types"
import { useMatrix } from "./matrixContext.tsx";

export const MatrixRow = ({ row, rowIndex }: { row: Cell[], rowIndex: number }) => {

  const { updateCellAmount, highlightNearestCells } = useMatrix();

  const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);

  const handleCellClick = (colIndex: number) => {
    updateCellAmount(rowIndex, colIndex, 1);
  }

  const handleCellHover = (colIndex: number) => {
    highlightNearestCells(rowIndex, colIndex, 5);
  }

  return (
    <>
      <tr>
        <td className="cell mainRow"> M = {rowIndex + 1}</td>
        {
          row.map((cell, cellIndex) => (
            <td
              key={cell.id}
              onClick={() => handleCellClick(cellIndex)}
              onMouseEnter={() => handleCellHover(cellIndex)}
              className={`cell ${cell.isHighlighted && "isHighlighted"}`}
            >
              {cell.amount}
            </td>
          ))
        }
        <td className="cell">{rowSum}</td>
      </tr>
    </>
  )
}