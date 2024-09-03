import React, { useEffect } from "react"
import { useMatrix } from "./matrixContext.tsx";
import { MatrixRow } from "./matrixRow.tsx";
export const MatrixTable = ({ setRows }: { setRows: React.Dispatch<React.SetStateAction<number>> }) => {

  const { matrix, addRow } = useMatrix();

  useEffect(() => {
    setRows(matrix.length);
  }, [matrix.length, setRows]);

  const calculateAverageColumnsValues = (colIndex: number) => {
    const column = matrix.map(row => row[colIndex].amount);
    const sum = column.reduce((acc, value) => acc + value, 0);
    const average = sum / column.length;
    return parseFloat(average.toFixed(1));
  };

  const calculateMedian = (colIndex: number) => {
    const avarage = calculateAverageColumnsValues(colIndex);
    const halfavarage = Math.floor(avarage / 2);
    return halfavarage;
  };

  return (
    <div>
      {matrix.length > 0 && <button className="addRowButton" onClick={addRow}>Add Row</button>}
      {
        matrix.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th className="cell mainColumn">Cell values</th>
              {matrix[0]?.map((_, indexColumn) => (
                <th key={indexColumn} className="cell mainColumn">
                  N ={indexColumn + 1}
                </th>
              ))}
              <th className="cell mainColumn" colSpan={2}>Sum values</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <MatrixRow key={rowIndex} row={row} rowIndex={rowIndex} />
            ))}
            <tr>
              <td className="cell mainRow">Average values</td>
              {matrix[0]?.map((_, colIndex) => (
                <td key={colIndex} className="cell">{calculateAverageColumnsValues(colIndex)}</td>
              ))}
            </tr>
            <tr>
              <td className="cell mainRow">50th Percentile</td>
              {matrix[0]?.map((_, colIndex) => (
                <td key={colIndex} className="cell">{calculateMedian(colIndex)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      }

    </div>
  )
}