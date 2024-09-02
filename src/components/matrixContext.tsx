import React, { createContext, ReactNode, useContext, useState } from "react";
import { Cell } from "../../types";

type TMatrixContext = {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
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

  return (
    <MatrixContext.Provider value={{ matrix, setMatrix }}>
      {children}
    </MatrixContext.Provider>
  )
}