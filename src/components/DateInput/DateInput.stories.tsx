// THIS FILE IS AUTO-GENERATED — do not edit manually.
// Source: node_modules/govuk-frontend/dist/govuk/components/date-input/fixtures.json
// Regenerate: npm run generate-stories

import React from "react";
import "./DateInput.scss";
import DateInput from "./DateInput";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/date-input/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
const meta: Meta<typeof DateInput> = {
  title: "GOVUK Design System/Date input",
  component: DateInput,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// extractShownFixtures transforms raw govuk-frontend fixture data into
// React-compatible props (e.g. text → children, classes → className).
const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

export const Default: Story = {
  name: "default",
  args: { ...examplesFromFixtures.find((f) => f.name === "default")?.options },
};

export const WithTranslations: Story = {
  name: "with translations",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with translations")
      ?.options,
  },
};

export const WithValues: Story = {
  name: "with values",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with values")?.options,
  },
};

export const WithValuesAndNamePrefix: Story = {
  name: "with values and name prefix",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with values and name prefix",
    )?.options,
  },
};

export const WithValuesNamePrefixAndCustomNames: Story = {
  name: "with values, name prefix and custom names",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with values, name prefix and custom names",
    )?.options,
  },
};

export const DayAndMonth: Story = {
  name: "day and month",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "day and month")?.options,
  },
};

export const DayAndMonthUsingItems: Story = {
  name: "day and month (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "day and month (using items)",
    )?.options,
  },
};

export const MonthAndYear: Story = {
  name: "month and year",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "month and year")?.options,
  },
};

export const MonthAndYearUsingItems: Story = {
  name: "month and year (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "month and year (using items)",
    )?.options,
  },
};

export const WithErrorsOnly: Story = {
  name: "with errors only",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with errors only")?.options,
  },
};

export const WithErrorsOnlyUsingClasses: Story = {
  name: "with errors only (using classes)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with errors only (using classes)",
    )?.options,
  },
};

export const WithErrorsOnlyUsingItems: Story = {
  name: "with errors only (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with errors only (using items)",
    )?.options,
  },
};

export const WithErrorsOnlyUsingItemsAndClasses: Story = {
  name: "with errors only (using items and classes)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with errors only (using items and classes)",
    )?.options,
  },
};

export const WithErrorMessageAndHint: Story = {
  name: "with error message and hint",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with error message and hint",
    )?.options,
  },
};

export const WithErrorMessageAndHintUsingItems: Story = {
  name: "with error message and hint (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with error message and hint (using items)",
    )?.options,
  },
};

export const WithErrorOnDayInput: Story = {
  name: "with error on day input",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with error on day input")
      ?.options,
  },
};

export const WithErrorOnDayInputUsingItems: Story = {
  name: "with error on day input (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with error on day input (using items)",
    )?.options,
  },
};

export const WithErrorOnMonthInput: Story = {
  name: "with error on month input",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with error on month input")
      ?.options,
  },
};

export const WithErrorOnMonthInputUsingItems: Story = {
  name: "with error on month input (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with error on month input (using items)",
    )?.options,
  },
};

export const WithErrorOnYearInput: Story = {
  name: "with error on year input",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with error on year input")
      ?.options,
  },
};

export const WithErrorOnYearInputUsingItems: Story = {
  name: "with error on year input (using items)",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with error on year input (using items)",
    )?.options,
  },
};

export const WithItems: Story = {
  name: "with items",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with items")?.options,
  },
};
