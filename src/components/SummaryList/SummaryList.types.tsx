import { Action } from "../ActionLink/ActionLink.types";

export interface Row {
  reactListKey?: string;
  key?: { className?: string; children: React.ReactNode };
  value?: { className?: string; children: React.ReactNode };
  actions?: { items: Action[]; className?: string };
  className?: string;
}

export interface SummaryListProps {
  className?: string;
  rows?: Row[];
  [key: string]: unknown;
}
