// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./WarningText.scss";
import WarningText from "./WarningText";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/warning-text/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof WarningText> = {
  title: "GOVUK Design System/Warning text",
  component: WarningText,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WarningText>;

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

// Utility function to create stories from fixtures
const createStory = (index: number): Story => {
  const example: ComponentFixture | undefined = examplesFromFixtures[index];
  return {
    name: example?.name,
    args: { ...example?.options },
  };
};

// Stories generated from fixtures
export const DefaultExample = createStory(0);
export const MultipleLines = createStory(1);
