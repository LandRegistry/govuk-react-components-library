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

  const input: JSX.Element = (
    <input
      ref={ref}
      id={id}
      className={`govuk-input ${className || ""} ${errorMessage ? " govuk-input--error" : ""}`}
      name={name || id}
      aria-describedby={describedByValue || undefined}
      {...attributes}
    />
  );

  return (
    <div
      className={`govuk-form-group ${formGroup?.className || ""} ${errorMessage ? "govuk-form-group--error" : ""}`}
    >
      <Label {...label} htmlFor={id} />
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
