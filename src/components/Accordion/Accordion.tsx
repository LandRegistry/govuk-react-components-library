import React from "react";
import { AccordionProps } from "./Accordion.types";
import { ExtractAccordionConfigFromAttributes } from "./Accordion.config";

const Accordion: React.FC<AccordionProps> = ({
  headingLevel: HeadingLevel = "h2",
  items,
  className,
  id,
  ...attributes
}) => {
  const remainingAttributes: { [key: string]: unknown } = { ...attributes };
  ExtractAccordionConfigFromAttributes(remainingAttributes);

  return (
    <div
      {...remainingAttributes}
      id={id}
      className={`govuk-accordion ${className || ""}`}
      data-module="govuk-accordion"
    >
      {items.filter(Boolean).map((item, index) => (
        <div
          key={item.reactListKey || index}
          className={`govuk-accordion__section ${
            item.expanded ? "govuk-accordion__section--expanded" : ""
          }`}
        >
          <div className="govuk-accordion__section-header">
            <HeadingLevel className="govuk-accordion__section-heading">
              <span
                className="govuk-accordion__section-button"
                id={`${id}-heading-${index + 1}`}
              >
                {item.heading.children}
              </span>
            </HeadingLevel>
            {item.summary && (
              <div
                className="govuk-accordion__section-summary govuk-body"
                id={`${id}-summary-${index + 1}`}
              >
                {item.summary.children}
              </div>
            )}
          </div>
          <div
            id={`${id}-content-${index + 1}`}
            className="govuk-accordion__section-content"
            aria-labelledby={`${id}-heading-${index + 1}`}
          >
            {item.content.children}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
