// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import "./DifferenceNavigation.scss";
import { Meta } from "@storybook/react-vite";
import DifferenceNavigation from "./DifferenceNavigation";
import { action } from "storybook/actions";

export default {
  title: "ReactComponentLibrary/Difference navigation",
  component: DifferenceNavigation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: { setDifferenceFocus: action("setDifferenceFocus") },
} as Meta<typeof DifferenceNavigation>;

export const DefaultExample = {
  args: {
    differenceId: 2,
    totalDifferences: 5,
  },
};

export const ifDifferenceIs1ThenPreviousButtonIsDisable = {
  args: {
    ...DefaultExample.args,
    differenceId: 1,
  },
};

export const ifDifferenceIsLastThenNextButtonIsDisable = {
  args: {
    ...DefaultExample.args,
    differenceId: 5,
  },
};

export const DifferenceTotalIsZero = {
  args: {
    differenceId: 0,
    totalDifferences: 0,
  },
};

export const NameOfNavigationChanges = {
  args: {
    differenceId: 3,
    totalDifferences: 5,
    keyword: "change",
    plural: "changes",
  },
};
