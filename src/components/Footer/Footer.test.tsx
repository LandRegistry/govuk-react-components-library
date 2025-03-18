import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import Footer from "./Footer";
import { extractShownFixtures } from "../../utils/ProcessExampleData";
import fixtures from "govuk-frontend/dist/govuk/components/footer/fixtures.json";
import { ComponentFixture } from "../../dynamics";
import { MemoryRouter } from "react-router";

const examplesFromFixtures: Array<ComponentFixture> =
  extractShownFixtures(fixtures);

const meta = {
  children: [
    "Built by the ",
    <a key="1" className="govuk-footer__link" href="#">
      Government Digital Service
    </a>,
  ],
  items: [
    {
      children: "Help",
      href: "/help",
      reactListKey: "your-stable-key-here-0",
    },
    {
      children: "Cookies",
      href: "/help/cookies",
      reactListKey: "your-stable-key-here-1",
    },
    {
      children: "Contact",
      href: "/contact",
      reactListKey: "your-stable-key-here-2",
    },
    {
      children: "Terms and conditions",
      href: "/help/terms-conditions",
      reactListKey: "your-stable-key-here-3",
    },
    {
      children: "Rhestr o Wasanaethau Cymraeg",
      href: "/cymraeg",
      reactListKey: "your-stable-key-here-4",
    },
  ],
};
const navigation = [
  {
    items: [
      {
        children: "Coronavirus (COVID-19): guidance and support",
        href: "/coronavirus",
      },
    ],
    title: "Coronavirus (COVID-19)",
    width: "two-thirds",
  },
  {
    items: [
      {
        children: "Check what you need to do",
        href: "/brexit",
      },
    ],
    title: "Brexit",
    width: "one-third",
  },
  {
    columns: 2,
    items: [
      {
        children: "Benefits",
        href: "/browse/benefits",
      },
      {
        children: "Births, deaths, marriages and care",
        href: "/browse/births-deaths-marriages",
      },
      {
        children: "Business and self-employed",
        href: "/browse/business",
      },
      {
        children: "Childcare and parenting",
        href: "/browse/childcare-parenting",
      },
      {
        children: "Citizenship and living in the UK",
        href: "/browse/citizenship",
      },
      {
        children: "Crime, justice and the law",
        href: "/browse/justice",
      },
      {
        children: "Disabled people",
        href: "/browse/disabilities",
      },
      {
        children: "Driving and transport",
        href: "/browse/driving",
      },
      {
        children: "Education and learning",
        href: "/browse/education",
      },
      {
        children: "Employing people",
        href: "/browse/employing-people",
      },
      {
        children: "Environment and countryside",
        href: "/browse/environment-countryside",
      },
      {
        children: "Housing and local services",
        href: "/browse/housing-local-services",
      },
      {
        children: "Money and tax",
        href: "/browse/tax",
      },
      {
        children: "Passports, travel and living abroad",
        href: "/browse/abroad",
      },
      {
        children: "Visas and immigration",
        href: "/browse/visas-immigration",
      },
      {
        children: "Working, jobs and pensions",
        href: "/browse/working",
      },
    ],
    title: "Services and information",
    width: "two-thirds",
  },
  {
    items: [
      {
        children: "How government works",
        href: "/government/how-government-works",
      },
      {
        children: "Departments",
        href: "/government/organisations",
      },
      {
        children: "Worldwide",
        href: "/world",
      },
      {
        children: "Policies",
        href: "/government/policies",
      },
      {
        children: "Publications",
        href: "/government/publications",
      },
      {
        children: "Announcements",
        href: "/government/announcements",
      },
    ],
    title: "Departments and policy",
    width: "one-third",
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

describe("Footer component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render basic Footer properly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Open Government Licence v3.0"),
    ).toBeInTheDocument();
    expect(screen.getByText("© Crown copyright")).toBeInTheDocument();
  });

  test("should render complex Footer properly", () => {
    render(
      <MemoryRouter>
        <Footer meta={meta} navigation={navigation} />
      </MemoryRouter>,
    );
    expect(
      screen.getAllByRole("link", { name: "Government Digital Service" }),
    ).toBeTruthy();
    meta.items.forEach((item) => {
      const ItemLink = screen.getByRole("link", { name: item.children });
      expect(ItemLink).toBeTruthy();
      expect(ItemLink.getAttribute("href")).toEqual(item.href);
    });
    navigation.forEach((nav) => {
      expect(screen.getByRole("heading", { name: nav.title, level: 2 }));
      nav.items.forEach((item) => {
        const ItemLink = screen.getByRole("link", { name: item.children });
        expect(ItemLink).toBeTruthy();
        expect(ItemLink.getAttribute("href")).toEqual(item.href);
      });
    });
    expect(
      screen.getAllByRole("link", { name: "Open Government Licence v3.0" }),
    ).toBeTruthy();
    expect(
      screen.getAllByRole("link", { name: "© Crown copyright" }),
    ).toBeTruthy();
  });

  Object.values(examplesFromFixtures).forEach((example) => {
    test(`Test Fixture for Footer called "${example.name}"`, () => {
      render(
        <MemoryRouter>
          <Footer {...example.options} />
        </MemoryRouter>,
      );
      if (example.options.meta) {
        example.options.meta.items?.forEach((item) => {
          const ItemLink = screen.getByRole("link", { name: item.children });
          expect(ItemLink).toBeTruthy();
          expect(ItemLink.getAttribute("href")).toEqual(item.href);
        });
      }

      if (example.options.navigation) {
        example.options.navigation.items?.forEach((nav) => {
          expect(screen.getByRole("heading", { name: nav.title, level: 2 }));
          nav.items.forEach((item) => {
            const ItemLink = screen.getByRole("link", { name: item.children });
            expect(ItemLink).toBeTruthy();
            expect(ItemLink.getAttribute("href")).toEqual(item.href);
          });
        });
      }
    });
  });
});
