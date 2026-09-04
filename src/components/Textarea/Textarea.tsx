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
    name,
    ...attributes
  } = props;

  // Mirrors govuk-frontend's Nunjucks macro, which defaults id to name when
  // id isn't given - without this the textarea has no id, so its <label for>
  // (and hint/error aria-describedby) can never associate with it.
  const resolvedId: string | undefined = id || name;

  let describedByValue: string = describedBy || "";
  let hintComponent: JSX.Element | null = null;
  let errorMessageComponent: JSX.Element | null = null;

  if (hint) {
    const hintId: string = `${resolvedId}-hint`;
    describedByValue += ` ${hintId}`;
    hintComponent = <Hint {...hint} id={hintId} />;
  }

  if (errorMessage) {
    const errorId: string = resolvedId ? `${resolvedId}-error` : "";
    describedByValue += ` ${errorId}`;
    errorMessageComponent = <ErrorMessage {...errorMessage} id={errorId} />;
  }

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      <Label {...label} htmlFor={resolvedId} />
      {hintComponent}
      {errorMessageComponent}
      <textarea
        name={name}
        {...attributes}
        id={resolvedId}
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
