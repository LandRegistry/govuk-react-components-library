import React, { useEffect } from "react";
import "./CharacterCount.scss";
import CharacterCount from "./CharacterCount";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/character-count/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallCharacterCount } from "./CharacterCount.config";

let configured = false;
const meta: Meta<typeof CharacterCount> = {
  title: "GOVUK Design System/Character count",
  component: CharacterCount,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureCharacterCount = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallCharacterCount();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallCharacterCount();
          }
        };
        configureCharacterCount();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CharacterCount>;

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
export const WithCustomTextareaDescription = createStory(1);
export const WithHint = createStory(2);
export const WithDefaultValue = createStory(3);
export const WithDefaultValueExceedingLimit = createStory(4);
export const WithCustomRows = createStory(5);
export const WithLabelAsPageHeading = createStory(6);
export const WithWordCount = createStory(7);
export const WithThreshold = createStory(8);
export const WithTranslations = {
  ...createStory(9),
  parameters: { initializeConfigurations: true },
};
