import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Radios from "./Radios";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/radios/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const hint: { children: string } = {
  children:
    "This includes changing your last name or spelling your name differently.",
};
const items: Array<{ children: string; value: string }> = [
  {
    children: "Yes",
    value: "yes",
  },
  {
    children: "No",
    value: "no",
  },
];

describe("Radios component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Radios properly", async () => {
    render(
      <Radios
        hint={{
          children:
            "This includes changing your last name or spelling your name differently.",
        }}
        items={[
          {
            children: "Yes",
            value: "yes",
          },
          {
            children: "No",
            value: "no",
          },
        ]}
        name="example-default"
        value="no"
        onChange={(event) => {
          console.log(event);
        }}
      />,
    );
    expect(
      screen.getByText(
        "This includes changing your last name or spelling your name differently.",
      ),
    ).toBeTruthy();
    const noRadio: HTMLElement = screen.getByRole("radio", { name: "No" });
    expect(noRadio).toBeChecked();
    const yesRadio: HTMLElement = screen.getByRole("radio", { name: "Yes" });
    expect(yesRadio).not.toBeChecked();
  });

  test("should render basic Radios properly", async () => {
    const legendary: string = "Have you changed your name?";
    render(
      <Radios
        className="govuk-radios--inline"
        fieldset={{
          legend: {
            children: legendary,
            className: "govuk-fieldset__legend--l",
            isPageHeading: true,
          },
        }}
        errorMessage={{
          children: "Please select an option",
        }}
        hint={hint}
        items={items}
        name="example-default"
        value="no"
        idPrefix="example-id-prefix"
        onChange={(event) => {
          console.log(event);
        }}
      />,
    );

    const fieldset: HTMLElement = screen.getByRole("group", {
      name: legendary,
    });
    expect(fieldset).toBeTruthy();

    const heading: HTMLElement = screen.getByRole("heading", {
      name: legendary,
      level: 1,
    });
    expect(heading).toBeTruthy();

    const noRadio: HTMLElement = screen.getByRole("radio", { name: "No" });
    expect(noRadio).toBeChecked();
    const yesRadio: HTMLElement = screen.getByRole("radio", { name: "Yes" });
    expect(yesRadio).not.toBeChecked();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Radios called "${example.name}"`, () => {
      render(
        <Radios
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
            screen.getByRole("radio", { name: item.children }),
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
