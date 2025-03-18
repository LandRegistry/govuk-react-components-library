import React from "react";
import "./WarningInfo.scss";
import { StoryFn, Meta } from "@storybook/react";
import WarningInfo from "./WarningInfo";
import { MemoryRouter, Routes } from "react-router";
import { Route } from "react-router-dom";

export default {
  title: "ReactComponentLibrary/Warning info",
  component: WarningInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} as Meta<typeof WarningInfo>;

const Template: StoryFn<typeof WarningInfo> = (args) => (
  <MemoryRouter>
    <Routes>
      <Route path={"/"} element={<WarningInfo {...args} />} />
    </Routes>
  </MemoryRouter>
);

export const WarningInfoWithMessage = {
  render: Template,
  args: { message: "This is a test WarningInfo message" },
};

export const WarningInfoWithMessageHeading = {
  render: Template,

  args: {
    ...WarningInfoWithMessage.args,
    messageHeading: "This the Message Heading",
  },
};

export const WarningInfoWithAdvice = {
  render: Template,

  args: {
    ...WarningInfoWithMessageHeading.args,
    advice: "Never Give up ever",
  },
};

export const WarningInfoWithServiceName = {
  render: Template,

  args: {
    ...WarningInfoWithAdvice.args,
    applicationName: "React Component Library",
  },
};

export const WarningInfoWithRoute = {
  render: Template,

  args: {
    ...WarningInfoWithServiceName.args,
    applicationRoute: "/the-application-route",
  },
};

export const WarningInfoWithDifferentBasePageName = {
  render: Template,

  args: {
    ...WarningInfoWithServiceName.args,
    basePageName: "start page",
  },
};
