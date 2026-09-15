import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import PasswordInput from "./PasswordInput";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/password-input/fixtures.json";
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

describe("PasswordInput component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders a password input with a label", () => {
    render(
      <PasswordInput
        id="password"
        label={{ children: "Password" }}
        name="password"
      />,
    );
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  test("sets autocomplete to current-password by default", () => {
    render(
      <PasswordInput
        id="password"
        label={{ children: "Password" }}
        name="password"
      />,
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "current-password",
    );
  });

  test("allows autocomplete to be overridden", () => {
    render(
      <PasswordInput
        id="password"
        label={{ children: "Password" }}
        name="password"
        autoComplete="new-password"
      />,
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "new-password",
    );
  });

  test("renders hint text and links it via aria-describedby", () => {
    render(
      <PasswordInput
        id="password-hint"
        label={{ children: "Password" }}
        name="password"
        hint={{ children: "Must be at least 8 characters." }}
      />,
    );
    expect(
      screen.getByText("Must be at least 8 characters."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("password-hint-hint"),
    );
  });

  test("renders an error message and applies error classes", () => {
    render(
      <PasswordInput
        id="password-error"
        label={{ children: "Password" }}
        name="password"
        errorMessage={{ children: "Enter your password" }}
      />,
    );
    expect(screen.getByText("Enter your password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveClass("govuk-input--error");
  });

  test("wraps label in h1 when isPageHeading is true", () => {
    render(
      <PasswordInput
        id="password-heading"
        label={{ children: "Password", isPageHeading: true }}
        name="password"
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  test("show/hide toggle button is present but hidden by default (JS manages visibility)", () => {
    const { container } = render(
      <PasswordInput
        id="password"
        label={{ children: "Password" }}
        name="password"
      />,
    );
    const toggle = container.querySelector(
      ".govuk-js-password-input-toggle",
    ) as HTMLButtonElement;
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("hidden");
  });

  test("applies data-module for govuk-frontend JS initialisation", () => {
    const { container } = render(
      <PasswordInput
        id="password"
        label={{ children: "Password" }}
        name="password"
      />,
    );
    expect(container.firstChild).toHaveAttribute(
      "data-module",
      "govuk-password-input",
    );
  });

  test("sets i18n data attributes when translation props are provided", () => {
    const { container } = render(
      <PasswordInput
        id="password-translated"
        label={{ children: "Cyfrinair" }}
        name="password"
        showPasswordText="Datguddia"
        hidePasswordText="Cuddio"
        showPasswordAriaLabelText="Datgelu cyfrinair"
        hidePasswordAriaLabelText="Cuddio cyfrinair"
        passwordShownAnnouncementText="Mae eich cyfrinair yn weladwy."
        passwordHiddenAnnouncementText="Mae eich cyfrinair wedi'i guddio."
      />,
    );
    expect(container.firstChild).toHaveAttribute(
      "data-i18n.show-password",
      "Datguddia",
    );
    expect(container.firstChild).toHaveAttribute(
      "data-i18n.hide-password",
      "Cuddio",
    );
    expect(container.firstChild).toHaveAttribute(
      "data-i18n.show-password-aria-label",
      "Datgelu cyfrinair",
    );
  });

  test("falls back to name for id when id is not provided", () => {
    render(<PasswordInput label={{ children: "Password" }} name="password" />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("id", "password");
  });

  test("falls back to resolvedId for name when name is not provided", () => {
    render(<PasswordInput id="password-id" label={{ children: "Password" }} />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "name",
      "password-id",
    );
  });

  test("uses an empty error id when neither id nor name is provided", () => {
    const { container } = render(
      <PasswordInput
        label={{ children: "Password" }}
        errorMessage={{ children: "Enter your password" }}
      />,
    );
    expect(screen.getByText("Enter your password")).toBeInTheDocument();
    expect(container.querySelector(".govuk-error-message")).toHaveAttribute(
      "id",
      "",
    );
  });

  test("omits i18n data attributes when translation props are set to an empty string", () => {
    const { container } = render(
      <PasswordInput
        id="password-no-i18n"
        label={{ children: "Password" }}
        name="password"
        showPasswordText=""
        hidePasswordText=""
        showPasswordAriaLabelText=""
        hidePasswordAriaLabelText=""
      />,
    );
    expect(container.firstChild).not.toHaveAttribute("data-i18n.show-password");
    expect(container.firstChild).not.toHaveAttribute("data-i18n.hide-password");
    expect(container.firstChild).not.toHaveAttribute(
      "data-i18n.show-password-aria-label",
    );
    expect(container.firstChild).not.toHaveAttribute(
      "data-i18n.hide-password-aria-label",
    );
  });

  test("appends formGroup.className to the form group wrapper", () => {
    const { container } = render(
      <PasswordInput
        id="password"
        label={{ children: "Password" }}
        name="password"
        formGroup={{ className: "custom-form-group" }}
      />,
    );
    expect(container.firstChild).toHaveClass("custom-form-group");
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for PasswordInput called "${example.name}"`, () => {
      render(
        <PasswordInput
          {...example.options}
          id={example.options?.id || example.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event);
          }}
        />,
      );
      if (example.options?.label) {
        expect(
          screen.getByLabelText(example.options.label.children as string),
        ).toBeInTheDocument();
      }
      if (example.options?.hint) {
        expect(
          screen.getByText(example.options.hint.children as string),
        ).toBeInTheDocument();
      }
      if (example.options?.errorMessage) {
        expect(
          screen.getByText(example.options.errorMessage.children as string),
        ).toBeInTheDocument();
      }
    });
  });
});
