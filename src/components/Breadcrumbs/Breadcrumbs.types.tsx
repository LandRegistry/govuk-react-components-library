import { HTMLAttributes } from "react";

export interface BreadcrumbItem {
  href?: string;
  to?: string;
  reactListKey?: string | number;
  children: React.ReactNode;
  [key: string]: unknown;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  items?: BreadcrumbItem[];
  className?: string;
  collapseOnMobile?: boolean;
}
