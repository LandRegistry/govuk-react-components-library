import { HTMLAttributes } from "react";
import { To } from "react-router-dom";

export interface NavigationItem {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  to?: To;
  reactListKey?: string | number;
  [key: string]: unknown;
}

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  containerClassName?: string;
  homepageUrlHref?: string;
  homepageUrlTo?: To;
  navigation?: NavigationItem[];
  navigationClassName?: string;
  productName?: React.ReactNode;
  serviceName?: string;
  serviceUrlHref?: string;
  serviceUrlTo?: To;
  navigationLabel?: string;
  menuButtonLabel?: string;
  logo?: string;
  removeGovUKHeader?: unknown;
  assetsPath?: string;
}
