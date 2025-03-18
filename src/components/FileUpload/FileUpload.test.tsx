import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import FileUpload from "./FileUpload";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/file-upload/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("FileUpload component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render Day, Month and Year properly", () => {
    render(
      <FileUpload
        id="file-upload-1"
        label={{
          children: "Upload a file",
        }}
        name="file-upload-1"
      />,
    );

    expect(screen.getByLabelText("Upload a file")).toBeInTheDocument();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    if (example.name === "with value") {
      return;
    }
    test(`Test Fixture for DateInput called "${example.name}"`, () => {
      render(
        <FileUpload
          {...example.options}
          id={example.options.id || example.name}
        />,
      );
      expect(
        screen.getByLabelText(example.options.label.children),
      ).toBeInTheDocument();

      if (example.options.label.isPageHeading) {
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
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
    });
  });
});
