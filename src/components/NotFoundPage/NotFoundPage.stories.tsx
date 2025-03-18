// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./NotFoundPage.scss";
import { Meta } from "@storybook/react";
import NotFoundPage from "./NotFoundPage";

export default {
  title: "ReactComponentLibrary/Not found page",
  component: NotFoundPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} as Meta<typeof NotFoundPage>;

export const NotFoundPageWithMessage = {
  args: {},
};
