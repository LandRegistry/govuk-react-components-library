import React from "react";
export interface WithRefProps {
  Component: React.ComponentType<unknown>; // Allow components with any props
  [key: string]: unknown;
}

export interface InfoSectionProps {
  refName: string;
  Component: React.ComponentType<unknown>; // Allow components with any props
  restProps: Record<string, unknown>;
}
