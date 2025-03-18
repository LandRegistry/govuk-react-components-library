import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { FieldsetProps } from "../Fieldset/Fieldset.types";
import { HintProps } from "../Hint/Hint.types";
import { LabelProps } from "../Label/Label.types";

export interface BooleanItem {
  id?: string;
  children?: React.ReactNode;
  hint?: HintProps;
  conditional?: { children: React.ReactNode };
  behaviour?: string;
  label?: LabelProps;
  reactListKey?: string | number;
  divider?: string;
  name?: string;
  checked?: boolean;
  value?: string;
  defaultChecked?: boolean;
  [key: string]: unknown;
}

export interface BooleanProps {
  className?: string;
  errorMessage?: ErrorMessageProps;
  fieldset?: FieldsetProps;
  formGroup?: { className?: string; [key: string]: unknown };
  hint?: HintProps;
  idPrefix?: string;
  items?: BooleanItem[];
  controlType: "radios" | "checkboxes";
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  "aria-describedby"?: string;
  [key: string]: unknown;
}
