import { To } from "react-router-dom";

export interface BackLinkProps {
  to?: To;
  state?: object | null;
  children?: React.ReactNode;
  href?: string;
  className?: string;
  [key: string]: unknown;
}
