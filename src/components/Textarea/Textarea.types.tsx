import { TextareaHTMLAttributes } from "react";
import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  "aria-describedby"?: string;
  errorMessage?: ErrorMessageProps;
  formGroup?: { className?: string; [key: string]: unknown };
  hint?: object;
  label?: object;
  id?: string;
}
