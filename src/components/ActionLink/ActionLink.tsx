import React from "react";
import { ActionLinkProps } from "./ActionLink.types";
import { LinkWithRef } from "../LinkWithRef";

const ActionLink: React.FC<ActionLinkProps> = (props) => {
  const { children, visuallyHiddenText, className, href, to, ...attributes } =
    props;

  const contents = (
    <>
      {children}
      {visuallyHiddenText && (
        <span className="govuk-visually-hidden">{visuallyHiddenText}</span>
      )}
    </>
  );

  return (
    <LinkWithRef
      className={`govuk-link ${className || ""}`}
      to={to}
      href={href}
      {...attributes}
    >
      {contents}
    </LinkWithRef>
  );
};

export default ActionLink;
