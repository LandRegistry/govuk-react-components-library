import React from "react";
import { HintProps } from "./Hint.types";

const Hint: React.FC<HintProps & React.HTMLAttributes<HTMLOrSVGElement>> = (
  props,
) => {
  const { className, children, ...attributes } = props;
  return (
    <div className={`govuk-hint ${className || ""}`} {...attributes}>
      {children}
    </div>
  );
};

export default Hint;
