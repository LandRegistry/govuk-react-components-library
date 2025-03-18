import React from "react";
import { Link } from "react-router-dom";
import { LandingProps } from "./Landing.types";
import { Main } from "../Main";

const Landing: React.FC<LandingProps> = (props) => {
  const { to = "/" } = props;
  return (
    <Main>
      <div className="govuk-grid-row">
        <div className="govuk-hint govuk-grid-column-full">
          <div className="centered-wheel">
            <h2 className="govuk-heading-m">
              <Link to={to}>Single sign on</Link>
            </h2>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Landing;
