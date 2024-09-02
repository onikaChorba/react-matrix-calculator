import React, { createContext, ReactNode, useContext, useState } from "react";
import { Cell } from "../../types";

type TMatrixContext = {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  updateCellAmount: (rowIndex: number, colIndex: number, amount: number) => void;
  highlightNearestCells: (rowIndex: number, colIndex: number, x: number) => void;
  displayRowPercentages: (rowIndex: number) => void;
  hideRowPercentages: (rowIndex: number) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
}

const MatrixContext = createContext<TMatrixContext | undefined>(undefined);

export const useMatrix = () => {

  const context = useContext(MatrixContext);

  if (!context) {
    throw new Error('useMatrix must be used within a MatrixProvider')
  }
  return context;
}

export const MatrixProvider = ({ children }: { children: ReactNode }) => {

  const [matrix, setMatrix] = useState<Cell[][]>([]);

  const updateCellAmount = (rowIndex: number, colIndex: number, amount: number) => {
    setMatrix(prevMatrix => {
      const newMatrix = [...prevMatrix];
      const cell = newMatrix[rowIndex][colIndex];
      newMatrix[rowIndex][colIndex] = { ...cell, amount: cell.amount + amount };
      return newMatrix;
    });
  }

  const highlightNearestCells = (rowIndex: number, colIndex: number, x: number) => {
    setMatrix(prevMatrix => {
      const flatCells = prevMatrix.flat();
      const targetAmount = prevMatrix[rowIndex][colIndex].amount;
      const sortedCells = flatCells
        .map(cell => ({ ...cell, giff: Math.abs(cell.amount - targetAmount) }))
        .sort((a, b) => a.giff - b.giff)
        .slice(0, x);

      const newMatrix = prevMatrix.map(row =>
        row.map(cell => ({
          ...cell,
          isHighlighted: sortedCells.some(sc => sc.id === cell.id)
        }))
      )
      return newMatrix;
    });
  }

  const displayRowPercentages = (rowIndex: number) => {
    setMatrix(prevMatrix => {
      const rowSum = prevMatrix[rowIndex].reduce((sum, cell) => sum + cell.amount, 0);
      const newMatrix = prevMatrix.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map(cell => ({
            ...cell,
            isPercentage: true,
            percentage: (cell.amount / rowSum) * 100,
          }))
          : row
      );
      return newMatrix;
    });
  }

  const hideRowPercentages = (rowIndex: number) => {
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map(cell => ({
            ...cell,
            isPercentage: false,
            percentage: undefined,
          }))
          : row
      );
      return newMatrix;
    });
  };

  const addRow = () => {
    setMatrix(prevMatrix => {
      const newRow = Array.from({ length: prevMatrix[0]?.length || 0 }, (_, colIndex) => ({
        id: prevMatrix.flat().length + colIndex,
        amount: Math.floor(Math.random() * 101),
      }));
      return [...prevMatrix, newRow];
    });
  };

  const removeRow = (rowIndex: number) => {
    setMatrix(prevMatrix => prevMatrix.filter((_, rIndex) => rIndex !== rowIndex));
  };

  return (
    <MatrixContext.Provider value={{ matrix, setMatrix, updateCellAmount, highlightNearestCells, displayRowPercentages, hideRowPercentages, addRow, removeRow }}>
      {children}
    </MatrixContext.Provider>
  )
}