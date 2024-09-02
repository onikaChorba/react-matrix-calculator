import React from "react"
import { useMatrix } from "./matrixContext.tsx";
import { MatrixRow } from "./matrixRow.tsx";
export const MatrixTable = () => {

  const { matrix } = useMatrix();

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {matrix[0]?.map((_, indexColumn) => (
            <th key={indexColumn}> Cell values N ={indexColumn + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <MatrixRow key={rowIndex} row={row} rowIndex={rowIndex} />
        ))}
      </tbody>
    </table>
  )
}