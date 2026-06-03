// THIS FILE IS AUTO-GENERATED — do not edit manually.
// Source: node_modules/govuk-frontend/dist/govuk/components/button/fixtures.json
// Regenerate: npm run generate-stories

import React from "react";
import "./Button.scss";
import Button from "./Button";
import { Meta, StoryObj } from "@storybook/react";
import fixtures from "govuk-frontend/dist/govuk/components/button/fixtures.json";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import { ComponentFixture } from "../../dynamics";
import { ConfigureOverallButton } from "./Button.config";

let configured = false;
const meta: Meta<typeof Button> = {
  title: "GOVUK Design System/Button",
  component: Button,
  decorators: [
    (Story, { parameters }) => {
      React.useEffect(() => {
        const isDocsMode = window.location.search.includes(
          "path=/docs/govuk-design-system-button--docs",
        );
        if (isDocsMode && !configured && parameters.initializeConfigurations) {
          void ConfigureOverallButton();
          configured = true;
        } else if (!isDocsMode) {
          void ConfigureOverallButton();
        }
      }, []);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// extractShownFixtures transforms raw govuk-frontend fixture data into
// React-compatible props (e.g. text → children, classes → className).
const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

export const Default: Story = {
  name: "default",
  args: { ...examplesFromFixtures.find((f) => f.name === "default")?.options },
};

export const DefaultHoverState: Story = {
  name: "default hover state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "default hover state")
      ?.options,
  },
};

export const DefaultActiveState: Story = {
  name: "default active state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "default active state")
      ?.options,
  },
};

export const DefaultFocusState: Story = {
  name: "default focus state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "default focus state")
      ?.options,
  },
};

export const Disabled: Story = {
  name: "disabled",
  args: { ...examplesFromFixtures.find((f) => f.name === "disabled")?.options },
};

export const Link: Story = {
  name: "link",
  args: { ...examplesFromFixtures.find((f) => f.name === "link")?.options },
};

export const Start: Story = {
  name: "start",
  args: { ...examplesFromFixtures.find((f) => f.name === "start")?.options },
};

export const Secondary: Story = {
  name: "secondary",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "secondary")?.options,
  },
};

export const SecondaryHoverState: Story = {
  name: "secondary hover state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "secondary hover state")
      ?.options,
  },
};

export const SecondaryActiveState: Story = {
  name: "secondary active state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "secondary active state")
      ?.options,
  },
};

export const SecondaryFocusState: Story = {
  name: "secondary focus state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "secondary focus state")
      ?.options,
  },
};

export const SecondaryDisabled: Story = {
  name: "secondary disabled",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "secondary disabled")
      ?.options,
  },
};

export const Warning: Story = {
  name: "warning",
  args: { ...examplesFromFixtures.find((f) => f.name === "warning")?.options },
};

export const WarningHoverState: Story = {
  name: "warning hover state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "warning hover state")
      ?.options,
  },
};

export const WarningActiveState: Story = {
  name: "warning active state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "warning active state")
      ?.options,
  },
};

export const WarningFocusState: Story = {
  name: "warning focus state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "warning focus state")
      ?.options,
  },
};

export const WarningDisabled: Story = {
  name: "warning disabled",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "warning disabled")?.options,
  },
};

export const Inverse: Story = {
  name: "inverse",
  args: { ...examplesFromFixtures.find((f) => f.name === "inverse")?.options },
};

export const InverseHoverState: Story = {
  name: "inverse hover state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "inverse hover state")
      ?.options,
  },
};

export const InverseActiveState: Story = {
  name: "inverse active state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "inverse active state")
      ?.options,
  },
};

export const InverseFocusState: Story = {
  name: "inverse focus state",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "inverse focus state")
      ?.options,
  },
};

export const InverseDisabled: Story = {
  name: "inverse disabled",
  args: {
    ...examplesFromFixtures.find((f) => f.name === "inverse disabled")?.options,
  },
};
