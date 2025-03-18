import React from "react";
import { PanelProps } from "./Panel.types";

const Panel: React.FC<PanelProps> = (props) => {
  const {
    headingLevel: HeadingLevel = "h1",
    children,
    className,
    titleChildren,
    ...attributes
  } = props;

  const innerHtml = children ? (
    <div className="govuk-panel__body">{children}</div>
  ) : null;

  return (
    <div
      className={`govuk-panel govuk-panel--confirmation ${className || ""}`}
      {...attributes}
    >
      <HeadingLevel className="govuk-panel__title">
        {titleChildren}
      </HeadingLevel>
      {innerHtml}
    </div>
  );
};

export default Panel;
