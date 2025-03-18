import React, { JSX } from "react";
import { TextareaProps } from "./Textarea.types";
import Hint from "../Hint/Hint";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Label from "../Label/Label";

const defaultProps: Partial<TextareaProps> = {
  "aria-describedby": "",
  rows: 5,
  id: "",
  name: "",
};

const Textarea: React.FC<TextareaProps> = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props: TextareaProps = defaultProps, ref) => {
  const {
    className,
    "aria-describedby": describedBy,
    errorMessage,
    formGroup,
    hint,
    label,
    id,
    ...attributes
  } = props;

  let describedByValue: string = describedBy || "";
  let hintComponent: JSX.Element | null = null;
  let errorMessageComponent: JSX.Element | null = null;

  if (hint) {
    const hintId: string = `${id}-hint`;
    describedByValue += ` ${hintId}`;
    hintComponent = <Hint {...hint} id={hintId} />;
  }

  if (errorMessage) {
    const errorId: string = id ? `${id}-error` : "";
    describedByValue += ` ${errorId}`;
    errorMessageComponent = <ErrorMessage {...errorMessage} id={errorId} />;
  }

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      <Label {...label} htmlFor={id} />
      {hintComponent}
      {errorMessageComponent}
      <textarea
        {...attributes}
        id={id}
        ref={ref}
        className={`govuk-textarea${
          errorMessage ? " govuk-textarea--error" : ""
        } ${className || ""}`}
        aria-describedby={describedByValue?.trim() || undefined}
      />
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
