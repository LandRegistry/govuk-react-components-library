import React, { HTMLAttributes } from "react";
import { DetailsProps } from "./Details.types";

const Details: React.FC<DetailsProps & HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  summaryChildren,
  ...attributes
}) => {
  return (
    <details
      className={`govuk-details ${className || ""}`}
      {...attributes}
      data-module="govuk-details"
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summaryChildren}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
};

export default Details;
