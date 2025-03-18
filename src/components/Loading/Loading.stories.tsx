import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Loading from "./Loading";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export default {
  title: "ReactComponentLibrary/Loading",
  component: Loading,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} as Meta<typeof Loading>;

const Template: StoryFn<typeof Loading> = (args) => (
  <MemoryRouter>
    <Routes>
      <Route path={"/"} element={<Loading {...args} />} />
    </Routes>
  </MemoryRouter>
);

export const LoadingWithNoMessage = {
  render: Template,
  args: {},
};

export const LoadingWithMessage = {
  render: Template,
  args: { message: "This is a test loading message" },
};

export const LoadingWithHTML = {
  render: Template,
  args: { html: <p>This is a test loading HTML</p> },
};

export const LoadingWithCenteredHTML = {
  render: Template,
  args: {
    html: (
      <p className="govuk-body govuk-!-font-size-80 govuk-!-text-align-centre">
        This is a test loading Centered HTML Message
      </p>
    ),
  },
};
