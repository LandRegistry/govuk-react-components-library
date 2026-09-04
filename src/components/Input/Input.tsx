/* eslint-disable react/prop-types */
import React, { Ref, JSX } from "react";
import Label from "../Label/Label";
import Hint from "../Hint/Hint";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { InputProps } from "./Input.types";

const defaultProps: Partial<InputProps> = {
  type: "text",
};

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = React.forwardRef((props = defaultProps, ref: Ref<HTMLInputElement>) => {
  const {
    className,
    "aria-describedby": describedBy,
    errorMessage,
    formGroup,
    hint,
    label,
    name,
    id,
    prefix,
    suffix,
    ...attributes
  } = props;

  // Mirrors govuk-frontend's Nunjucks macro, which defaults id to name when
  // id isn't given - without this the input has no id, so its <label for>
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

  const input: JSX.Element = (
    <input
      ref={ref}
      id={resolvedId}
      className={`govuk-input ${className || ""} ${errorMessage ? " govuk-input--error" : ""}`}
      name={name || resolvedId}
      aria-describedby={describedByValue || undefined}
      {...attributes}
    />
  );

  return (
    <div
      className={`govuk-form-group ${formGroup?.className || ""} ${errorMessage ? "govuk-form-group--error" : ""}`}
    >
      <Label {...label} htmlFor={resolvedId} />
      {hintComponent}
      {errorMessageComponent}
      {prefix || suffix ? (
        <div className="govuk-input__wrapper">
          {prefix ? (
            <div
              aria-hidden="true"
              {...{
                ...prefix,
                className: `govuk-input__prefix ${prefix.className ? prefix.className : ""}`,
              }}
            />
          ) : null}

          {input}

          {suffix ? (
            <div
              aria-hidden="true"
              {...{
                ...suffix,
                className: `govuk-input__suffix ${suffix.className ? suffix.className : ""}`,
              }}
            />
          ) : null}
        </div>
      ) : (
        input
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
