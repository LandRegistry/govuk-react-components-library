import React from "react";
import "./Accordion.scss";
import Accordion from "./Accordion";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/accordion/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallAccordion } from "./Accordion.config";

let configured = false;
const meta: Meta<typeof Accordion> = {
  title: "GOVUK Design System/Accordion",
  component: Accordion,
  decorators: [
    (Story, { parameters }) => {
      React.useEffect(() => {
        const configureAccordion = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallAccordion();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallAccordion();
          }
        };
        configureAccordion();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

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
export const WithAdditionalDescriptions = createStory(1);
export const WithLongContentAndDescription = createStory(2);
export const WithOneSectionOpen = createStory(3);
export const WithAllSectionsAlreadyOpen = createStory(4);
export const WithFocusableElementsInside = createStory(5);
export const WithTranslations = {
  ...createStory(6),
  parameters: { initializeConfigurations: true },
};
