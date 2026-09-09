import React from "react";
import { Meta, StoryFn } from "@storybook/react-vite";
import Boolean from "./Boolean";

export default {
  title: "React Component Library/Boolean",
  component: Boolean,
  tags: ["autodocs"],
} as Meta<typeof Boolean>;

const Template: StoryFn<typeof Boolean> = (args) => <Boolean {...args} />;

export const Checkboxes = {
  render: Template,
  args: {
    controlType: "checkboxes",
    name: "waste",
    idPrefix: "waste",
    fieldset: {
      legend: {
        children: "Which types of waste do you carry?",
        isPageHeading: false,
      },
    },
    hint: { children: "Select all that apply." },
    items: [
      { value: "carcasses", children: "Waste from animal carcasses" },
      { value: "mines", children: "Waste from mines or quarries" },
      { value: "farm", children: "Farm or agricultural waste" },
    ],
  },
};

export const Radios = {
  render: Template,
  args: {
    controlType: "radios",
    name: "colour",
    idPrefix: "colour",
    fieldset: {
      legend: {
        children: "What is your favourite colour?",
        isPageHeading: false,
      },
    },
    items: [
      { value: "red", children: "Red" },
      { value: "green", children: "Green" },
      { value: "blue", children: "Blue" },
    ],
  },
};

export const WithHintAndError = {
  render: Template,
  args: {
    ...Checkboxes.args,
    errorMessage: { children: "Select the type of waste you carry" },
  },
};
