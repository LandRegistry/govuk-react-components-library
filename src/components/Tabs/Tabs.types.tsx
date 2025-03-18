import { HTMLAttributes } from "react";

export interface TabItem {
  id?: string;
  label: string;
  panel: HTMLAttributes<HTMLDivElement>;
  [key: string]: unknown;
}
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: string;
  idPrefix?: string;
  items: TabItem[];
  title?: string;
}
