import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Label from "./Label";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/label/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Label component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Label properly", () => {
    render(<Label>National Insurance number</Label>);
    expect(screen.getByText("National Insurance number")).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Label called "${example.name}"`, () => {
      render(<Label {...example.options} />);
      expect(screen.getByText(example.options.children)).toBeTruthy();
      if (example.options.isPageHeading) {
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
      }
    });
  });

  test("renders label with provided text", () => {
    render(<Label htmlFor="test-id">Test Label</Label>);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("LABEL");
    expect(labelElement).toHaveAttribute("for", "test-id");
  });

  test("does not render when no children are provided", () => {
    const { container } = render(<Label htmlFor="test-id" />);
    expect(container.firstChild).toBeNull(); // Nothing is rendered when no children
  });

  test("renders label inside an h1 if isPageHeading is true", () => {
    render(
      <Label htmlFor="test-id" isPageHeading={true}>
        Page Heading Label
      </Label>,
    );

    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();

    const labelElement = screen.getByText("Page Heading Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("LABEL");
  });

  test("applies custom className when provided", () => {
    render(
      <Label htmlFor="test-id" className="custom-class">
        Custom Class Label
      </Label>,
    );

    const labelElement = screen.getByText("Custom Class Label");
    expect(labelElement).toHaveClass("govuk-label custom-class");
  });

  test("spreads additional attributes to the label element", () => {
    render(
      <Label
        htmlFor="test-id"
        data-testid="label-test"
        aria-label="Test Aria Label"
      >
        Test Label with Attributes
      </Label>,
    );

    const labelElement = screen.getByTestId("label-test");
    expect(labelElement).toHaveAttribute("aria-label", "Test Aria Label");
  });
});
