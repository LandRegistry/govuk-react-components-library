// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./PhaseBanner.scss";
import PhaseBanner from "./PhaseBanner";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/phase-banner/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof PhaseBanner> = {
  title: "GOVUK Design System/Phase banner",
  component: PhaseBanner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PhaseBanner>;

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
