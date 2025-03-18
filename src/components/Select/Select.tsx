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
    items,
    label,
    ...attributes
  } = props;

  let describedByValue: string = describedBy || "";
  let hintComponent: React.ReactNode;
  let errorMessageComponent: React.ReactNode;

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
      <Label {...label} htmlFor={id} />
      {hintComponent}
      {errorMessageComponent}
      <select
        className={`govuk-select ${className || ""}${
          errorMessage ? " govuk-select--error" : ""
        }`}
        id={id}
        aria-describedby={describedByValue || undefined}
        {...attributes}
      >
        {options}
      </select>
    </div>
  );
};

export default Select;
