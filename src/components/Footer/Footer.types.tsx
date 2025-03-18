import { HTMLAttributes } from "react";
import { To } from "react-router-dom";

export interface NavigationItem {
  columns: string | number;
  title: string;
  items?: Array<{
    className?: string;
    children: React.ReactNode;
    href?: string;
    to?: To;
    reactListKey?: string | number;
    [key: string]: unknown;
  }>;
  width?: string;
  reactListKey?: string | number;
}

export interface MetaItem {
  className?: string;
  children: React.ReactNode;
  reactListKey?: string | number;
  [key: string]: unknown;
}

export interface Meta {
  visuallyHiddenTitle?: string;
  items?: MetaItem[];
  children?: React.ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  containerClassName?: string;
  meta?: Meta;
  navigation?: NavigationItem[];
}
