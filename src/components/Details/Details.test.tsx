import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Details from "./Details";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/details/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Details component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Details called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <Details {...example.options}>{example?.options?.children}</Details>
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

      if (
        example?.options?.summaryChildren &&
        typeof example?.options?.summaryChildren === "string"
      ) {
        expect(
          screen.getByText(example?.options?.summaryChildren as string),
        ).toBeInTheDocument();
      }
    });
  });
});
