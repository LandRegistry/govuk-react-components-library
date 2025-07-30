import React from "react";
import "./Table.scss";
import Table from "./Table";
import { Meta, StoryObj } from "@storybook/react-vite";
import fixtures from "govuk-frontend/dist/govuk/components/table/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";

const meta: Meta<typeof Table> = {
  title: "GOVUK Design System/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

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
export const TableWithHead = createStory(1);
export const TableWithHeadAndCaption = createStory(2);
export const WithSmallTextModifierForTablesWithALotOfData = createStory(3);
export const withEverythingAndFooter: Story = {
  args: {
    ...examplesFromFixtures[2]?.options,
    footer: [
      {
        children: <>Total &#8594;</>,
      },
      {
        children: "£325",
        format: "numeric",
      },
      {
        children: "£275",
        format: "numeric",
      },
    ],
  },
};
