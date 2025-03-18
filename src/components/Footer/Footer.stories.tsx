// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./Footer.scss";
import Footer from "./Footer";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/footer/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Footer> = {
  title: "GOVUK Design System/Footer",
  component: Footer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

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
export const WithCustomHtmlContentLicenceAndCopyrightNotice = createStory(1);
export const WithCustomTextContentLicenceAndCopyrightNotice = createStory(2);
export const WithMeta = createStory(3);
export const WithCustomMeta = createStory(4);
export const WithMetaLinksAndMetaContent = createStory(5);
export const WithDefaultWidthNavigationOneColumn = createStory(7);
export const WithDefaultWidthNavigationTwoColumns = createStory(8);
export const WithNavigation = createStory(9);
export const FullGdsExample = createStory(10);
export const ThreeEqualColumns = createStory(11);
