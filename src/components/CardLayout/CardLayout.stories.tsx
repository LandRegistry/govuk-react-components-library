import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import CardLayout from "./CardLayout";
import { CardLayoutProps } from "./CardLayout.types";

const meta: Meta<typeof CardLayout> = {
  title: "ReactComponentLibrary/Card layout",
  component: CardLayout,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<typeof CardLayout> = (args) => (
  <BrowserRouter>
    <CardLayout {...args} />
  </BrowserRouter>
);

const data: CardLayoutProps = {
  cardColumns: [
    {
      link: "#choose-scanner",
      header: "Scan agricultural credit documents",
      body: "Before you scan, you'll need to record the document on the agricultural credits system.",
    },
    {
      link: "#upload-document",
      header: "Upload agricultural credit documents",
      body: "Before you Upload, you'll need to record the document on the agricultural credits system.",
    },
    {
      link: "#search",
      header: "Find agricultural credit documents",
      body: "You'll need the official number.",
    },
    {
      link: "#find-land-charges-oversized-plan",
      header: "Find oversized land charge plans",
      body: "You'll need the registration date and number.",
    },
  ],
};

export const DefaultExample = {
  render: Template,
  args: data,
};

export const TwoCardColumnInLayout = {
  render: Template,
  args: { ...data, numberOfGridColumns: 2 },
};
