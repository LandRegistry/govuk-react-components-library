import React, { AnchorHTMLAttributes } from "react";
import { To } from "react-router-dom";

export interface LinkWithRefProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to?: To;
  href?: string;
  forwardedRef?: React.Ref<HTMLAnchorElement>;
  [key: string]: unknown;
}
