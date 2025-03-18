import React from "react";
import { TagProps } from "./Tag.types";

const Tag: React.FC<TagProps & React.HTMLAttributes<HTMLOrSVGElement>> = (
  props,
) => {
  const { children, className, ...attributes } = props;

  return (
    <strong className={`govuk-tag ${className || ""}`} {...attributes}>
      {children}
    </strong>
  );
};
export default Tag;
