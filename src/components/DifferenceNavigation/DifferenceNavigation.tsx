import React from "react";
import { DifferenceNavigationProps } from "./DifferenceNavigation.types";
import { Button } from "../Button";
import { titleCase } from "../../utils/TitleCase";
import { Label } from "../Label";

const DifferenceNavigation: React.FC<DifferenceNavigationProps> = ({
  differenceId,
  setDifferenceFocus,
  totalDifferences,
  keyword = "variation",
  plural = "variations",
}) => {
  if (totalDifferences === 0) {
    return (
      <p className="govuk-body govuk-!-font-size-20 govuk-!-text-align-centre">
        No {`${plural}`} found
      </p>
    );
  }

  const isPreviousDisabled = differenceId <= 1;
  const isNextDisabled = differenceId === totalDifferences;

  const renderButton = (
    id: string,
    onClick: () => void,
    disabled: boolean,
    content: React.ReactNode,
  ) => (
    <Button id={id} onClick={onClick} data-testid={id} disabled={disabled}>
      {content}
    </Button>
  );

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-third">
        <div className="govuk-!-text-align-left">
          {renderButton(
            `previous-${keyword}`,
            () => setDifferenceFocus(differenceId - 1),
            isPreviousDisabled,
            <>
              {" "}
              <svg
                className="govuk-button__start-icon back-button"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                transform="rotate(180)"
              >
                <path
                  fill="currentColor"
                  d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"
                />
              </svg>
              &nbsp;Previous{" "}
            </>,
          )}
        </div>
      </div>
      <div className="govuk-grid-column-one-third">
        <Label className="govuk-!-text-align-centre">
          {titleCase(keyword)} {differenceId} of {totalDifferences}
        </Label>
      </div>

      <div className="govuk-grid-column-one-third">
        <div className="govuk-!-text-align-right">
          {renderButton(
            `next-${keyword}`,
            () => setDifferenceFocus(differenceId + 1),
            isNextDisabled,
            <>
              {" "}
              Next
              <svg
                className="govuk-button__start-icon back-button"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"
                />
              </svg>
            </>,
          )}
        </div>
      </div>
    </div>
  );
};

export default DifferenceNavigation;
