import React, { createContext, ReactNode, useContext, useState } from "react";
import { Cell } from "../../types";

type TMatrixContext = {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  updateCellAmount: (rowIndex: number, colIndex: number, amount: number) => void;
  highlightNearestCells: (rowIndex: number, colIndex: number, x: number) => void
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

  return (
    <MatrixContext.Provider value={{ matrix, setMatrix, updateCellAmount, highlightNearestCells }}>
      {children}
    </MatrixContext.Provider>
  )
}