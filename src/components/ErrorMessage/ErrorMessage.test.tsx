import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";

import ErrorMessage from "./ErrorMessage";

import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/error-message/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("ErrorMessage component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the error message without Visually hidden text specified", () => {
    const errorText = "Error message about full name goes here 1";
    render(<ErrorMessage>{errorText}</ErrorMessage>);
    expect(screen.getByText(errorText)).toBeTruthy();
  });

  test("should render the error message with Visually hidden text specified", () => {
    const errorText = "Error message about full name goes here 2";
    render(
      <ErrorMessage visuallyHiddenText="Hidden Error">
        {errorText}
      </ErrorMessage>,
    );
    expect(screen.getByText("Hidden Error:")).toBeTruthy();
    expect(screen.getByText(errorText)).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example: ComponentFixture) => {
    test(`Test Fixture for ErrorMessage called "${example.name}"`, () => {
      render(<ErrorMessage {...example.options} />);
      if (example.options.visuallyHiddenText) {
        expect(
          screen.getByText(`${example.options.visuallyHiddenText}:`),
        ).toBeTruthy();
      }
      if (typeof example.options.children === "string") {
        expect(screen.getByText(example.options.children)).toBeTruthy();
      }
    });
  });
});
