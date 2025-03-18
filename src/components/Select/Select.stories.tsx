// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Select.scss";
import Select from "./Select";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/select/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Select> = {
  title: "GOVUK Design System/Select",
  component: Select,
  tags: ["autodocs"],
  args: { onChange: action("on-change"), onBlur: action("on-blur") },
};

export default meta;
type Story = StoryObj<typeof Select>;

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
export const WithNoItems = createStory(1);
export const WithSelectedValue = createStory(2);
export const WithHintTextAndErrorMessage = createStory(3);
export const WithLabelAsPageHeading = createStory(4);
export const WithFullWidthOverride = createStory(5);
export const WithOptionalFormGroupClasses = createStory(6);
