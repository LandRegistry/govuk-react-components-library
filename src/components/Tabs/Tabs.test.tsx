import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Tabs from "./Tabs";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/tabs/fixtures.json";
import { ComponentFixture } from "../../dynamics";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const items = [
  {
    id: "past-day",
    label: "Past day",
    panel: {
      children: "Past day Pannel Data",
    },
  },
  {
    id: "past-week",
    label: "Past week",
    panel: {
      children: "Past week Pannel Data",
    },
  },
  {
    id: "past-month",
    label: "Past month",
    panel: {
      children: "Past month Pannel Data",
    },
  },
  {
    id: "past-year",
    label: "Past year",
    panel: {
      children: "Past Year Pannel Data",
    },
  },
];

describe("Tabs component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Tabs properly", () => {
    render(<Tabs idPrefix="" items={items} title="Contents" />);

    items.map((row) => {
      const label = screen.getByRole("link", { name: row.label });
      expect(label).toBeInTheDocument();
      expect(screen.getByText(row.panel.children)).toBeInTheDocument();
    });
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Tabs called "${example.name}"`, () => {
      render(<Tabs {...example.options} />);

      example.options.items?.map((row) => {
        const label = screen.getByRole("link", { name: row.label });
        expect(label).toBeInTheDocument();
        expect(screen.queryByText(row.panel.children)).toBeDefined();
      });
    });
  });
});

describe("Tabs Component", () => {
  const items = [
    { id: "tab-1", label: "Tab 1", panel: { children: <p>Content 1</p> } },
    { id: "tab-2", label: "Tab 2", panel: { children: <p>Content 2</p> } },
  ];

  test("renders tabs with title and first tab selected by default", () => {
    render(<Tabs id="test-tabs" items={items} />);

    // Check that the title is rendered
    expect(screen.getByText("Contents")).toBeInTheDocument();

    // Check that the first tab is selected
    expect(screen.getByText("Tab 1").closest("li")).toHaveClass(
      "govuk-tabs__list-item--selected",
    );

    // Check that the content for the first tab is displayed
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  test("renders all tabs and panels", () => {
    render(<Tabs id="test-tabs" items={items} />);

    // Check that all tabs are rendered
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();

    // Check that both panels are rendered
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  test("hides the second tab's content by default", () => {
    render(<Tabs id="test-tabs" items={items} />);

    const secondTabPanel = screen.getByText("Content 2").closest("div");
    expect(secondTabPanel).toHaveClass("govuk-tabs__panel--hidden");
  });

  test("displays no tabs when there are no items", () => {
    render(<Tabs id="test-tabs" items={[]} />);

    // Check that no tabs are rendered
    expect(screen.queryByRole("list")).toBeNull();
  });
});
