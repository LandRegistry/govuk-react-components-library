export interface DataNavigationProps {
  dataId: number;
  setDataFocus: (id: number) => void;
  previousText: string;
  previousCondition: boolean;
  nextText: string;
  nextCondition: boolean;
  dataDescription?: string;
}
