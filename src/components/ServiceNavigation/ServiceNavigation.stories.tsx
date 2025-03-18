// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./ServiceNavigation.scss";
import ServiceNavigation from "./ServiceNavigation";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/service-navigation/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof ServiceNavigation> = {
  title: "GOVUK Design System/Service navigation",
  component: ServiceNavigation,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ServiceNavigation>;

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
export const WithNavigationWithACurrentItem = createStory(1);
export const WithNavigationWithAnActiveItem = createStory(2);
export const WithLargeNavigation = createStory(3);
export const WithHtmlNavigationItems = createStory(4);
export const WithNonLinkNavigationItems = createStory(5);
export const WithServiceName = createStory(6);
export const WithServiceLink = createStory(7);
export const WithLongServiceName = createStory(8);
export const WithServiceNameAndNavigation = createStory(9);
