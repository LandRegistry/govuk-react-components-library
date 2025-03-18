import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Fieldset from "./Fieldset";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/fieldset/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Fieldset component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the FieldSet properly if page heading is identified", () => {
    const fieldSetMessage = "What is your address?";
    render(
      <Fieldset
        legend={{
          children: fieldSetMessage,
          className: "govuk-fieldset__legend--xl",
          isPageHeading: true,
        }}
      />,
    );

    const legendComponent = screen.getByRole("group");
    expect(legendComponent).toBeTruthy();
    expect(screen.getByText(fieldSetMessage)).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });

  test("should render the FieldSet properly if page heading is not identified", () => {
    const fieldSetMessage = "What is your address?";
    render(
      <Fieldset
        legend={{
          children: "What is your address?",
        }}
      />,
    );

    const legendComponent = screen.getByRole("group");
    expect(legendComponent).toBeTruthy();
    expect(screen.getByText(fieldSetMessage)).toBeTruthy();
    expect(screen.queryByRole("heading", { level: 1 })).toBeFalsy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Fieldset called "${example.name}"`, () => {
      render(<Fieldset {...example.options} />);
      const legendComponent = screen.getByRole("group");
      expect(legendComponent).toBeTruthy();
      expect(screen.getByText(example.options.legend.children)).toBeTruthy();
      if (example.options.legend.isPageHeading) {
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
      }
    });
  });
});
