import React, { useEffect } from "react";
import "./NotificationBanner.scss";
import NotificationBanner from "./NotificationBanner";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/notification-banner/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallNotificationBanner } from "./NotificationBanner.config";

let configured = false;
const meta: Meta<typeof NotificationBanner> = {
  title: "GOVUK Design System/Notification banner",
  component: NotificationBanner,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureNotificationBanner = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallNotificationBanner();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallNotificationBanner();
          }
        };
        configureNotificationBanner();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationBanner>;

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
export const ParagraphAsHtmlHeading = createStory(1);
export const WithTextAsHtml = createStory(2);
export const WithTypeAsSuccess = createStory(3);
export const SuccessWithCustomHtml = createStory(4);
export const WithAList = createStory(5);
export const WithLongHeading = createStory(6);
export const WithLotsOfContent = createStory(7);
export const AutoFocusDisabledWithTypeAsSuccess = createStory(8);
export const AutoFocusExplicitlyEnabledWithTypeAsSuccess = createStory(9);
export const RoleAlertOverriddenToRoleRegionWithTypeAsSuccess = createStory(10);
export const CustomTabindex = {
  ...createStory(11),
  parameters: { initializeConfigurations: true },
};
