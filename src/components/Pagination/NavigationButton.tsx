import React from "react";
import { NavigationButtonProps } from "./Pagination.types";
import { SvgIcon } from "./SvgIcon";

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  isDisabled,
  onClick,
  children,
  name,
  type,
}) => {
  const typeClass = type === "next" ? type : "prev";
  const Icon = (
    <SvgIcon
      type={type}
      className={`govuk-pagination__icon govuk-pagination__icon--${typeClass}`}
      focusable="false"
    />
  );

  return isDisabled ? (
    <div rel={type}>
      {type === "previous" && Icon}
      <span className="govuk-pagination__link-title">{name}</span>
      {type === "next" && Icon}
      {children && (
        <>
          {type === "previous" && <>&nbsp;</>}
          <span className="govuk-visually-hidden">:</span>
          {children}
          {type === "next" && <> &nbsp;</>}
        </>
      )}
    </div>
  ) : (
    <a
      className="govuk-link govuk-pagination__link"
      href="#"
      rel={type}
      onClick={onClick}
    >
      {type === "previous" && Icon}
      <span className="govuk-pagination__link-title">{name}</span>
      {type === "next" && Icon}
      {children && (
        <>
          {type === "previous" && <>&nbsp;&nbsp;</>}
          <span className="govuk-visually-hidden">:</span>
          {children}
          {type === "next" && <>&nbsp;&nbsp;</>}
        </>
      )}
    </a>
  );
};
