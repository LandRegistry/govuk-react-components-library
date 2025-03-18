// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./BackLink.scss";
import BackLink from "./BackLink";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/back-link/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof BackLink> = {
  title: "GOVUK Design System/Back link",
  component: BackLink,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BackLink>;

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
export const WithCustomText = createStory(1);
export const WithCustomLink = createStory(2);
export const Inverse = createStory(3);
