// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Fieldset.scss";
import Fieldset from "./Fieldset";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/fieldset/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Fieldset> = {
  title: "GOVUK Design System/Fieldset",
  component: Fieldset,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

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
export const StyledAsXlText = createStory(1);
export const StyledAsLargeText = createStory(2);
export const StyledAsMediumText = createStory(3);
export const StyledAsSmallText = createStory(4);
export const AsPageHeadingXl = createStory(5);
export const AsPageHeadingL = createStory(6);
export const AsPageHeadingM = createStory(7);
export const AsPageHeadingS = createStory(8);
export const AsPageHeadingWithoutClass = createStory(9);
