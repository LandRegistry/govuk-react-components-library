import React from "react";
import "./Pagination.scss";
import { Meta } from "@storybook/react-vite";
import Pagination from "./Pagination";
import { action } from "storybook/actions";
// import fixtures from "govuk-frontend/dist/govuk/components/pagination/fixtures.json";

export default {
  title: "GOVUK Design System/Pagination",
  component: Pagination,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: { onPageChange: action("on-click") },
} as Meta<typeof Pagination>;

export const DefaultExample = {
  args: {
    currentPage: 3,
    totalCount: 150,
    pageSize: 25,
  },
};

export const startExample = {
  args: {
    currentPage: 1,
    totalCount: 150,
    pageSize: 25,
  },
};

export const endExample = {
  args: {
    currentPage: 6,
    totalCount: 150,
    pageSize: 25,
  },
};

export const ChangePreviousTextToBack = {
  args: {
    ...startExample.args,
    previousName: "Back",
  },
};

export const ChangeNextTextToForward = {
  args: {
    ...endExample.args,
    nextName: "Forward",
  },
};

export const AddPreviousChildren = {
  args: {
    ...startExample.args,
    previousName: "Back",
    previousChildren: (
      <span className="govuk-pagination__link-label">
        Applying for a provisional lorry or bus licence
      </span>
    ),
  },
};

export const AddNextChildren = {
  args: {
    ...endExample.args,
    nextName: "Forward",
    nextChildren: (
      <span className="govuk-pagination__link-label">
        Driver CPC part 1 test: theory
      </span>
    ),
  },
};
