import React from "react"
import { Cell } from "../../types"
import { useMatrix } from "./matrixContext.tsx";

export const MatrixRow = ({ row, rowIndex }: { row: Cell[], rowIndex: number }) => {

  const { updateCellAmount, highlightNearestCells, displayRowPercentages, hideRowPercentages, removeRow } = useMatrix();

  const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);

  const handleCellClick = (colIndex: number) => {
    updateCellAmount(rowIndex, colIndex, 1);
  }

  const handleCellHover = (colIndex: number) => {
    highlightNearestCells(rowIndex, colIndex, 5);
  }

  const handleSumHover = () => {
    displayRowPercentages(rowIndex);
  };

  const handleRemoveRow = () => {
    removeRow(rowIndex);
  };


  return (
    <tr className="cells">
      <td className="cell mainRow"> M = {rowIndex + 1}</td>
      {
        row.map((cell, cellIndex) => (
          <td
            key={cell.id}
            onClick={() => handleCellClick(cellIndex)}
            onMouseEnter={() => handleCellHover(cellIndex)}
            className={`cell ${cell.isHighlighted && "isHighlighted"} ${cell.isPercentage && "isPercentage"}`}
          >
            {cell.isPercentage ? `${cell.percentage!.toFixed(2)}%` : cell.amount}
          </td>
        ))
      }
      <td className="cell" onMouseEnter={handleSumHover}
        onMouseLeave={() => hideRowPercentages(rowIndex)}>{rowSum}</td>
      <td >
        <button className="deleteButton" onClick={handleRemoveRow}>x</button>
      </td>
    </tr>
  )
}