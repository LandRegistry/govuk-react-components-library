import React from "react";
import { Meta, StoryFn } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router";
import LinkWithRef from "./LinkWithRef";

export default {
  title: "React Component Library/Link with ref",
  component: LinkWithRef,
  tags: ["autodocs"],
} as Meta<typeof LinkWithRef>;

const Template: StoryFn<typeof LinkWithRef> = (args) => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<LinkWithRef {...args} />} />
    </Routes>
  </MemoryRouter>
);

export const WithHref = {
  render: Template,
  args: { children: "Plain anchor link", href: "https://www.gov.uk" },
};

export const WithRouterLink = {
  render: Template,
  args: { children: "Client-side routed link", to: "/some-path" },
};
