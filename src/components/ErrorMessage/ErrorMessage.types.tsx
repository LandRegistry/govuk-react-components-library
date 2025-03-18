import { HTMLAttributes } from "react";

export interface ErrorMessageProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
  visuallyHiddenText?: string;
}
