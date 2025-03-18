import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import SummaryList from "./SummaryList";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/summary-list/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const rows = [
  {
    actions: {
      items: [
        {
          children: "Edit",
          href: "#",
          visuallyHiddenText: "name",
          className: "summary-actions",
        },
        {
          children: "Delete",
          href: "#",
          visuallyHiddenText: "name",
          className: "summary-actions",
        },
      ],
    },
    key: {
      children: "Name",
    },
    value: {
      children: "First-name Last-name",
    },
  },
  {
    key: {
      children: "Date of birth",
    },
    value: {
      children: "13/08/1980",
    },
  },
  {
    key: {
      children: "Contact information",
    },
    value: {
      children: [
        <p key="0" className="govuk-body">
          email@email.com
        </p>,
        <p key="1" className="govuk-body">
          Address line 1<br />
          Address line 2<br />
          Address line 3<br />
          Address line 4<br />
          Address line 5
        </p>,
      ],
    },
  },
];

describe("SummaryList component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic SummaryList properly", () => {
    render(
      <MemoryRouter>
        <SummaryList className="my-oh-my" rows={rows} />
      </MemoryRouter>,
    );
    rows.map((row) => {
      expect(screen.getByText(row.key.children)).toBeInTheDocument();
    });
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for SummaryList called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <SummaryList {...example.options} />
        </MemoryRouter>,
      );
      example.options.rows.forEach((row) => {
        if (typeof row.key.children === "string") {
          expect(screen.getAllByText(row.key.children)).toBeTruthy();
        }
      });
    });
  });
});
