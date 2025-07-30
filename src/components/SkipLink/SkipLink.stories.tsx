import React, { useEffect } from "react";
import "./SkipLink.scss";
import SkipLink from "./SkipLink";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/skip-link/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallSkipLink } from "./SkipLink.config";

let configured = false;
const meta: Meta<typeof SkipLink> = {
  title: "GOVUK Design System/Skip link",
  component: SkipLink,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureSkipLink = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallSkipLink();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallSkipLink();
          }
        };
        configureSkipLink();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

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
export const WithFocus = {
  ...createStory(1),
  parameters: { initializeConfigurations: true },
};
