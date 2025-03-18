import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Button from "./Button";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/button/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Button component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the text given", () => {
    const buttonText = "Save and continue";
    render(
      <MemoryRouter>
        <Button>{buttonText}</Button>
      </MemoryRouter>,
    );
    const renderedButton = screen.getByRole("button", {
      name: buttonText,
    });
    expect(renderedButton).toBeTruthy();
    expect(renderedButton.hasAttribute("href")).toBeFalsy();
    expect(renderedButton.hasAttribute("disabled")).toBeFalsy();
  });

  test("should be disabled if indicated", () => {
    const buttonText = "Disabled button";
    render(
      <MemoryRouter>
        <Button disabled>{buttonText}</Button>
      </MemoryRouter>,
    );
    const renderedButton = screen.getByRole("button", { name: buttonText });
    expect(renderedButton).toBeTruthy();
    expect(renderedButton.hasAttribute("disabled")).toBeTruthy();
  });

  test("should have a name if specified", () => {
    const buttonText = "Named button";
    render(
      <MemoryRouter>
        <Button name="my fairy button">{buttonText}</Button>
      </MemoryRouter>,
    );
    const renderedButton = screen.getByRole("button", { name: buttonText });
    expect(renderedButton).toBeTruthy();
    expect(renderedButton.hasAttribute("name")).toBeTruthy();
  });

  test("should add the link given to it", () => {
    const buttonText = "Link button";
    render(
      <Button href="#" element="input">
        {buttonText}
      </Button>,
    );
    const renderedButton = screen.getByRole("button", { name: buttonText });
    expect(renderedButton).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Button called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <Button {...example.options} />
        </MemoryRouter>,
      );
      const renderedButton = screen.getByRole("button", {
        name: example.options.children,
      });
      expect(renderedButton).toBeTruthy();
    });
  });
});
