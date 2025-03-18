import { ElementType } from "react";

export interface NotificationBannerProps {
  type: "success" | "error" | "info" | "warning";
  titleChildren?: string;
  titleHeadingLevel?: ElementType;
  children: React.ReactNode;
  className?: string;
  titleId?: string;
  role?: string;
  disableAutoFocus?: boolean;
  [key: string]: unknown;
}
