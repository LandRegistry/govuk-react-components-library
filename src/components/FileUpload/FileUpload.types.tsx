import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { HintProps } from "../Hint/Hint.types";
import { LabelProps } from "../Label/Label.types";
import { FormGroupProps } from "../common.types";

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: ErrorMessageProps;
  formGroup?: FormGroupProps;
  hint?: HintProps;
  label?: LabelProps;
  "aria-describedby"?: string;
  id?: string;
}
