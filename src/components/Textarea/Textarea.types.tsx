import { TextareaHTMLAttributes } from "react";
import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { HintProps } from "../Hint/Hint.types";
import { LabelProps } from "../Label/Label.types";
import { FormGroupProps } from "../common.types";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  "aria-describedby"?: string;
  errorMessage?: ErrorMessageProps;
  formGroup?: FormGroupProps;
  hint?: HintProps;
  label?: LabelProps;
  id?: string;
}
