import React, { useEffect } from "react";
import "./ErrorSummary.scss";
import ErrorSummary from "./ErrorSummary";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/error-summary/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallErrorSummary } from "./ErrorSummary.config";

let configured = false;
const meta: Meta<typeof ErrorSummary> = {
  title: "GOVUK Design System/Error summary",
  component: ErrorSummary,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureErrorSummary = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallErrorSummary();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallErrorSummary();
          }
        };
        configureErrorSummary();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorSummary>;

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
export const WithoutLinks = createStory(1);
export const MixedWithAndWithoutLinks = createStory(2);
export const WithDescriptionOnly = createStory(3);
export const WithEverything = {
  ...createStory(4),
  parameters: { initializeConfigurations: true },
};
