import React from "react";
import CardLayout from "./CardLayout";
import CardLayoutProps from "./CardLayout.types";
import { expect, describe, test, afterEach } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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
});
