import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import SkipLink from "./SkipLink";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/skip-link/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("SkipLink component", () => {
  afterEach(() => {
    cleanup();
  });
  test("should render basic SkipLink properly", () => {
    render(
      <SkipLink
        className=":focus"
        href="#content"
        title="Just a SkipLink component"
      >
        Skip to main content
      </SkipLink>,
    );
    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeTruthy();

    expect(skipLink.hasAttribute("title")).toBeTruthy();
    expect(skipLink.getAttribute("title")).toEqual("Just a SkipLink component");
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for SkipLink called "${example.name}"`, () => {
      render(<SkipLink {...example.options} />);
      const skipLink = screen.getByText(example.options.children);
      expect(skipLink).toBeTruthy();
      if (example.options.href) {
        expect(skipLink.getAttribute("href")).toContain(example.options.href);
      }
    });
  });
});
