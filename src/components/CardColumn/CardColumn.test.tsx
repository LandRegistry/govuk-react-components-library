import React from "react";
import CardColumn from "./CardColumn";
import { expect, describe, test, afterEach } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("Card Column component", () => {
  test("displays header and body", () => {
    render(
      <BrowserRouter>
        <CardColumn link={"/test-link"} header="Test header" body="Test body" />
      </BrowserRouter>,
    );
    expect(screen.getByText("Test header")).toBeTruthy();
    expect(screen.getByText("Test body")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Test header" }).getAttribute("href"),
    ).toContain("/test-link");
  });

  test("includes given link", () => {
    render(
      <BrowserRouter>
        <CardColumn link={"/test-link"} header="Test header" body="Test body" />
      </BrowserRouter>,
    );
    expect(screen.getByRole("link").getAttribute("href")).toContain(
      "/test-link",
    );
  });
});
