import { useEffect } from "react";
import { useMatrix } from "./matrixContext.tsx"

const generateRandomValue = (): number => Math.floor(Math.random() * 101);

const generateMatrix = (rows: number, columns: number) => {

  let idCounter = 0;

  const matrix = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({
      id: idCounter++,
      amount: generateRandomValue(),
    }))
  );
  return matrix;
}
export const MatrixGenerator = ({ rows, columns }: { rows: number, columns: number }) => {

  const { setMatrix } = useMatrix();
  useEffect(() => {
    const newMatrix = generateMatrix(rows, columns);
    setMatrix(newMatrix);
  }, [rows, columns, setMatrix])

  return null
}