import React from "react";
import { Meta, StoryFn } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import Main from "./Main";

export default {
  title: "React Component Library/Main",
  component: Main,
  tags: ["autodocs"],
} as Meta<typeof Main>;

const Template: StoryFn<typeof Main> = (args) => (
  <MemoryRouter>
    <Main {...args} />
  </MemoryRouter>
);

export const Default = {
  render: Template,
  args: {
    children: <p className="govuk-body">Page content goes here.</p>,
  },
};

export const WithBackLink = {
  render: Template,
  args: {
    ...Default.args,
    backLink: "/previous-page",
  },
};
