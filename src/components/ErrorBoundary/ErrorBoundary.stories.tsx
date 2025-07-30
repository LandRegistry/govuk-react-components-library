import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import ErrorBoundary from "./ErrorBoundary";

const meta: Meta<typeof ErrorBoundary> = {
  title: "ReactComponentLibrary/Error boundary",
  component: ErrorBoundary,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const ErrorBoundaryWithMessage: Story = {
  args: {
    children: <p>This is a test for error boundary</p>,
  },
};

export const ErrorBoundaryWithDifferentBasePageName: Story = {
  args: {
    children: <p>This is a test for error boundary</p>,
    basePageName: "MyCustomBasePage",
  },
};
