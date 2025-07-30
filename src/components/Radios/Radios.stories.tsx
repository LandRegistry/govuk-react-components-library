import React, { useEffect } from "react";
import "./Radios.scss";
import Radios from "./Radios";
import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/radios/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { WithItemRefs } from "../../utils/WithReference";
import { ConfigureOverallRadios } from "./Radios.config";
import { action } from "storybook/actions";

const meta: Meta<typeof Radios> = {
  title: "GOVUK Design System/Radios",
  component: Radios,
  decorators: [
    (Story) => {
      useEffect(() => {
        // Remove any existing initialization before configuring
        const radios = document.querySelectorAll(".govuk-radios");
        radios.forEach((radio) => {
          radio.removeAttribute("data-module");
        });

        // Initialize once
        ConfigureOverallRadios();
      }, []);
      return <Story />;
    },
  ],
  parameters: {
    initializeConfigurations: true,
  },
  args: {
    onChange: action("on-change"),
    onBlur: action("on-blur"),
  },
};

export default meta;
type Story = StoryObj<typeof Radios>;

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
export const Inline = createStory(1);
export const WithDisabled = createStory(2);
export const WithLegendAsPageHeading = createStory(3);
export const WithAMediumLegend = createStory(4);
export const WithADivider = createStory(5);
export const WithHintsOnItems = createStory(6);
export const WithoutFieldset = createStory(7);
export const WithFieldsetAndErrorMessage = createStory(8);
export const WithVeryLongOptionText = createStory(9);
export const WithConditionalItems = createStory(10);
export const WithConditionalItemsWithSpecialCharacters = createStory(11);
export const WithConditionalItemChecked = createStory(12);
export const Prechecked = createStory(13);
export const PrecheckedUsingValue = createStory(14);
export const WithConditionalItemsAndPreCheckedValue = createStory(15);
export const WithOptionalFormGroupClassesShowingGroupError = createStory(16);
export const Small = createStory(17);
export const SmallWithLongText = createStory(18);
export const SmallWithError = createStory(19);
export const SmallWithHint = createStory(20);
export const SmallWithDisabled = createStory(21);
export const SmallWithConditionalReveal = createStory(22);
export const SmallInline = createStory(23);
export const SmallInlineExtreme = createStory(24);
export const SmallWithADivider = createStory(25);
export const WithIdprefix = createStory(26);

// Template for WithReference Story
const Template: StoryFn<typeof Radios> = (args) => (
  <WithItemRefs Component={Radios} {...args} />
);

export const WithReference = {
  render: Template,
  args: { ...examplesFromFixtures[0].options },
  parameters: { initializeConfigurations: true },
};
