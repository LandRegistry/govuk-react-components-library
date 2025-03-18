import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import ErrorSummary from "./ErrorSummary";

import fixtures from "govuk-frontend/dist/govuk/components/error-summary/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { extractShownFixtures } from "../../utils/ProcessExampleData";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("ErrorSummary component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the error summary properly", () => {
    const errorText = "Please fix the errors below.";
    const errorLink = "Agree to the terms of service to log in";
    render(
      <ErrorSummary
        descriptionChildren={errorText}
        errorList={[
          {
            children: "Invalid username or password",
          },
          {
            children: "Agree to the terms of service to log in",
            href: "#example-error-1",
          },
        ]}
        titleChildren="There is a problem"
      />,
    );
    expect(screen.getByText(errorText)).toBeTruthy();
    expect(screen.getByText("Invalid username or password")).toBeTruthy();
    expect(screen.getByRole("link", { name: errorLink })).toBeTruthy();
  });

  test("should render the error summary properly with disableAutoFocus set", () => {
    const errorText = "Please fix the errors below.";
    const errorLink = "Agree to the terms of service to log in";
    render(
      <ErrorSummary
        descriptionChildren={errorText}
        errorList={[
          {
            children: "Invalid username or password",
          },
          {
            children: "Agree to the terms of service to log in",
            href: "#example-error-1",
          },
        ]}
        titleChildren="There is a problem"
        disableAutoFocus
      />,
    );
    expect(screen.getByText(errorText)).toBeTruthy();
    expect(screen.getByText("Invalid username or password")).toBeTruthy();
    expect(screen.getByRole("link", { name: errorLink })).toBeTruthy();
    const alertRoleMessage = screen.getByRole("alert");
    expect(alertRoleMessage).toBeTruthy();
    expect(
      alertRoleMessage.hasAttribute("data-disable-auto-focus"),
    ).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for ErrorSummary called "${example.name}"`, () => {
      render(<ErrorSummary {...example.options} />);
      if (example.options.titleChildren) {
        expect(
          screen.getByRole("heading", {
            level: 2,
          }),
        ).toBeTruthy();
        expect(screen.getByText(example.options.titleChildren)).toBeTruthy();
      }
      if (example.options.errorList) {
        example.options.errorList.forEach((error) => {
          expect(screen.getByText(error.children)).toBeTruthy();
        });
      }
      const alertRoleMessage = screen.getByRole("alert");
      expect(alertRoleMessage).toBeTruthy();
      if (example.options.disableAutoFocus) {
        expect(
          alertRoleMessage.hasAttribute("data-disable-auto-focus"),
        ).toBeTruthy();
      }
    });
  });
});
