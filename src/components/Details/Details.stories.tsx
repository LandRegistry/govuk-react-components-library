// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Details.scss";
import Details from "./Details";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/details/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Details> = {
  title: "GOVUK Design System/Details",
  component: Details,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Details>;

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
export const Expanded = createStory(1);
export const WithHtml = createStory(2);
