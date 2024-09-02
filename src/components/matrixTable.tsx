import React from "react"
import { useMatrix } from "./matrixContext.tsx";
import { MatrixRow } from "./matrixRow.tsx";
export const MatrixTable = () => {

  const { matrix } = useMatrix();

  const calculateAverageColumnsValues = (colIndex: number) => {
    const column = matrix.map(row => row[colIndex].amount);
    const sum = column.reduce((acc, value) => acc + value, 0);
    const average = sum / column.length;
    return average;
  };

  const calculateMedian = (colIndex: number) => {
    const avarage = calculateAverageColumnsValues(colIndex);
    const halfavarage = Math.floor(avarage / 2);
    return halfavarage;
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {matrix[0]?.map((_, indexColumn) => (
            <th key={indexColumn}> Cell values N ={indexColumn + 1}</th>
          ))}
          {matrix.length > 0 && <th>Sum values</th>}
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <MatrixRow key={rowIndex} row={row} rowIndex={rowIndex} />
        ))}
        {matrix.length > 0 && (
          <tr>
            <td>Average values</td>
            {matrix[0]?.map((_, colIndex) => (
              <td key={colIndex}>{calculateAverageColumnsValues(colIndex)}</td>
            ))}
          </tr>
        )}
        <tr>
          <td>50th Percentile</td>
          {matrix[0]?.map((_, colIndex) => (
            <td key={colIndex}>{calculateMedian(colIndex)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}