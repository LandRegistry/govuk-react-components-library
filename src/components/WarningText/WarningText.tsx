import React, { HTMLAttributes } from "react";
import { WarningTextProps } from "./WarningText.types";

const WarningText: React.FC<
  WarningTextProps & HTMLAttributes<HTMLDivElement>
> = ({ children = "Warning message", className, ...attributes }) => {
  return (
    <div className={`govuk-warning-text ${className || ""}`} {...attributes}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">Warning</span>
        {children}
      </strong>
    </div>
  );
};

export default WarningText;
