import React from "react";
import CardLayout from "./CardLayout";
import CardLayoutProps from "./CardLayout.types";
import { expect, describe, test, afterEach } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { CardColumnProps } from "../CardColumn/CardColumn.types";

afterEach(() => {
  cleanup();
});

const data: CardLayoutProps = {
  cardColumns: [
    {
      link: "#choose-scanner",
      header: "Scan agricultural credit documents",
      body: "Before you scan, you'll need to record the document on the agricultural credits system.",
    },
    {
      link: "#search",
      header: "Find agricultural credit documents",
      body: "You'll need the official number.",
    },
    {
      link: "#find-land-charges-oversized-plan",
      header: "Find oversized land charge plans",
      body: "You'll need the registration date and number.",
    },
  ],
};

describe("Card Layout component", () => {
  test("displays header and body", () => {
    render(
      <BrowserRouter>
        <CardLayout {...data} />
      </BrowserRouter>,
    );
    data.cardColumns.forEach((column: CardColumnProps) => {
      expect(screen.getByText(column.header)).toBeTruthy();
      expect(screen.getByText(column.body)).toBeTruthy();
      expect(
        screen.getByRole("link", { name: column.header }).getAttribute("href"),
      ).toContain(column.link);
    });
  });

  test("does not set colour CSS custom properties on cards when no colour props are provided", () => {
    render(
      <BrowserRouter>
        <CardLayout {...data} />
      </BrowserRouter>,
    );
    data.cardColumns.forEach((column: CardColumnProps) => {
      const card = screen.getByText(column.header).closest(".card");
      expect(card?.getAttribute("style")).toBeNull();
    });
  });

  test("passes textColor and hoverColor down to every CardColumn", () => {
    const colouredData: CardLayoutProps = {
      cardColumns: data.cardColumns.map((card) => ({
        ...card,
        textColor: "#4c2c92",
        hoverColor: "#4c2c92",
      })),
    };

    render(
      <BrowserRouter>
        <CardLayout {...colouredData} />
      </BrowserRouter>,
    );

    colouredData.cardColumns.forEach((column: CardColumnProps) => {
      const card = screen.getByText(column.header).closest(".card");
      expect(card?.getAttribute("style")).toContain(
        "--card-text-color: #4c2c92",
      );
      expect(card?.getAttribute("style")).toContain(
        "--card-hover-color: #4c2c92",
      );
    });
  });

  test("passes different colours to individual CardColumns independently", () => {
    const mixedData: CardLayoutProps = {
      cardColumns: [
        { ...data.cardColumns[0], textColor: "#005ea5", hoverColor: "#005ea5" },
        { ...data.cardColumns[1], textColor: "#4c2c92", hoverColor: "#4c2c92" },
        { ...data.cardColumns[2] },
      ],
    };

    render(
      <BrowserRouter>
        <CardLayout {...mixedData} />
      </BrowserRouter>,
    );

    const firstCard = screen
      .getByText(mixedData.cardColumns[0].header)
      .closest(".card");
    expect(firstCard?.getAttribute("style")).toContain(
      "--card-text-color: #005ea5",
    );

    const secondCard = screen
      .getByText(mixedData.cardColumns[1].header)
      .closest(".card");
    expect(secondCard?.getAttribute("style")).toContain(
      "--card-text-color: #4c2c92",
    );

    const thirdCard = screen
      .getByText(mixedData.cardColumns[2].header)
      .closest(".card");
    expect(thirdCard?.getAttribute("style")).toBeNull();
  });

  test("renders a final partial row when columns don't divide evenly", () => {
    const unevenData: CardLayoutProps = {
      cardColumns: [...data.cardColumns, data.cardColumns[0]],
    };

    render(
      <BrowserRouter>
        <CardLayout {...unevenData} />
      </BrowserRouter>,
    );

    expect(screen.getAllByText(data.cardColumns[0].header)).toHaveLength(2);
  });
});
