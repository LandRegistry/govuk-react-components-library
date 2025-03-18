import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Breadcrumbs from "./Breadcrumbs";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/breadcrumbs/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { BreadcrumbItem } from "./Breadcrumbs.types";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("Breadcrumbs component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Breadcrumbs called "${example.name}"`, () => {
      render(<Breadcrumbs {...example.options} />);
      const countItemsWithHeader = example.options.items.filter(
        (item: BreadcrumbItem) => item?.href,
      ).length;
      expect(screen.getAllByRole("link").length).toEqual(countItemsWithHeader);
    });
  });
});
