import { ElementType, HTMLAttributes } from "react";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  headingLevel?: ElementType;
  className?: string;
  titleChildren: React.ReactNode;
  children?: React.ReactNode;
}
