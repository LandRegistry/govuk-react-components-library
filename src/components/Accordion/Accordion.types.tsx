import { ElementType, HTMLAttributes } from "react";

export interface AccordionItem {
  reactListKey?: string | number;
  expanded?: boolean;
  heading: {
    children: React.ReactNode;
  };
  summary?: {
    children: React.ReactNode;
  };
  content: {
    children: React.ReactNode;
  };
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  headingLevel?: ElementType;
  id?: string;
  items: AccordionItem[];
}
