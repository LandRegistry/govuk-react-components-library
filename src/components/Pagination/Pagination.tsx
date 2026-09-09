import React from "react";
import { PaginationProps } from "./Pagination.types";
import { NavigationButton } from "./NavigationButton";
import { DOTS } from "./UsePagination";

const Pagination: React.FC<PaginationProps> = ({
  previous,
  next,
  items,
  className,
}) => {
  if (!previous && !next && (!items || items.length === 0)) return null;

  // Block layout is used when there are no numbered page items — govuk renders
  // the nav with an extra class and the link title with --decorated modifier.
  const isBlockLayout = !items || items.length === 0;

  return (
    <nav
      className={`govuk-pagination${isBlockLayout ? " govuk-pagination--block" : ""}${className ? ` ${className}` : ""}`}
      role="navigation"
      aria-label="Pagination"
    >
      {previous && (
        <div className="govuk-pagination__prev">
          <NavigationButton type="previous" {...previous} />
        </div>
      )}

      {items && items.length > 0 && (
        <ul className="govuk-pagination__list">
          {items.map((item, index) =>
            item.ellipsis ? (
              <li
                key={index}
                className="govuk-pagination__item govuk-pagination__item--ellipsis"
              >
                {DOTS}
              </li>
            ) : (
              <li
                key={index}
                className={`govuk-pagination__item${item.current ? " govuk-pagination__item--current" : ""}`}
              >
                <a
                  className="govuk-link govuk-pagination__link"
                  href={item.href ?? "#"}
                  aria-label={`Page ${item.number}`}
                  {...(item.current ? { "aria-current": "page" } : {})}
                >
                  {item.number}
                </a>
              </li>
            ),
          )}
        </ul>
      )}

      {next && (
        <div className="govuk-pagination__next">
          <NavigationButton type="next" {...next} />
        </div>
      )}
    </nav>
  );
};

export default Pagination;
