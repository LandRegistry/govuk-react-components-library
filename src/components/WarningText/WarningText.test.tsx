import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import WarningText from "./WarningText";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/warning-text/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";
import { renderToString } from "react-dom/server";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

function checkHtmlAndString(objectToCheck: unknown) {
  if (objectToCheck) {
    if (typeof objectToCheck === "string") {
      expect(screen.getAllByText(objectToCheck).length).toBeGreaterThanOrEqual(
        1,
      );
    } else {
      objectToCheck.forEach((childItem) => {
        const stringHeading = renderToString(childItem);
        const strippedHtml = stringHeading.replace(/<[^>]+>/g, "").trim();
        expect(screen.getByText(strippedHtml)).toBeInTheDocument();
      });
    }
  }
}

describe("WarningText component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for WarningText called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <WarningText {...example.options} />
        </MemoryRouter>,
      );

      if (example.options?.children) {
        checkHtmlAndString(example.options.children);
      }
    });
  });
});
