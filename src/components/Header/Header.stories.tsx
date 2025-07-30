import React, { useEffect } from "react";
import "./Header.scss";
import Header from "./Header";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/header/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallHeader } from "./Header.config";

let configured = false;
const meta: Meta<typeof Header> = {
  title: "GOVUK Design System/Header",
  component: Header,
  decorators: [
    (Story, { parameters }) => {
      useEffect(() => {
        const configureHeader = () => {
          const isDocsMode = window.location.search.includes("viewMode=docs");
          if (
            isDocsMode &&
            !configured &&
            parameters.initializeConfigurations
          ) {
            ConfigureOverallHeader();
            configured = true;
          } else if (!isDocsMode) {
            ConfigureOverallHeader();
          }
        };
        configureHeader();
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

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
// Manually adding a custom story for "WithoutGovUkHeader"
export const WithoutGovUkHeader: Story = {
  args: {
    ...examplesFromFixtures[0].options,
    removeGovUKHeader: true,
    productName: (
      <>
        <div>
          <svg
            aria-hidden="true"
            focusable="false"
            className="govuk-header__logotype-crown"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 132 97"
            height="30"
            width="36"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="..." // The rest of the path data
            />
          </svg>
          <span className="hmlr-header__title no-underline">
            {" "}
            Document and plan retrieval system
          </span>
        </div>
      </>
    ),
  },
};

// Stories generated from fixtures
export const DefaultExample = createStory(0);
export const WithStEdwardSCrown = createStory(1);
export const WithServiceName = createStory(2);
export const WithServiceNameButNoServiceUrl = createStory(3);
export const WithNavigation = createStory(4);
export const WithCustomNavigationLabel = createStory(5);
export const WithCustomMenuButtonText = createStory(6);
export const WithCustomMenuButtonLabel = createStory(7);
export const WithServiceNameAndNavigation = createStory(8);
export const WithLargeNavigation = createStory(9);
export const WithProductName = createStory(10);
export const FullWidth = createStory(11);
export const FullWidthWithNavigation = createStory(12);
export const WithFullWidthBorder = createStory(13);
export const NavigationItemWithHtml = createStory(14);
export const NavigationItemWithTextWithoutLink = {
  ...createStory(15),
  parameters: { initializeConfigurations: true },
};
