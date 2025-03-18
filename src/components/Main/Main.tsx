import React from "react";
import { MainProps } from "./Main.types";
import BackLink from "../BackLink/BackLink";

const Main: React.FC<MainProps> = ({
  children,
  backLink = "",
  backLinkState = null,
}) => (
  <div className="govuk-width-container">
    <main
      className="govuk-main-wrapper"
      id="main-content"
      data-testid="main-content"
    >
      {backLink && (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <BackLink to={{ pathname: backLink }} state={backLinkState} />
          </div>
        </div>
      )}
      {children && <div>{children}</div>}
    </main>
  </div>
);

export default Main;
