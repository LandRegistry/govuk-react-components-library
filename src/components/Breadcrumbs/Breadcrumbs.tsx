import React from "react";
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import { LinkWithRef } from "../LinkWithRef";

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { items, className, collapseOnMobile, ...attributes } = props;
  const breadcrumbs = items
    ? items.map((item, index) => {
        const { href, to, reactListKey, children, ...itemAttributes } = item;

        return href || to ? (
          <li
            key={reactListKey || index}
            className="govuk-breadcrumbs__list-item"
          >
            <LinkWithRef
              href={href}
              to={to}
              className="govuk-breadcrumbs__link"
              {...itemAttributes}
            >
              {children}
            </LinkWithRef>
          </li>
        ) : (
          <li
            key={reactListKey || index}
            className="govuk-breadcrumbs__list-item"
            aria-current="page"
          >
            {children}
          </li>
        );
      })
    : null;

  return (
    <div
      className={`govuk-breadcrumbs ${className || ""} ${
        collapseOnMobile ? "govuk-breadcrumbs--collapse-on-mobile" : ""
      }`}
      {...attributes}
    >
      <ol className="govuk-breadcrumbs__list">{breadcrumbs}</ol>
    </div>
  );
};

export default Breadcrumbs;
