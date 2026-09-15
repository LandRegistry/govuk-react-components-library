import { ErrorMessageProps } from "../ErrorMessage/ErrorMessage.types";
import { HintProps } from "../Hint/Hint.types";
import { LabelProps } from "../Label/Label.types";
import { FormGroupProps } from "../common.types";

export interface PasswordInputProps {
  /** Additional CSS classes for the `<input>` element. Maps from fixture `classes` → className */
  className?: string;
  /** Pre-existing aria-describedby value to prepend */
  "aria-describedby"?: string;
  errorMessage?: ErrorMessageProps;
  /** Wrapper div options */
  formGroup?: FormGroupProps;
  hint?: HintProps;
  label?: LabelProps;
  /** Input name attribute */
  name?: string;
  /** Input id attribute — also used to link label and aria-describedby */
  id?: string;
  /** autocomplete attribute — defaults to "current-password" */
  autoComplete?: string;
  /** i18n: label for the show-password button (default: "Show") */
  showPasswordText?: string;
  /** i18n: label for the hide-password button (default: "Hide") */
  hidePasswordText?: string;
  /** i18n: aria-label for the show-password button */
  showPasswordAriaLabelText?: string;
  /** i18n: aria-label for the hide-password button */
  hidePasswordAriaLabelText?: string;
  /** i18n: text announced when the password becomes visible */
  passwordShownAnnouncementText?: string;
  /** i18n: text announced when the password is hidden */
  passwordHiddenAnnouncementText?: string;
  /** Allow pass-through of any other HTML input attributes */
  [key: string]: unknown;
}
