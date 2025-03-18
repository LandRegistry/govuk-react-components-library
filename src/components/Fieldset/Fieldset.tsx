import React from "react";
import { FieldsetProps } from "./Fieldset.types";

const Fieldset: React.FC<FieldsetProps> = (props) => {
  const { legend, className, children, ...attributes } = props;
  let legendComponent: React.ReactNode;

  if (legend && legend.children) {
    legendComponent = (
      <legend className={`govuk-fieldset__legend ${legend.className || ""}`}>
        {legend.isPageHeading ? (
          <h1 className="govuk-fieldset__heading">{legend.children}</h1>
        ) : (
          legend.children
        )}
      </legend>
    );
  }

  return (
    <fieldset className={`govuk-fieldset ${className || ""}`} {...attributes}>
      {legendComponent}
      {children}
    </fieldset>
  );
};

export default Fieldset;
