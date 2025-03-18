import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Input from "./Input";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/input/fixtures.json";
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

describe("Input component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Input properly", () => {
    render(
      <Input
        id="input-example"
        label={{
          children: "National Insurance number",
          className: "MyLabel",
        }}
        name="test-name"
        type="text"
        className="MyInput"
      />,
    );
    expect(screen.getByLabelText("National Insurance number")).toBeTruthy();
  });

  test("should render basic Input properly with hint", () => {
    render(
      <Input
        hint={{
          children:
            "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
        }}
        id="input-with-hint-text"
        label={{
          children: "National insurance number",
        }}
        name="test-name-2"
        type="text"
      />,
    );
    expect(screen.getByLabelText("National insurance number")).toBeTruthy();
    expect(
      screen.getByText(
        "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
      ),
    ).toBeTruthy();
  });

  test("should render basic Input properly with hint and error message", () => {
    render(
      <Input
        errorMessage={{
          children: "Error message goes here",
        }}
        hint={{
          children:
            "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
        }}
        id="input-with-error-message"
        label={{
          children: "National Insurance number",
        }}
        name="test-name-3"
        type="text"
      />,
    );
    expect(screen.getByLabelText("National Insurance number")).toBeTruthy();
    expect(
      screen.getByText(
        "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Error message goes here")).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Input called "${example.name}"`, () => {
      render(
        <Input
          {...example.options}
          id={example.options.id || example.name}
          onChange={(event) => {
            console.log(event);
          }}
        />,
      );
      if (example.options.label) {
        expect(
          screen.getByLabelText(example.options.label.children),
        ).toBeTruthy();
      }
      if (example.options.hint) {
        expect(screen.getByText(example.options.hint.children)).toBeTruthy();
      }
      if (example.options.errorMessage) {
        expect(
          screen.getByText(example.options.errorMessage.children),
        ).toBeTruthy();
      }
    });
  });
});
