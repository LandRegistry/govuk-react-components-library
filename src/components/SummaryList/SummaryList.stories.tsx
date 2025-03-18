// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./SummaryList.scss";
import SummaryList from "./SummaryList";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/summary-list/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof SummaryList> = {
  title: "GOVUK Design System/Summary list",
  component: SummaryList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryList>;

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
export const WithActions = createStory(1);
export const Translated = createStory(2);
export const WithSomeActions = createStory(3);
export const WithNoFirstAction = createStory(4);
export const NoBorder = createStory(5);
export const NoBorderOnLastRow = createStory(6);
export const OverriddenWidths = createStory(7);
export const CheckYourAnswers = createStory(8);
export const Extreme = createStory(9);
export const AsASummaryCardWithATextHeader = createStory(10);
export const AsASummaryCardWithACustomHeaderLevel = createStory(11);
export const AsASummaryCardWithAHtmlHeader = createStory(12);
export const AsASummaryCardWithActions = createStory(13);
export const AsASummaryCardWithActionsPlusSummaryListActions = createStory(14);
