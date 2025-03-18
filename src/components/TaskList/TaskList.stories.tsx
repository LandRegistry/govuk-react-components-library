// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./TaskList.scss";
import TaskList from "./TaskList";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/task-list/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof TaskList> = {
  title: "GOVUK Design System/Task list",
  component: TaskList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TaskList>;

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
export const ExampleWith3States = createStory(1);
export const ExampleWithHintTextAndAdditionalStates = createStory(2);
export const ExampleWithAllPossibleColours = createStory(3);
export const ExampleWithVeryLongSingleWordTags = createStory(4);
export const WithEmptyValues = createStory(5);
