// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./CookieBanner.scss";
import CookieBanner from "./CookieBanner";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/cookie-banner/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof CookieBanner> = {
  title: "GOVUK Design System/Cookie banner",
  component: CookieBanner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CookieBanner>;

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
export const AcceptedConfirmationBanner = createStory(1);
export const RejectedConfirmationBanner = createStory(2);
export const ClientSideImplementation = createStory(3);
export const WithHtml = createStory(4);
