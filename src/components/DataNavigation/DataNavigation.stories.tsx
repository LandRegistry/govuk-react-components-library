// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./DataNavigation.scss";
import { Meta } from "@storybook/react";
import DataNavigation from "./DataNavigation";
import { action } from "@storybook/addon-actions";

export default {
  title: "ReactComponentLibrary/Data navigation",
  component: DataNavigation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: { setDataFocus: action("setDataFocus") },
} as Meta<typeof DataNavigation>;

export const DefaultExample = {
  args: {
    dataId: 8,
    dataDescription: "Data Properties",
  },
};

export const MonthDataNavigator = {
  args: {
    dataId: 9,
    dataDescription: "September 2004",
    nextText: "Next Month",
    previousText: "Previous Month",
  },
};

export const DisabledPrevious = {
  args: {
    ...MonthDataNavigator.args,
    dataId: 10,
    dataDescription: "October 2004",
    previousCondition: true,
  },
};

export const DisabledNext = {
  args: {
    ...MonthDataNavigator.args,
    dataId: 11,
    dataDescription: "November 2004",
    nextCondition: true,
  },
};
