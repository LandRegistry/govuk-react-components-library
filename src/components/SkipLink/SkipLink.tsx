import React from "react";
import { SkipLinkProps } from "./SkipLink.types";

const SkipLink: React.FC<
  SkipLinkProps & React.HTMLAttributes<HTMLOrSVGElement>
> = (props) => {
  const { href = "#content", className, children, ...attributes } = props;

  return (
    <a
      href={href}
      className={`govuk-skip-link ${className || ""}`}
      data-module="govuk-skip-link"
      {...attributes}
    >
      {children}
    </a>
  );
};

export default SkipLink;
