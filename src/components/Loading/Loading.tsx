import React from "react";
import "./Loading.scss";
import { LoadingProps } from "./Loading.types";

const Loading: React.FC<LoadingProps> = ({ message = null, html = null }) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        {message || html ? (
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full head-space">
              {html ? (
                html
              ) : (
                <h2 className="govuk-heading-m govuk-!-text-align-centre">
                  {message}
                </h2>
              )}
            </div>
          </div>
        ) : null}
        <div className="govuk-hint govuk-grid-column-full">
          <div
            className="centered-wheel"
            data-testid="centered-wheel-identifier"
          >
            <div
              className="loading-wheel-2"
              data-testid="loading-wheel-2-identifier"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
