import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Hint from "./Hint";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/hint/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Hint component", () => {
  afterEach(() => {
    cleanup();
  });
  test("should render basic Hint properly", () => {
    render(<Hint>Anything...</Hint>);
    expect(screen.queryByText("Anything...")).toBeTruthy();
    expect(screen.getByText("Anything...")).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Hint called "${example.name}"`, () => {
      render(<Hint {...example.options} />);
      if (example.options.children) {
        expect(screen.queryByText(example.options.children)).toBeDefined();
      }
    });
  });
});
