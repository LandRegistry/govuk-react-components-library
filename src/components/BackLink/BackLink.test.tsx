import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, test, afterEach } from "@jest/globals";
import { MemoryRouter } from "react-router";
import BackLink from "./BackLink";

describe("Card Layout component", () => {
  afterEach(() => {
    cleanup();
  });

  test("displays Back link", () => {
    render(
      <MemoryRouter>
        <BackLink to={{ pathname: "" }} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Back")).toBeTruthy();
  });

  test("includes given link", () => {
    render(
      <MemoryRouter>
        <BackLink
          to={{ pathname: "/test-link", state: { something: "Nice" } }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link").getAttribute("href")).toContain(
      "/test-link",
    );
  });
});
