import { BooleanItem } from "../Boolean/Boolean.types";

export interface RadiosProps {
  value?: string;
  defaultValue?: string;
  items?: BooleanItem[];
  [key: string]: unknown;
}
