import { HTMLAttributes } from "react";

export interface ErrorSummaryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  descriptionChildren?: React.ReactNode;
  errorList?: Array<{
    reactListKey?: string | number;
    children: React.ReactNode;
    href?: string;
    [key: string]: unknown;
  }>;
  titleChildren?: React.ReactNode;
  disableAutoFocus?: boolean;
}
