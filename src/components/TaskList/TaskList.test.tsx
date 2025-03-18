import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import TaskList from "./TaskList";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/task-list/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";
import { renderToString } from "react-dom/server";
import { TaskListItemProps } from "./TaskList.types";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

function checkHtmlAndString(objectToCheck: unknown) {
  if (objectToCheck) {
    if (typeof objectToCheck === "string") {
      expect(screen.getAllByText(objectToCheck).length).toBeGreaterThanOrEqual(
        1,
      );
    } else {
      objectToCheck.forEach((childItem) => {
        const stringHeading = renderToString(childItem);
        const strippedHtml = stringHeading.replace(/<[^>]+>/g, "").trim();
        expect(screen.getByText(strippedHtml)).toBeInTheDocument();
      });
    }
  }
}

describe("TaskList component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for TaskList called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <TaskList items={example?.options?.items} {...example.options} />
        </MemoryRouter>,
      );

      example?.options?.items.forEach((item: TaskListItemProps) => {
        if (item) {
          checkHtmlAndString(item.title.children);
          checkHtmlAndString(item.hint?.children);
          checkHtmlAndString(item.status?.children);
          checkHtmlAndString(item.status?.tag?.children);
        }
      });
    });
  });
});
