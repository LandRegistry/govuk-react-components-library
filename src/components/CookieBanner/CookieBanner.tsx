import React, { HTMLAttributes } from "react";
import {
  CookieBannerMessageAction,
  CookieBannerMessageItem,
  CookieBannerProps,
} from "./CookieBanner.types";
import { Button } from "../Button";
import { LinkWithRef } from "../LinkWithRef";

const CookieActions: React.FC<{
  actions: Array<CookieBannerMessageAction>;
}> = ({ actions }) => (
  <div className="govuk-button-group">
    {actions.map((action, index) => {
      const {
        className: actionClassName,
        children: actionChildren,
        ...actionProps
      } = action;

      return action.href || action.to ? (
        action.type === "button" || action.type === "submit" ? (
          <Button className={actionClassName} key={index} {...action} />
        ) : (
          <LinkWithRef
            key={index}
            {...actionProps}
            className={`govuk-link ${actionClassName || ""}`}
          >
            {actionChildren}
          </LinkWithRef>
        )
      ) : (
        <Button key={index} {...action} />
      );
    })}
  </div>
);

const CookieMessage: React.FC<CookieBannerMessageItem> = ({
  headingChildren,
  children,
  className,
  actions,
}) => (
  <div
    className={`govuk-cookie-banner__message govuk-width-container ${className || ""}`}
  >
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        {headingChildren && (
          <h2 className="govuk-cookie-banner__heading govuk-heading-m">
            {headingChildren}
          </h2>
        )}
        <div className="govuk-cookie-banner__content">
          {typeof children === "string" ? (
            <p className="govuk-body">{children}</p>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
    {actions && <CookieActions actions={actions} />}
  </div>
);

const CookieBanner: React.FC<
  CookieBannerProps & HTMLAttributes<HTMLDivElement>
> = ({
  className,
  messages,
  "aria-label": ariaLabel = "Cookie banner",
  ...attributes
}) => (
  <div
    className={`govuk-cookie-banner ${className || ""}`}
    data-nosnippet
    role="region"
    aria-label={ariaLabel}
    {...attributes}
  >
    {messages.map((message, index) => (
      <CookieMessage
        key={index}
        headingChildren={message.headingChildren}
        className={message.className}
        actions={message.actions}
        {...message}
      >
        {message.children}
      </CookieMessage>
    ))}
  </div>
);

export default CookieBanner;
