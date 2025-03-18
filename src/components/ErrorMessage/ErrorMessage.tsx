import React, { JSX } from "react";
import { ErrorMessageProps } from "./ErrorMessage.types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className,
  children,
  visuallyHiddenText = "Error",
  ...attributes
}) => {
  let visuallyHiddenTextComponent: JSX.Element | null = null;
  if (visuallyHiddenText) {
    visuallyHiddenTextComponent = (
      <span className="govuk-visually-hidden">{visuallyHiddenText}: </span>
    );
  }

  return (
    <p className={`govuk-error-message ${className || ""}`} {...attributes}>
      {visuallyHiddenTextComponent}
      {children}
    </p>
  );
};

export default ErrorMessage;
