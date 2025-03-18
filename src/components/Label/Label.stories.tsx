// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Label.scss";
import Label from "./Label";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/label/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Label> = {
  title: "GOVUK Design System/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

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
export const WithBoldText = createStory(1);
export const StyledAsXlText = createStory(2);
export const StyledAsLargeText = createStory(3);
export const StyledAsMediumText = createStory(4);
export const StyledAsSmallText = createStory(5);
export const AsPageHeadingXl = createStory(6);
export const AsPageHeadingL = createStory(7);
export const AsPageHeadingM = createStory(8);
export const AsPageHeadingS = createStory(9);
export const AsPageHeadingWithoutClass = createStory(10);
