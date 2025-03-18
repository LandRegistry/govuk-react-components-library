import { To } from "react-router-dom";

export interface ActionLinkProps {
  children?: React.ReactNode;
  visuallyHiddenText?: string;
  className?: string;
  href?: string;
  to?: To;
  [key: string]: unknown;
}

export interface Action {
  reactListKey?: string;
  [key: string]: unknown;
}
