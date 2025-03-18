import React from "react";
import { UsePagination, DOTS } from "./UsePagination";
import { PaginationProps } from "./Pagination.types";
import { NavigationButton } from "./NavigationButton";

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  previousName = "Previous",
  nextName = "Next",
  previousChildren,
  nextChildren,
}) => {
  const paginationRange = UsePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || paginationRange.length < 2) return null;

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <>
      <div className="govuk-!-padding-bottom-2"></div>
      <div className={`govuk-grid-column-full ${className || ""}`}>
        <nav
          className="govuk-pagination"
          role="navigation"
          aria-label="Pagination"
        >
          <div className="govuk-pagination__prev">
            <NavigationButton
              isDisabled={currentPage === 1}
              onClick={onPrevious}
              name={previousName}
              type="previous"
            >
              {previousChildren}
            </NavigationButton>
          </div>

          <ul className="govuk-pagination__list">
            {paginationRange.map((pageNumber, index) =>
              pageNumber === DOTS ? (
                <li
                  className="govuk-pagination__item govuk-pagination__item--ellipses"
                  key={index}
                >
                  {DOTS}
                </li>
              ) : (
                <li
                  className={`govuk-pagination__item ${pageNumber === currentPage ? "govuk-pagination__item--current" : ""}`}
                  key={index}
                >
                  <a
                    className="govuk-link govuk-pagination__link"
                    href="#"
                    aria-label={`Page ${pageNumber}`}
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
                    onClick={() => onPageChange(pageNumber as number)}
                  >
                    {pageNumber}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="govuk-pagination__next">
            <NavigationButton
              isDisabled={currentPage === lastPage}
              onClick={onNext}
              name={nextName}
              type="next"
            >
              {nextChildren}
            </NavigationButton>
          </div>
        </nav>
      </div>
      <div className="govuk-!-padding-bottom-4"></div>
    </>
  );
};

export default Pagination;
