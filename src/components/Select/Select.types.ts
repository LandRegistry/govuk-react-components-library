import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { HintProps } from "../Hint/Hint.types";
import { LabelProps } from "../Label/Label.types";
import { FormGroupProps } from "../common.types";

export interface Option {
  reactListKey?: string | number;
  children: React.ReactNode;
  [key: string]: unknown;
}

export interface SelectProps {
  className?: string;
  "aria-describedby"?: string;
  errorMessage?: ErrorMessageProps;
  formGroup?: FormGroupProps;
  hint?: HintProps;
  id?: string;
  items?: Option[];
  label: LabelProps;
}
