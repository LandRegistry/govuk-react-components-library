// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./InsetText.scss";
import InsetText from "./InsetText";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/inset-text/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof InsetText> = {
  title: "GOVUK Design System/Inset text",
  component: InsetText,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InsetText>;

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
