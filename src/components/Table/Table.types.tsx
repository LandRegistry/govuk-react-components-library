import { HTMLAttributes } from "react";

export interface TableItem {
  className?: string;
  format?: string;
  children: React.ReactNode;
  reactListKey?: string | number;
  [key: string]: unknown;
}

export interface TableRow {
  cells: TableItem[];
  reactListKey?: string | number;
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  caption?: string;
  captionClassName?: string;
  firstCellIsHeader?: boolean;
  className?: string;
  head?: TableItem[];
  rows?: TableRow[];
  footer?: TableItem[];
}
