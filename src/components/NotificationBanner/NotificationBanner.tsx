import React from "react";
import { NotificationBannerProps } from "./NotificationBanner.types";

const NotificationBanner: React.FC<NotificationBannerProps> = (props) => {
  const {
    type,
    titleChildren,
    titleHeadingLevel: HeadingLevel = "h2",
    children,
    className,
    titleId = "govuk-notification-banner-title",
    role,
    disableAutoFocus,
    ...attributes
  } = props;

  let successBanner: boolean = false;

  if (type === "success") {
    successBanner = true;
  }

  let typeClass: string = "";
  if (successBanner) {
    typeClass = `govuk-notification-banner--${type}`;
  }

  let roleAttribute: string = "region";
  if (role) {
    roleAttribute = role;
  } else if (successBanner) {
    roleAttribute = "alert";
  }

  const title: string =
    titleChildren || (successBanner ? "Success" : "Important");

  return (
    <div
      className={`govuk-notification-banner ${typeClass} ${className || ""}`}
      role={roleAttribute}
      aria-labelledby={titleId}
      data-module="govuk-notification-banner"
      {...(disableAutoFocus ? { "data-disable-auto-focus": "true" } : {})}
      {...attributes}
    >
      <div className="govuk-notification-banner__header">
        <HeadingLevel className="govuk-notification-banner__title" id={titleId}>
          {title}
        </HeadingLevel>
      </div>
      <div className="govuk-notification-banner__content">
        {typeof children === "string" ? (
          <p className="govuk-notification-banner__heading">{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default NotificationBanner;
