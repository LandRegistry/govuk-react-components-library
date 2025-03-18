import React from "react";
import { useLocation } from "react-router-dom";
import { WarningInfoProps } from "./WarningInfo.types";
import { Main } from "../Main";
import { LinkWithRef } from "../LinkWithRef";

const WarningInfo: React.FC<WarningInfoProps> = ({
  messageHeading = "Warning or Info Heading",
  message = "Warning or Info Heading message",
  advice = "Try again later.",
  applicationName = "Document and plan retrieval system",
  applicationRoute = "/",
  basePageName = "dashboard",
}) => {
  let determineMessage: string;
  const { state } = useLocation();

  if (state && state.message) {
    determineMessage = state.message;
  } else {
    determineMessage = message;
  }

  let determineMessageHeading: string;
  if (state && state.messageHeading) {
    determineMessageHeading = state.messageHeading;
  } else {
    determineMessageHeading = messageHeading;
  }

  let determineAdvice: string;
  if (state && state.advice) {
    determineAdvice = state.advice;
  } else {
    determineAdvice = advice;
  }

  let determineApplicationName: string;
  if (state && state.applicationName) {
    determineApplicationName = state.applicationName;
  } else {
    determineApplicationName = applicationName;
  }

  const refreshPage = (): void => {
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const hasMessage = (): boolean => {
    return determineMessage?.length > 0;
  };

  return (
    <Main>
      <>
        <h1 className="govuk-heading-xl">{determineMessageHeading}</h1>
        {hasMessage() && (
          <div className="govuk-warning-text">
            <span className="govuk-warning-text__icon" aria-hidden="true">
              !
            </span>
            <strong className="govuk-warning-text__text">
              <span className="govuk-visually-hidden">Warning</span>
              {determineMessage}
            </strong>
          </div>
        )}
        <p className="govuk-body">{determineAdvice}</p>
        <p className="govuk-body">
          You can go back to{" "}
          <LinkWithRef
            className="govuk-link"
            to={applicationRoute}
            onClick={() => refreshPage()}
          >
            {determineApplicationName}
          </LinkWithRef>{" "}
          {basePageName}.
        </p>
      </>
    </Main>
  );
};

export default WarningInfo;
