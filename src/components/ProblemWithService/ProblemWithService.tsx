import React from "react";
import { useLocation } from "react-router-dom";
import { ProblemWithServiceProps } from "./ProblemWithService.types";
import { Main } from "../Main";
import { LinkWithRef } from "../LinkWithRef";

const ProblemWithService: React.FC<ProblemWithServiceProps> = ({
  message = "",
  applicationName = "Document and plan retrieval system",
  applicationRoute = "/",
  reportingLink = "http://marval-live/MSMselfservice/AutoGen.aspx?page=1268",
  basePageName = "dashboard",
}) => {
  const { state } = useLocation();
  const determineMessage = state?.message || message;
  const determineApplicationName = state?.applicationName || applicationName;

  const refreshPage = (): void => {
    if (window.location.pathname === "/") window.location.reload();
  };

  const hasMessage = (): boolean => Boolean(determineMessage?.trim());

  return (
    <Main>
      <h1 className="govuk-heading-xl">
        Sorry, there is a problem with the service
      </h1>
      {hasMessage() && (
        <div
          className="govuk-error-summary"
          aria-labelledby="error-summary-title"
          role="alert"
          tabIndex={-1}
          data-module="govuk-error-summary"
        >
          <div className="govuk-error-summary__body">
            <p>{determineMessage}</p>
          </div>
        </div>
      )}
      <p className="govuk-body">Try again later.</p>
      <p className="govuk-body">
        You can go back to{" "}
        <LinkWithRef
          className="govuk-link"
          to={applicationRoute}
          onClick={refreshPage}
        >
          {determineApplicationName}
        </LinkWithRef>{" "}
        {basePageName}.
      </p>
      <p className="govuk-body">
        If the problem continues&nbsp;
        <a
          href={reportingLink}
          className="govuk-link"
          target="_blank"
          rel="noreferrer"
        >
          contact support
          <span className="nav-panel__text opens-in-new-window" />
          <span className="visually-hidden">
            (Opens in a new window or tab)
          </span>
        </a>
        .
      </p>
    </Main>
  );
};

export default ProblemWithService;
