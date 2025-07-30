import React from "react";
import "./Textarea.scss";
import Textarea from "./Textarea";
import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/textarea/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { WithRef } from "../../utils/WithReference";

const meta: Meta<typeof Textarea> = {
  title: "GOVUK Design System/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

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
export const WithHint = createStory(1);
export const WithErrorMessage = createStory(2);
export const WithDefaultValue = createStory(3);
export const WithCustomRows = createStory(4);
export const WithLabelAsPageHeading = createStory(5);
export const WithOptionalFormGroupClasses = createStory(6);
export const WithAutocompleteAttribute = createStory(7);
export const WithSpellcheckEnabled = createStory(8);
export const WithSpellcheckDisabled = createStory(9);

const Template: StoryFn<typeof Textarea> = (args) => (
  <WithRef Component={Textarea} {...args} />
);
const example = examplesFromFixtures[0];
export const WithReference = {
  render: Template,
  args: { ...example.options },
};
