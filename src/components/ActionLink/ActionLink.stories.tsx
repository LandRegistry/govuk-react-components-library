import React from "react";
import { Meta, StoryFn } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router";
import ActionLink from "./ActionLink";

export default {
  title: "React Component Library/Action link",
  component: ActionLink,
  tags: ["autodocs"],
} as Meta<typeof ActionLink>;

const Template: StoryFn<typeof ActionLink> = (args) => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<ActionLink {...args} />} />
    </Routes>
  </MemoryRouter>
);

export const Default = {
  render: Template,
  args: { children: "Change", href: "#" },
};

export const WithVisuallyHiddenText = {
  render: Template,
  args: {
    children: "Change",
    href: "#",
    visuallyHiddenText: "name",
  },
};

export const WithRouterLink = {
  render: Template,
  args: {
    children: "Change",
    to: "/change",
  },
};
