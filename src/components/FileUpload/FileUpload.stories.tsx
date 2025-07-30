import React from "react";
import "./FileUpload.scss";
import FileUpload from "./FileUpload";
import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/file-upload/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { WithRef } from "../../utils/WithReference";

const meta: Meta<typeof FileUpload> = {
  title: "GOVUK Design System/File upload",
  component: FileUpload,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

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
export const WithErrorMessageAndHint = createStory(2);
export const WithValue = createStory(3);
export const WithLabelAsPageHeading = createStory(4);
export const WithOptionalFormGroupClasses = createStory(5);

const Template: StoryFn<typeof FileUpload> = (args) => (
  <WithRef Component={FileUpload} {...args} />
);
const example: ComponentFixture = examplesFromFixtures[0];
export const WithReference = {
  render: Template,
  args: { ...example.options },
};
