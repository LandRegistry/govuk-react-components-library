import React from "react";
import { DataNavigationProps } from "./DataNavigation.types";
import { Button } from "../Button";
import { Label } from "../Label";

const DataNavigation: React.FC<DataNavigationProps> = ({
  dataId,
  setDataFocus,
  previousText = "Previous",
  previousCondition,
  nextText = "Next",
  nextCondition,
  dataDescription,
}) => {
  // Helper to render the navigation buttons
  const renderNavButton = (
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
      {/* Previous Button */}
      <div className="govuk-grid-column-one-third govuk-!-text-align-left">
        {renderNavButton(
          "previous-data",
          () => setDataFocus(dataId - 1),
          previousCondition,
          <>
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
            &nbsp;{previousText}
          </>,
        )}
      </div>

      {/* Data Description Label */}
      <div className="govuk-grid-column-one-third govuk-!-text-align-centre">
        <Label>{dataDescription}</Label>
      </div>

      {/* Next Button */}
      <div className="govuk-grid-column-one-third govuk-!-text-align-right">
        {renderNavButton(
          "next-data",
          () => setDataFocus(dataId + 1),
          nextCondition,
          <>
            {nextText}
            <svg
              className="govuk-button__start-icon"
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
  );
};

export default DataNavigation;
