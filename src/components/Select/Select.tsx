import React, { SelectHTMLAttributes } from "react";
import { SelectProps } from "./Select.types";
import { ErrorMessage } from "../ErrorMessage";
import { Hint } from "../Hint";
import { Label } from "../Label";

const Select: React.FC<
  SelectProps & SelectHTMLAttributes<HTMLSelectElement>
> = (props) => {
  const {
    className,
    "aria-describedby": describedBy,
    errorMessage,
    formGroup,
    hint,
    id,
    name,
    items,
    label,
    ...attributes
  } = props;

  // Mirrors govuk-frontend's Nunjucks macro, which defaults id to name when
  // id isn't given - without this the select has no id, so its <label for>
  // (and hint/error aria-describedby) can never associate with it.
  const resolvedId: string | undefined = id || name;

  let describedByValue: string = describedBy || "";
  let hintComponent: React.ReactNode;
  let errorMessageComponent: React.ReactNode;

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

  const options: React.ReactNode = items
    ? items
        .filter((item) => item)
        .map((option, index) => {
          const { reactListKey, children, ...optionAttributes } = option;
          return (
            <option {...optionAttributes} key={reactListKey || index}>
              {children}
            </option>
          );
        })
    : null;

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      <Label {...label} htmlFor={resolvedId} />
      {hintComponent}
      {errorMessageComponent}
      <select
        className={`govuk-select ${className || ""}${
          errorMessage ? " govuk-select--error" : ""
        }`}
        id={resolvedId}
        name={name}
        aria-describedby={describedByValue || undefined}
        {...attributes}
      >
        {options}
      </select>
    </div>
  );
};

export default Select;
