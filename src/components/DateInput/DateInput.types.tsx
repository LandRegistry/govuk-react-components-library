import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { FieldsetProps } from "../Fieldset/Fieldset.types";
import { HintProps } from "../Hint/Hint.types";

export interface DateInputItem {
  name: string;
  className?: string;
  type?: string;
  label?: string;
  reactListKey?: string | number;
  id?: string;
  pattern?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  [key: string]: unknown;
}

export interface DateInputProps {
  className?: string;
  errorMessage?: ErrorMessageProps;
  fieldset?: FieldsetProps;
  formGroup?: { className?: string; [key: string]: unknown };
  hint?: HintProps;
  id?: string;
  items?: Array<DateInputItem>;
  namePrefix?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}
