import React from "react";
import "./Input.scss";
import Input from "./Input";
import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/input/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { WithRef } from "../../utils/WithReference";

const meta: Meta<typeof Input> = {
  title: "GOVUK Design System/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

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
export const WithHintText = createStory(1);
export const WithErrorMessage = createStory(2);
export const WithErrorAndHint = createStory(3);
export const WithWidth2Class = createStory(4);
export const WithWidth3Class = createStory(5);
export const WithWidth4Class = createStory(6);
export const WithWidth5Class = createStory(7);
export const WithWidth10Class = createStory(8);
export const WithWidth20Class = createStory(9);
export const WithWidth30Class = createStory(10);
export const WithLabelAsPageHeading = createStory(11);
export const WithOptionalFormGroupClasses = createStory(12);
export const WithAutocompleteAttribute = createStory(13);
export const WithPatternAttribute = createStory(14);
export const WithSpellcheckEnabled = createStory(15);
export const WithSpellcheckDisabled = createStory(16);
export const WithAutocapitalizeTurnedOff = createStory(17);
export const Disabled = createStory(18);
export const WithPrefix = createStory(19);
export const WithSuffix = createStory(20);
export const WithPrefixAndSuffix = createStory(21);
export const WithPrefixAndLongSuffix = createStory(22);
export const WithPrefixAndSuffixAndError = createStory(23);
export const WithPrefixAndSuffixAndWidthModifier = createStory(24);
export const WithExtraLetterSpacing = createStory(25);

const Template: StoryFn<typeof Input> = (args) => (
  <WithRef Component={Input} {...args} />
);
const example: ComponentFixture = examplesFromFixtures[0];
export const WithReference = {
  render: Template,
  args: { ...example.options },
};
