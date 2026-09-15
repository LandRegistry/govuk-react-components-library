import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { HintProps } from "../Hint/Hint.types";
import { LabelProps } from "../Label/Label.types";
import { FormGroupProps } from "../common.types";

export interface InputProps {
  className?: string;
  "aria-describedby"?: string;
  errorMessage?: ErrorMessageProps;
  formGroup?: FormGroupProps;
  hint?: HintProps;
  label?: LabelProps;
  name?: string;
  id?: string;
  type: string;
  // Spread directly onto the prefix/suffix wrapper <div> - real HTML div
  // attributes, not an arbitrary unknown blob.
  prefix?: React.HTMLAttributes<HTMLDivElement>;
  suffix?: React.HTMLAttributes<HTMLDivElement>;
}
