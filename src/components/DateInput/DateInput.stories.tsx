import React from "react";
import "./DateInput.scss";
import DateInput from "./DateInput";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/date-input/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { WithItemRefs } from "../../utils/WithReference";

const meta: Meta<typeof DateInput> = {
  title: "GOVUK Design System/Date input",
  component: DateInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateInput>;

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
export const CompleteQuestion = createStory(1);
export const DayAndMonth = createStory(2);
export const MonthAndYear = createStory(3);
export const WithErrorsOnly = createStory(4);
export const WithErrorsAndHint = createStory(5);
export const WithErrorOnDayInput = createStory(6);
export const WithErrorOnMonthInput = createStory(7);
export const WithErrorOnYearInput = createStory(8);
export const WithDefaultItems = createStory(9);
export const WithOptionalFormGroupClasses = createStory(10);
export const WithAutocompleteValues = createStory(11);
export const WithInputAttributes = createStory(12);

const Template: StoryFn<typeof DateInput> = (args) => (
  <WithItemRefs Component={DateInput} {...args} />
);
const example = examplesFromFixtures[1];
export const WithReference = {
  render: Template,
  args: { ...example.options },
};
