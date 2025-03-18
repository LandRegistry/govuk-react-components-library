import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import CookieBanner from "./CookieBanner";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/cookie-banner/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";
import { renderToString } from "react-dom/server";
import {
  CookieBannerMessageAction,
  CookieBannerMessageItem,
} from "./CookieBanner.types";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

describe("CookieBanner component", () => {
  afterEach(() => {
    cleanup();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for CookieBanner called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <CookieBanner
            messages={example?.options?.messages}
            {...example.options}
          />
        </MemoryRouter>,
      );

      example?.options?.messages.forEach((item: CookieBannerMessageItem) => {
        if (item.headingChildren) {
          if (typeof item.headingChildren === "string") {
            expect(screen.getByText(item.headingChildren)).toBeInTheDocument();
          } else {
            item.headingChildren.forEach((childItem) => {
              const stringHeading = renderToString(childItem);
              const strippedHtml = stringHeading.replace(/<[^>]+>/g, "").trim();
              expect(screen.getByText(strippedHtml)).toBeInTheDocument();
            });
          }
        }

        if (item.children && typeof item.children === "string") {
          expect(screen.getByText(item.children as string)).toBeInTheDocument();
        }
        if (item.actions) {
          item.actions.forEach((action: CookieBannerMessageAction) => {
            if (action.children) {
              const roleType =
                action.type === "button" || action.type === "submit"
                  ? "button"
                  : "link";
              const roleToCapture = screen.getAllByRole(roleType, {
                name: action.children as string,
              });
              expect(roleToCapture).toBeTruthy();
            }
          });
        }
      });
    });
  });
});
