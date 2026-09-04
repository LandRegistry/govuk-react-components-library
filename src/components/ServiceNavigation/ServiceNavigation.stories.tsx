// THIS FILE IS AUTO-GENERATED — do not edit manually.
// Source: node_modules/govuk-frontend/dist/govuk/components/service-navigation/fixtures.json
// Regenerate: npm run generate-stories

import React from "react";
import "./ServiceNavigation.scss";
import ServiceNavigation from "./ServiceNavigation";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/service-navigation/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
const meta: Meta<typeof ServiceNavigation> = {
  title: "GOVUK Design System/Service navigation",
  component: ServiceNavigation,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ServiceNavigation>;

// extractShownFixtures transforms raw govuk-frontend fixture data into
// React-compatible props (e.g. text → children, classes → className).
const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

export const Default: Story = {
  name: "default",
  args: { ...examplesFromFixtures.find((f) => f.name === "default")?.options },
};

export const WithNavigationWithACurrentItem: Story = {
  name: "with navigation with a current item",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with navigation with a current item",
    )?.options,
  },
};

export const WithLargeNavigation: Story = {
  name: "with large navigation",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with large navigation")
      ?.options,
  },
};

export const WithHTMLNavigationItems: Story = {
  name: "with HTML navigation items",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with HTML navigation items")
      ?.options,
  },
};

export const WithNonLinkNavigationItems: Story = {
  name: "with non-link navigation items",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with non-link navigation items",
    )?.options,
  },
};

export const WithServiceName: Story = {
  name: "with service name",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with service name")
      ?.options,
  },
};

export const WithServiceLink: Story = {
  name: "with service link",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with service link")
      ?.options,
  },
};

export const WithLongServiceName: Story = {
  name: "with long service name",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with long service name")
      ?.options,
  },
};

export const WithServiceNameAndNavigation: Story = {
  name: "with service name and navigation",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with service name and navigation",
    )?.options,
  },
};

export const Inverse: Story = {
  name: "inverse",
  args: { ...examplesFromFixtures.find((f) => f.name === "inverse")?.options },
};

export const WithCollapseNavigationOnMobileSetToFalse: Story = {
  name: "with collapseNavigationOnMobile set to false",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with collapseNavigationOnMobile set to false",
    )?.options,
  },
};

export const WithASingleNavigationItem: Story = {
  name: "with a single navigation item",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with a single navigation item",
    )?.options,
  },
};

export const WithASingleNavigationItemAndCollapseNavigationOnMobileSetToTrue: Story =
  {
    name: "with a single navigation item and collapseNavigationOnMobile set to true",
    args: {
      ...examplesFromFixtures.find(
        (f) =>
          f.name ===
          "with a single navigation item and collapseNavigationOnMobile set to true",
      )?.options,
    },
  };

export const WithLanguageNavigation: Story = {
  name: "with language navigation",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with language navigation")
      ?.options,
  },
};

export const WithRightAlignedLanguageNavigation: Story = {
  name: "with right-aligned language navigation",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "with right-aligned language navigation",
    )?.options,
  },
};

export const InverseWithLanguageNavigation: Story = {
  name: "inverse with language navigation",
  args: {
    ...examplesFromFixtures.find(
      (f) => f.name === "inverse with language navigation",
    )?.options,
  },
};

export const WithInlineEndSlot: Story = {
  name: "with `inline` end slot",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "with `inline` end slot")
      ?.options,
  },
};
