import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Table from "./Table";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/table/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const rows = [
  {
    cells: [
      {
        children: "January",
      },
      {
        children: "£85",
        format: "numeric",
      },
      {
        children: "£95",
        format: "numeric",
      },
    ],
  },
  {
    cells: [
      {
        children: "February",
      },
      {
        children: "£75",
        format: "numeric",
      },
      {
        children: "£55",
        format: "numeric",
      },
    ],
  },
  {
    cells: [
      {
        children: "March",
      },
      {
        children: "£165",
        format: "numeric",
      },
      {
        children: "£125",
        format: "numeric",
      },
    ],
  },
];

const caption = "Caption 2: Months and rates";
const head = [
  {
    children: "Month you apply",
  },
  {
    children: "Rate for bicycles",
    format: "numeric",
  },
  {
    children: "Rate for vehicles",
    format: "numeric",
  },
];

const footer = [
  {
    children: "Total",
  },
  {
    children: "£325",
    format: "numeric",
  },
  {
    children: "£275",
    format: "numeric",
  },
];

describe("Table component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Table properly", () => {
    render(
      <Table
        caption={caption}
        captionClassName="govuk-heading-m"
        firstCellIsHeader
        head={head}
        rows={rows}
        footer={footer}
      />,
    );
    expect(screen.getByText(caption)).toBeInTheDocument();
    head.map((row) => {
      expect(screen.getByText(row.children)).toBeInTheDocument();
    });
    rows.map((row) => {
      row.cells.map((cell) => {
        expect(screen.getByText(cell.children)).toBeInTheDocument();
      });
    });
    footer.map((row) => {
      expect(screen.getByText(row.children)).toBeInTheDocument();
    });
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Table called "${example.name}"`, () => {
      render(<Table {...example.options} />);
      if (example.options.caption) {
        expect(screen.getByText(example.options.caption)).toBeInTheDocument();
      }
      if (example.options.head) {
        example.options.head.map((row) => {
          expect(screen.getByText(row.children)).toBeInTheDocument();
        });
      }
      if (example.options.rows) {
        example.options.rows.forEach((row) => {
          row.cells.map((cell) => {
            expect(screen.getByText(cell.children)).toBeInTheDocument();
          });
        });
      }
    });
  });
});
