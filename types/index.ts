export type CellId = number;
export type CellValue = number;

export type Cell = {
  id: CellId;
  amount: CellValue;
  isHighlighted?: boolean;
  isPercentage?: boolean;
  percentage?: number;
};
