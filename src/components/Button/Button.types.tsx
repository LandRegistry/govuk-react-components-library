import { To } from "react-router-dom";

export interface ButtonProps {
  element?: string;
  href?: string;
  to?: To;
  isStartButton?: boolean;
  disabled?: boolean;
  className?: string;
  preventDoubleClick?: boolean;
  name?: string;
  type?: string;
  children?: React.ReactNode;
}
