import React from "react";
import { Link } from "react-router-dom";
import { LinkWithRefProps } from "./LinkWithRef.types";

const LinkWithRef: React.FC<LinkWithRefProps> = ({
  children,
  to,
  href,
  forwardedRef = null,
  ...attributes
}) => {
  if (to) {
    return (
      <Link ref={forwardedRef} to={to} {...attributes}>
        {children}
      </Link>
    );
  }
  return (
    <a ref={forwardedRef} href={href || "#"} {...attributes}>
      {children}
    </a>
  );
};

export default LinkWithRef;
