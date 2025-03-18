// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Hint.scss";
import Hint from "./Hint";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/hint/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Hint> = {
  title: "GOVUK Design System/Hint",
  component: Hint,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Hint>;

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
export const WithHtml = createStory(1);
