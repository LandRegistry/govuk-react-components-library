import React from "react";
import { StoryFn, Meta } from "@storybook/react-vite";
import { MemoryRouter, Routes } from "react-router";
import { Route } from "react-router-dom";
import Landing from "./Landing";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h2>DashboardPage: Use this service to:</h2>
    </div>
  );
};

const OtherPage: React.FC = () => {
  return (
    <div>
      <h2>OtherPage: Use this service to:</h2>
    </div>
  );
};

export default {
  title: "ReactComponentLibrary/Landing",
  component: Landing,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} as Meta<typeof Landing>;

const Template: StoryFn<typeof Landing> = (args) => (
  <MemoryRouter initialEntries={["/landing"]}>
    <Routes>
      <Route path={"/"} element={<DashboardPage />} />
      <Route path={"/landing"} element={<Landing {...args} />} />
      <Route path={"/other"} element={<OtherPage />} />
    </Routes>
  </MemoryRouter>
);

export const DefaultLanding = {
  render: Template,
  args: {},
};

export const OtherPageLanding = {
  render: Template,
  args: { to: "/other" },
};
