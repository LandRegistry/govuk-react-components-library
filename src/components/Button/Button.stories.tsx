import React, { useEffect } from "react";
import "./Button.scss";
import Button from "./Button";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/button/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallButton } from "./Button.config";
import { WithRef } from "../../utils/WithReference";

let configured = false;
const meta: Meta<typeof Button> = {
  title: "GOVUK Design System/Button",
  component: Button,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureButton = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallButton();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallButton();
          }
        };
        configureButton();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

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
export const Disabled = createStory(1);
export const Link = createStory(2);
export const Start = createStory(3);
export const StartLink = createStory(4);
export const Input = createStory(5);
export const InputDisabled = createStory(6);
export const PreventDoubleClick = createStory(7);
export const WithActiveState = createStory(8);
export const WithHoverState = createStory(9);
export const WithFocusState = createStory(10);
export const Secondary = createStory(11);
export const SecondaryDisabled = createStory(12);
export const SecondaryLink = createStory(13);
export const Warning = createStory(14);
export const WarningDisabled = createStory(15);
export const WarningLink = createStory(16);
export const Inverse = createStory(17);
export const InverseDisabled = createStory(18);
export const InverseLink = createStory(19);
export const InverseStart = createStory(20);

const Template: StoryFn<typeof Button> = (args) => (
  <WithRef Component={Button} {...args} />
);

export const WithReference = {
  render: Template,
  args: { ...DefaultExample.args },
  parameters: { initializeConfigurations: true },
};
