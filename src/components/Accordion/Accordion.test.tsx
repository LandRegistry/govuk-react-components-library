import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Accordion from "./Accordion";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/accordion/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { AccordionItem } from "./Accordion.types";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Accordion component", () => {
  afterEach(() => {
    cleanup();
  });

  const items: AccordionItem[] = [
    {
      content: {
        children: [
          <p key="0" className="govuk-body">
            We need to know your nationality so we can work out which elections
            you&apos;re entitled to vote in. If you cannot provide your
            nationality, you&apos;ll have to send copies of identity documents
            through the post.
          </p>,
          <ul key="1" className="govuk-list govuk-list--bullet">
            <li>Example item 1</li>
          </ul>,
        ],
      },
      heading: {
        children: "Test",
      },
      summary: {
        children: "Additional description",
      },
    },
    {
      content: {
        children: [
          <ul key="0" className="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>,
        ],
      },
      heading: {
        children: "Test 2",
      },
      summary: {
        children: [
          <span key="0" className="govuk-!-font-weight-regular">
            Additional description (wrapped in span)
          </span>,
        ],
      },
    },
  ];

  test("Displays all attributes correctly", () => {
    render(<Accordion id="with-descriptions" items={items} />);
    expect(screen.getByText("Example item 1")).toBeInTheDocument();
    const countItemsWithHeader = items.filter((item) => item?.heading).length;
    expect(screen.getAllByRole("heading", { level: 2 }).length).toEqual(
      countItemsWithHeader,
    );
  });

  test("Allows for undefined items and not break the component", () => {
    render(<Accordion id="with-descriptions" items={[...items, undefined]} />);
    expect(screen.getByText("Example item 1")).toBeInTheDocument();
    const countItemsWithHeader = items.filter((item) => item?.heading).length;
    expect(screen.getAllByRole("heading", { level: 2 }).length).toEqual(
      countItemsWithHeader,
    );
  });

  test("Changes and displays Header Level if specified", () => {
    render(
      <Accordion id="with-descriptions" headingLevel="h3" items={items} />,
    );
    expect(screen.getByText("Example item 1")).toBeInTheDocument();
    const countItemsWithHeader = items.filter((item) => item?.heading).length;
    expect(screen.getAllByRole("heading", { level: 3 }).length).toEqual(
      countItemsWithHeader,
    );
  });

  test("Expands all the items in the accordion", () => {
    const newItems = items.map((item) => {
      return { ...item, expanded: true };
    });
    render(<Accordion id="with-descriptions" items={newItems} />);
    expect(screen.getByText("Example item 1")).toBeInTheDocument();
    const countItemsWithHeader = items.filter((item) => item?.heading).length;
    expect(screen.getAllByRole("heading", { level: 2 }).length).toEqual(
      countItemsWithHeader,
    );
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Accordion called "${example.name}"`, () => {
      render(<Accordion {...example.options} />);
      example.options.items.forEach((item: AccordionItem) => {
        expect(
          screen.getByText(item.heading.children as string),
        ).toBeInTheDocument();
      });
      const countItemsWithHeader = example.options.items.filter(
        (item: AccordionItem) => item?.heading,
      ).length;
      expect(screen.getAllByRole("heading").length).toEqual(
        countItemsWithHeader,
      );
    });
  });
});
