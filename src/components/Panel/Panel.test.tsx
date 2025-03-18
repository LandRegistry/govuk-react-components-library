import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";

import Panel from "./Panel";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/panel/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Panel component", () => {
  afterEach(() => {
    cleanup();
  });
  test("should render basic Pagination properly", async () => {
    const titleChildren = "Application complete";
    const message = "Your reference number: HDJ2123F";
    render(<Panel titleChildren={titleChildren}>{message}</Panel>);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(titleChildren)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("Changes and displays Header Level if specified", async () => {
    const titleChildren = "Application complete";
    const message = "Your reference number: HDJ2123F";
    render(
      <Panel headingLevel="h3" titleChildren={titleChildren}>
        {message}
      </Panel>,
    );

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByText(titleChildren)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Panel called "${example.name}"`, () => {
      let level;
      if (example.options.headingLevel) {
        level = example.options.headingLevel;
        example.options.headingLevel = `h${example.options.headingLevel}`;
      }

      render(<Panel {...example.options} />);
      expect(
        screen.getByRole("heading", {
          level: level || 1,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(example.options.children)).toBeInTheDocument();
    });
  });
});
