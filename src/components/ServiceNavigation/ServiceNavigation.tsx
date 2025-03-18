import React, { HTMLAttributes } from "react";
import { ServiceNavigationProps } from "./ServiceNavigation.types";
import { LinkWithRef } from "../LinkWithRef";

const ServiceNavigation: React.FC<
  ServiceNavigationProps & HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    className,
    containerClassName = "govuk-width-container",
    menuButtonLabel = "Show or hide menu",
    navigation,
    navigationClassName,
    navigationLabel = "Menu",
    serviceName,
    serviceUrlHref,
    serviceUrlTo,
    ...attributes
  } = props;

  return (
    <section
      aria-label="Service information"
      className={`govuk-service-navigation ${className || ""}`}
      data-module="govuk-service-navigation"
      {...attributes}
    >
      <div className={`govuk-width-container ${containerClassName}`}>
        <div className="govuk-service-navigation__container">
          {serviceName ? (
            <span className="govuk-service-navigation__service-name">
              <LinkWithRef
                href={serviceUrlHref}
                to={serviceUrlTo}
                className="govuk-header__link govuk-header__link--service-name"
              >
                {serviceName}
              </LinkWithRef>
            </span>
          ) : null}
          {navigation ? (
            <nav
              aria-label={navigationLabel}
              className={`govuk-service-navigation__wrapper ${
                navigationClassName || ""
              }`}
            >
              <button
                type="button"
                className="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
                aria-controls="navigation"
                aria-label={menuButtonLabel}
                hidden
              >
                Menu
              </button>
              <ul className="govuk-service-navigation__list" id="navigation">
                {navigation.map((item, index) => {
                  const {
                    active: itemActive,
                    className: itemClassName,
                    children: itemChildren,
                    reactListKey,
                    ...itemAttributes
                  } = item;

                  return itemChildren ? (
                    <li
                      key={reactListKey || index}
                      className={`govuk-service-navigation__item${
                        itemActive
                          ? " govuk-service-navigation__item--active"
                          : ""
                      }`}
                    >
                      {item.href || item.to ? (
                        <LinkWithRef
                          className={`govuk-service-navigation__link ${
                            itemClassName || ""
                          }`}
                          aria-current={itemActive ? "true" : "false"}
                          {...itemAttributes}
                        >
                          {itemActive ? (
                            <strong className="govuk-service-navigation__active-fallback">
                              {itemChildren}
                            </strong>
                          ) : (
                            itemChildren
                          )}
                        </LinkWithRef>
                      ) : (
                        itemChildren
                      )}
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ServiceNavigation;
