// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Breadcrumbs.scss";
import Breadcrumbs from "./Breadcrumbs";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/breadcrumbs/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Breadcrumbs> = {
  title: "GOVUK Design System/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

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
export const WithOneLevel = createStory(1);
export const WithMultipleLevels = createStory(2);
export const WithoutTheHomeSection = createStory(3);
export const WithLastBreadcrumbAsCurrentPage = createStory(4);
export const WithCollapseOnMobile = createStory(5);
export const Inverse = createStory(6);
