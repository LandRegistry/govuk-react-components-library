import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Select from "./Select";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/select/fixtures.json";
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

describe("Select component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Select called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <Select
            id={example.options.id}
            label={example.options.label}
            {...example.options}
          />
        </MemoryRouter>,
      );

      if (example?.options?.label) {
        expect(
          screen.getByText(example?.options?.label.children as string),
        ).toBeInTheDocument();
      }

      if (example?.options?.hint) {
        expect(
          screen.getByText(example?.options?.hint.children as string),
        ).toBeInTheDocument();
      }

      if (example?.options?.errorMessage) {
        expect(
          screen.getByText(example?.options?.errorMessage.children as string),
        ).toBeInTheDocument();
      }
    });
  });
});
