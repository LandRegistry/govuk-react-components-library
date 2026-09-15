import { HTMLAttributes } from "react";
import { To } from "react-router";

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
  // Header.tsx only ever uses this as `!removeGovUKHeader` - a real boolean,
  // not the loose `unknown` this had before. Known consumers currently pass
  // the string "yes" (a leftover Nunjucks-param-style convention), which
  // still works at runtime since it's truthy, but should migrate to `true`.
  removeGovUKHeader?: boolean;
  assetsPath?: string;
}
