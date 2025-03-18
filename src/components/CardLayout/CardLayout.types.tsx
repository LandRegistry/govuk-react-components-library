import { CardColumnProps } from "../CardColumn/CardColumn.types";

export interface CardLayoutProps {
  cardColumns: Array<CardColumnProps>;
  numberOfGridColumns?: number;
}
