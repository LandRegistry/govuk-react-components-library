import React from "react";

export interface CookieBannerMessageAction {
  className?: string;
  href?: string;
  to?: string;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  [key: string]: unknown;
}
export interface CookieBannerMessageItem {
  headingChildren?: React.ReactNode;
  children?: React.ReactNode;
  "aria-label"?: string;
  actions?: CookieBannerMessageAction[];
  className?: string;
  [key: string]: unknown;
}
export interface CookieBannerProps {
  className?: string;
  messages: CookieBannerMessageItem[];
}
