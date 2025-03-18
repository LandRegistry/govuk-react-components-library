import React, { HTMLAttributes } from "react";
import { InsetTextProps } from "./InsetText.types";

const InsetText: React.FC<InsetTextProps & HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...attributes
}) => {
  return (
    <div className={`govuk-inset-text ${className || ""}`} {...attributes}>
      {children}
    </div>
  );
};

export default InsetText;
