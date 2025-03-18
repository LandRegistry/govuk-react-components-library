import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Header from "./Header";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/header/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { NavigationItem } from "./Header.types";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const navigation: Array<NavigationItem> = [
  {
    active: true,
    children: "Navigation item 1",
    href: "#1",
  },
  {
    children: "Navigation item 2",
    href: "#2",
  },
  {
    children: "Navigation item 3",
    href: "#3",
  },
  {
    children: "Navigation item 4",
    href: "#4",
  },
];

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("Header component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Header properly", () => {
    render(
      <MemoryRouter>
        <Header
          serviceName="Service Name"
          serviceUrlHref="/services"
          navigation={navigation}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "GOV.UK" })).toBeTruthy();
    const service: HTMLElement = screen.getByRole("link", {
      name: "Service Name",
    });
    expect(service).toBeTruthy();
    expect(service.getAttribute("href")).toContain("/services");
    navigation.forEach((nav: NavigationItem) => {
      const navLink: HTMLElement = screen.getByRole("link", {
        name: nav.children,
      });
      expect(navLink).toBeTruthy();
      expect(navLink.getAttribute("href")).toContain(nav.href);
    });
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Header called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <Header {...example.options} />
        </MemoryRouter>,
      );
      if (example.options.serviceName) {
        const service = screen.getByRole("link", {
          name: example.options.serviceName,
        });
        expect(service).toBeTruthy();
        if (example.options.serviceUrlHref) {
          expect(service.getAttribute("href")).toContain(
            example.options.serviceUrlHref,
          );
        }
        if (example.options.navigation) {
          example.options.navigation.forEach((nav) => {
            if (nav.href && typeof nav.children === "string") {
              const navLink = screen.getByRole("link", {
                name: nav.children,
              });
              expect(navLink).toBeTruthy();
              expect(navLink.getAttribute("href")).toContain(nav.href);
            } else if (nav.href && typeof nav.children !== "string") {
              const navLink = screen.getByRole("link", {
                name: nav.children.props.children,
              });
              expect(navLink).toBeTruthy();
              expect(navLink.getAttribute("href")).toContain(nav.href);
            } else {
              expect(screen.getByText(nav.children)).toBeInTheDocument();
            }
          });
        }
      }
    });
  });
});
