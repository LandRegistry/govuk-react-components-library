// THIS FILE IS AUTO-GENERATED — do not edit manually.
// Source: node_modules/govuk-frontend/dist/govuk/components/panel/fixtures.json
// Regenerate: npm run generate-stories

import React from "react";
import "./Panel.scss";
import Panel from "./Panel";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/panel/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
const meta: Meta<typeof Panel> = {
  title: "GOVUK Design System/Panel",
  component: Panel,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Panel>;

// extractShownFixtures transforms raw govuk-frontend fixture data into
// React-compatible props (e.g. text → children, classes → className).
const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

export const Default: Story = {
  name: "default",
  args: { ...examplesFromFixtures.find((f) => f.name === "default")?.options },
};

export const Interruption: Story = {
  name: "interruption",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "interruption")?.options,
  },
};

export const InterruptionWithContentWithLongLineLength: Story = {
  name: "interruption-with-content-with-long-line-length",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "interruption-with-content-with-long-line-length",
    )?.options,
  },
};

export const InterruptionWithHeadingsContentAndLists: Story = {
  name: "interruption-with-headings-content-and-lists",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "interruption-with-headings-content-and-lists",
    )?.options,
  },
};
