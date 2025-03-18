import React, { useEffect } from "react";
import "./Checkboxes.scss";
import Checkboxes from "./Checkboxes";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/checkboxes/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { WithItemRefs } from "../../utils/WithReference";
import { ConfigureOverallCheckboxes } from "./Checkboxes.config";
import { action } from "@storybook/addon-actions";

let configured = false;
const meta: Meta<typeof Checkboxes> = {
  title: "GOVUK Design System/Checkboxes",
  component: Checkboxes,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureCheckboxes = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallCheckboxes();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallCheckboxes();
          }
        };
        configureCheckboxes();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
  args: { onChange: action("on-change"), onBlur: action("on-blur") },
};

export default meta;
type Story = StoryObj<typeof Checkboxes>;

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
export const WithPreCheckedValues = createStory(1);
export const WithDividerAndNone = createStory(2);
export const WithDividerNoneAndConditionalItems = createStory(3);
export const WithIdAndName = createStory(4);
export const WithHintsOnItems = createStory(5);
export const WithDisabledItem = createStory(6);
export const WithLegendAsAPageHeading = createStory(7);
export const WithAMediumLegend = createStory(8);
export const WithoutFieldset = createStory(9);
export const WithSingleOptionSetAriaDescribedbyOnInput = createStory(10);
export const WithSingleOptionAndHintSetAriaDescribedbyOnInput = createStory(11);
export const WithFieldsetAndErrorMessage = createStory(12);
export const WithErrorMessage = createStory(13);
export const WithErrorMessageAndHintsOnItems = createStory(14);
export const WithVeryLongOptionText = createStory(15);
export const WithConditionalItems = createStory(16);
export const WithConditionalItemsWithSpecialCharacters = createStory(17);
export const WithConditionalItemChecked = createStory(18);
export const WithOptionalFormGroupClassesShowingGroupError = createStory(19);
export const Small = createStory(20);
export const SmallWithLongText = createStory(21);
export const SmallWithError = createStory(22);
export const SmallWithHint = createStory(23);
export const SmallWithDisabled = createStory(24);
export const SmallWithConditionalReveal = createStory(25);
export const SmallWithDividerAndNone = createStory(26);

// Template with reference
const Template: StoryFn<typeof Checkboxes> = (args) => (
  <WithItemRefs Component={Checkboxes} {...args} />
);

export const WithReference = {
  render: Template,
  args: { ...DefaultExample.args },
  parameters: { initializeConfigurations: true },
};
