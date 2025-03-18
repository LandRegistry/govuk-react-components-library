import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, JSX } from "react";
import { LinkWithRef } from "../LinkWithRef";
import { ButtonProps } from "./Button.types";

const Button: React.FC<
  ButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  const {
    element,
    href,
    to,
    isStartButton,
    disabled,
    className,
    preventDoubleClick,
    name,
    type,
    children,
    ...attributes
  } = props;

  let el: string = "";
  let buttonAttributes: { [key: string]: unknown } = {
    name,
    type,
    ...attributes,
    "data-module": "govuk-button",
  };
  let buttonElement: JSX.Element | null = null;

  if (element) {
    el = element;
  } else if (href || to) {
    el = "a";
  } else {
    el = "button";
  }

  let iconHtml: JSX.Element | undefined;
  if (isStartButton) {
    iconHtml = (
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    );
  }

  const commonAttributes = {
    className: `govuk-button ${className || ""}${disabled ? " govuk-button--disabled" : ""} ${isStartButton ? "govuk-button--start" : ""}`,
    // ref: buttonRef,
  };

  if (preventDoubleClick) {
    buttonAttributes["data-prevent-double-click"] = preventDoubleClick;
  }

  if (disabled) {
    buttonAttributes = {
      ...buttonAttributes,
      "aria-disabled": "true",
      disabled: true,
    };
  }

  if (el === "a") {
    const linkAttributes: { [key: string]: unknown } = {
      ...commonAttributes,
      role: "button",
      draggable: "false",
      ...attributes,
      "data-module": "govuk-button",
      href,
      to,
    };

    buttonElement = (
      <LinkWithRef {...linkAttributes}>
        {children}
        {iconHtml}
      </LinkWithRef>
    );
  } else if (el === "button") {
    buttonElement = (
      <button {...buttonAttributes} {...commonAttributes}>
        {children}
        {iconHtml}
      </button>
    );
  } else if (el === "input") {
    if (!type) {
      buttonAttributes.type = "submit";
    }
    buttonElement = (
      <input
        value={children as string}
        {...buttonAttributes}
        {...commonAttributes}
      />
    );
  }

  return buttonElement;
};

Button.displayName = "Button";

export default Button;
