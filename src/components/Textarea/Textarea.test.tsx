import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Textarea from "./Textarea";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/textarea/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const errorMessage = {
  children: "You must provide an explanation",
};
const label = {
  children: "Why can’t you provide a National Insurance number?",
};

const hint = {
  children: "Give every possible details, no detail is too small or irrelevant",
};

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("Textarea component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Textarea properly", () => {
    const newLabel = { ...label, isPageHeading: true };
    render(
      <Textarea
        formGroup={{
          className: "extra-class",
        }}
        hint={hint}
        errorMessage={errorMessage}
        id="no-ni-reason"
        label={newLabel}
        name="no-ni-reason"
        value="It wasn't me because ..."
        rows={8}
        spellCheck
        onChange={(event) => {
          console.log(event);
        }}
      />,
    );

    expect(screen.getByText(errorMessage.children)).toBeInTheDocument();
    expect(screen.getByLabelText(label.children)).toBeInTheDocument();
    expect(screen.getByText(hint.children)).toBeInTheDocument();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Textarea called "${example.name}"`, () => {
      render(
        <Textarea
          {...example.options}
          id={example.options.id || example.name}
          onChange={(event) => {
            console.log(event);
          }}
        />,
      );

      expect(
        screen.getByLabelText(example.options.label.children),
      ).toBeInTheDocument();

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
    });
  });
});
