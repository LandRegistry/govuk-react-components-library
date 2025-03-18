import React from "react";
import { LabelProps } from "./Label.types";

const Label: React.FC<LabelProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  className = "",
  htmlFor,
  children,
  isPageHeading,
  ...attributes
}) => {
  if (!children) return null;

  const label = (
    <label
      className={`govuk-label ${className}`}
      htmlFor={htmlFor}
      {...attributes}
    >
      {children}
    </label>
  );

  return isPageHeading ? (
    <h1 className="govuk-label-wrapper">{label}</h1>
  ) : (
    label
  );
};

export default Label;
