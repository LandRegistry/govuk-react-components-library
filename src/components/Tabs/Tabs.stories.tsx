import React, { useEffect } from "react";
import "./Tabs.scss";
import Tabs from "./Tabs";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/tabs/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallTabs } from "./Tabs.config";

let configured = false;
const meta: Meta<typeof Tabs> = {
  title: "GOVUK Design System/Tabs",
  component: Tabs,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureTabs = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallTabs();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallTabs();
          }
        };
        configureTabs();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

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
export const TabsWithAnchorInPanel = {
  ...createStory(1),
  parameters: { initializeConfigurations: true },
};
