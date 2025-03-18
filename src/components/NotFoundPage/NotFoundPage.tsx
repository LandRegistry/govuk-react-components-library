import React from "react";
import { Main } from "../Main";

const NotFoundPage: React.FC = () => {
  return (
    <Main>
      <div>
        <h1 className="govuk-heading-xl">Page not found</h1>
        <p className="govuk-body">
          If you typed the web address, check it is correct.
        </p>
        <p className="govuk-body">
          If you pasted the web address, check you copied the entire address.
        </p>
      </div>
    </Main>
  );
};

export default NotFoundPage;
