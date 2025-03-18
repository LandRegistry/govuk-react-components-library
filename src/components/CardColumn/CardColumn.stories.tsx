import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import CardColumn from "./CardColumn";

const meta: Meta<typeof CardColumn> = {
  title: "ReactComponentLibrary/Card column",
  component: CardColumn,
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<typeof CardColumn> = (args) => (
  <BrowserRouter>
    <div className="row row-cols-1 row-cols-md-3 govuk-!-margin-bottom-8">
      <CardColumn {...args} />
    </div>
  </BrowserRouter>
);

export const DefaultExample = {
  render: Template,
  args: { link: "#test-link", header: "Test header", body: "Test body" },
};

const Template2: StoryFn<typeof CardColumn> = () => (
  <BrowserRouter>
    <div className="row row-cols-1 row-cols-md-3 govuk-!-margin-bottom-8">
      <CardColumn
        link={"#choose-scanner"}
        header="Scan agricultural credit documents"
        body="Before you scan, you'll need to record the document on the agricultural credits system."
      />
      <CardColumn
        link={"#search"}
        header="Find agricultural credit documents"
        body="You'll need the official number."
      />
      <CardColumn
        link={"#find-land-charges-oversized-plan"}
        header="Find oversized land charge plans"
        body="You'll need the registration date and number."
      />
    </div>
  </BrowserRouter>
);

export const MultipleCardsColumns = {
  render: Template2,
  args: {},
};
