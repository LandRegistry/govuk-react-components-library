import React from "react";
import { BackLinkProps } from "./BackLink.types";
import { LinkWithRef } from "../LinkWithRef";

const BackLink: React.FC<BackLinkProps> = (props) => {
  const { to, state, children = "Back", className, ...attributes } = props;
  return (
    <LinkWithRef
      className={`govuk-back-link back-link-style-override ${className || ""}`}
      to={to}
      state={state}
      {...attributes}
    >
      {children}
    </LinkWithRef>
  );
};

export default BackLink;
