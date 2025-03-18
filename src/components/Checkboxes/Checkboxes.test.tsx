import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Checkboxes from "./Checkboxes";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/checkboxes/fixtures.json";
import { ComponentFixture } from "../../dynamics";

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
describe("Checkboxes component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Checkboxes called "${example.name}"`, () => {
      render(
        <Checkboxes
          {...example.options}
          onChange={(event) => {
            console.log(event);
          }}
        />,
      );
      if (example.options.fieldset) {
        const legendary: string = example.options.fieldset.legend.children;
        const fieldset: HTMLElement = screen.getByRole("group", {
          name: legendary,
        });
        expect(fieldset).toBeTruthy();
        if (example.options.fieldset.legend.isPageHeading) {
          const heading: HTMLElement = screen.getByRole("heading", {
            name: legendary,
            level: 1,
          });
          expect(heading).toBeTruthy();
        }
      }

      example.options.items.forEach((item: { children: string }) => {
        if (typeof item.children === "string") {
          expect(
            screen.getByRole("checkbox", { name: item.children }),
          ).toBeTruthy();
        }
      });

      if (example.options.errorMessage) {
        expect(
          screen.getByText(example.options.errorMessage.children),
        ).toBeTruthy();
      }

      if (example.options.hint) {
        expect(screen.getByText(example.options.hint.children)).toBeTruthy();
      }
    });
  });
});
