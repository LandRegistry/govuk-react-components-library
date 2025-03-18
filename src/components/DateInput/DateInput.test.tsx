import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import DateInput from "./DateInput";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { titleCase } from "../../utils/TitleCase";
import fixtures from "govuk-frontend/dist/govuk/components/date-input/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("DateInput component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render Day, Month and Year properly", () => {
    render(<DateInput id="dob" className="date-of-birth" />);

    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
  });

  test("should render more of Day, Month and Year properly with error message, hint and fieldset", () => {
    render(
      <DateInput
        errorMessage={{
          children: "Error message goes here",
        }}
        fieldset={{
          legend: {
            children: "What is your date of birth?",
          },
        }}
        hint={{
          children: "For example, 31 3 1980",
        }}
        id="dob-errors"
        items={[
          {
            className: "govuk-input--width-2 govuk-input--error",
            name: "day",
          },
          {
            className: "govuk-input--width-2 govuk-input--error",
            name: "month",
          },
          {
            className: "govuk-input--width-4 govuk-input--error",
            name: "year",
          },
        ]}
      />,
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toBeTruthy();
    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
    expect(screen.getByText("What is your date of birth?")).toBeInTheDocument();
    expect(screen.getByText("Error message goes here")).toBeInTheDocument();
    expect(screen.getByText("For example, 31 3 1980")).toBeInTheDocument();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for DateInput called "${example.name}"`, () => {
      render(<DateInput {...example.options} />);
      if (example.options.fieldset) {
        const fieldset = screen.getByRole("group");
        expect(fieldset).toBeInTheDocument();
        expect(
          screen.getByText(example.options.fieldset.legend.children),
        ).toBeInTheDocument();
      }
      if (example.options.errorMessage) {
        expect(
          screen.getByText(example.options.errorMessage.children),
        ).toBeInTheDocument();
      }
      if (example.options.hint) {
        expect(
          screen.getByText(example.options.hint.children),
        ).toBeInTheDocument();
      }

      if (example.options.items) {
        example.options.items.forEach((item) => {
          expect(
            screen.getByLabelText(titleCase(item.name)),
          ).toBeInTheDocument();
        });
      } else {
        expect(screen.getByLabelText("Day")).toBeInTheDocument();
        expect(screen.getByLabelText("Month")).toBeInTheDocument();
        expect(screen.getByLabelText("Year")).toBeInTheDocument();
      }
    });
  });
});
