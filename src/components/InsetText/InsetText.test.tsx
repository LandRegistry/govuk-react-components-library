import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import InsetText from "./InsetText";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/inset-text/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("InsetText component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for InsetText called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <InsetText {...example.options}>
            {example?.options?.children}
          </InsetText>
        </MemoryRouter>,
      );

      if (
        example?.options?.children &&
        typeof example?.options?.children === "string"
      ) {
        expect(
          screen.getByText(example?.options?.children as string),
        ).toBeInTheDocument();
      }
    });
  });
});
