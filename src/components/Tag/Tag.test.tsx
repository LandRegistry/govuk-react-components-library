import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Tag from "./Tag";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/tag/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Tag component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Tag properly", () => {
    const tagName = "alpha";
    render(<Tag>{tagName}</Tag>);

    expect(screen.getByText(tagName)).toBeInTheDocument();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Tag called "${example.name}"`, () => {
      render(<Tag {...example.options} />);
      expect(screen.getByText(example.options.children)).toBeInTheDocument();
    });
  });
});
