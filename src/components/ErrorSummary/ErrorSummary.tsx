import React, { ReactNode } from "react";
import { ErrorSummaryProps } from "./ErrorSummary.types";

const ErrorSummary: React.FC<ErrorSummaryProps> = (props) => {
  const {
    className,
    descriptionChildren,
    errorList,
    titleChildren = "There is a problem",
    disableAutoFocus,
    ...attributes
  } = props;

  let description: ReactNode;
  if (descriptionChildren) {
    description = <p>{descriptionChildren}</p>;
  }

  return (
    <div
      className={`govuk-error-summary ${className || ""}`}
      aria-labelledby="error-summary-title"
      role="alert"
      data-disable-auto-focus={disableAutoFocus ? "true" : null}
      {...attributes}
      data-module="govuk-error-summary"
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        {titleChildren}
      </h2>
      <div className="govuk-error-summary__body">
        {description}
        <ul className="govuk-list govuk-error-summary__list">
          {errorList
            ? errorList.map((error, index) => {
                const { reactListKey, children, href, ...errorAttributes } =
                  error;

                return (
                  <li key={reactListKey || index}>
                    {href ? (
                      <a {...errorAttributes} href={href}>
                        {children}
                      </a>
                    ) : (
                      <>{children}</>
                    )}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

ErrorSummary.displayName = "ErrorSummary";
export default ErrorSummary;
