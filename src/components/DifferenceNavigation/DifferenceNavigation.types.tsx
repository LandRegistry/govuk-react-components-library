export interface DifferenceNavigationProps {
  differenceId: number;
  setDifferenceFocus: (id: number) => void;
  totalDifferences: number;
  keyword?: string;
  plural?: string;
}
