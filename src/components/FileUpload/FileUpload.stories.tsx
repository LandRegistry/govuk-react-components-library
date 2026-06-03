// THIS FILE IS AUTO-GENERATED — do not edit manually.
// Source: node_modules/govuk-frontend/dist/govuk/components/file-upload/fixtures.json
// Regenerate: npm run generate-stories

import React from "react";
import "./FileUpload.scss";
import FileUpload from "./FileUpload";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/file-upload/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
const meta: Meta<typeof FileUpload> = {
  title: "GOVUK Design System/File upload",
  component: FileUpload,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// extractShownFixtures transforms raw govuk-frontend fixture data into
// React-compatible props (e.g. text → children, classes → className).
const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

export const Default: Story = {
  name: "default",
  args: { ...examplesFromFixtures.find((f) => f.name === "default")?.options },
};

export const WithHintText: Story = {
  name: "with hint text",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with hint text")?.options,
  },
};

export const WithErrorMessageAndHint: Story = {
  name: "with error message and hint",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with error message and hint",
    )?.options,
  },
};

export const WithLabelAsPageHeading: Story = {
  name: "with label as page heading",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with label as page heading")
      ?.options,
  },
};

export const Enhanced: Story = {
  name: "enhanced",
  args: { ...examplesFromFixtures.find((f) => f.name === "enhanced")?.options },
};

export const EnhancedWithErrorMessageAndHint: Story = {
  name: "enhanced, with error message and hint",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "enhanced, with error message and hint",
    )?.options,
  },
};

export const EnhancedMultipleFiles: Story = {
  name: "enhanced, multiple files",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "enhanced, multiple files")
      ?.options,
  },
};

export const EnhancedCustomWrapperClassesAndAttributes: Story = {
  name: "enhanced, custom wrapper classes and attributes",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "enhanced, custom wrapper classes and attributes",
    )?.options,
  },
};

export const Translated: Story = {
  name: "translated",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "translated")?.options,
  },
};
