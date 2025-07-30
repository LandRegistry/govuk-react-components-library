// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Panel.scss";
import Panel from "./Panel";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/panel/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Panel> = {
  title: "GOVUK Design System/Panel",
  component: Panel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Panel>;

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

// Utility function to create stories from fixtures
const createStory = (index: number): Story => {
  const example = examplesFromFixtures[index];
  if (!example) {
    throw new Error(
      `No fixture found at index ${index}. Available fixtures: ${examplesFromFixtures.length}`,
    );
  }
  return {
    name: example.name,
    args: { ...example.options },
  };
};

// Stories generated from fixtures
export const DefaultExample = createStory(0);

// Create a custom story for heading level since it's not in the visible fixtures
export const CustomHeadingLevel: Story = {
  name: "Custom Heading Level",
  args: {
    titleChildren: "Application complete",
    children: "Your reference number: HDJ2123F",
    headingLevel: "h2",
  },
};
