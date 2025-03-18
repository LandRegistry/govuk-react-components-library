import React from "react";
import { HintProps } from "../Hint/Hint.types";

export interface TaskListItemProps {
  title: { children: React.ReactNode };
  hint: HintProps;
  status: {
    children?: React.ReactNode;
    tag?: { children: React.ReactNode };
  };
  href?: string;
  [key: string]: unknown;
}
export interface TaskListProps {
  className?: string;
  idPrefix?: string;
  items: TaskListItemProps[];
}
