// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Tag.scss";
import Tag from "./Tag";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/tag/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Tag> = {
  title: "GOVUK Design System/Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tag>;

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
export const Grey = createStory(1);
export const Blue = createStory(2);
export const LightBlue = createStory(3);
export const Turquoise = createStory(4);
export const Green = createStory(5);
export const Purple = createStory(6);
export const Pink = createStory(7);
export const Red = createStory(8);
export const Orange = createStory(9);
export const Yellow = createStory(10);
