import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import PhaseBanner from "./PhaseBanner";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/phase-banner/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("PhaseBanner component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for PhaseBanner called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <PhaseBanner {...example.options}>
            {example?.options?.children}
          </PhaseBanner>
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
