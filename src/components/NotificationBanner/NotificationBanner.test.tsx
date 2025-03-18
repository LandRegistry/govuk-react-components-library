import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import NotificationBanner from "./NotificationBanner";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/notification-banner/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("NotificationBanner component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for NotificationBanner called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <NotificationBanner
            type={example?.options?.type}
            {...example.options}
          >
            {example?.options?.children}
          </NotificationBanner>
        </MemoryRouter>,
      );

      if (
        example?.options?.children &&
        typeof example?.options?.children === "string"
      ) {
        expect(
          screen.getByText(example?.options?.children as string),
        ).toBeInTheDocument();
      }
    });
  });
});
