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

export interface ServiceNavigationProps {
  className?: string;
  containerClassName?: string;
  menuButtonLabel?: string;
  navigation?: NavigationItem[];
  navigationClassName?: string;
  navigationLabel?: string;
  serviceName?: string;
  serviceUrlHref?: string;
  serviceUrlTo?: To;
}
