import React from "react";
import Loading from "./Loading";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, afterEach, describe, test } from "@jest/globals";

describe("Loading component", () => {
  afterEach(() => {
    cleanup();
  });

  test("displays text", () => {
    render(
      <MemoryRouter>
        <Loading message={"Test"} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test")).toBeTruthy();
  });

  test("displays html", () => {
    render(
      <MemoryRouter>
        <Loading html={<p data-testid="passage">Test</p>} />
      </MemoryRouter>,
    );
    const passage = screen.getByTestId("passage").innerHTML;
    expect(passage).toBe("Test");
  });

  test("displays no text if given no text", () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("h2")).toBeFalsy();
  });

  test("displays loading wheel", () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
    );
    const centeredWheelIdentifier = screen.getByTestId(
      "centered-wheel-identifier",
    );
    expect(centeredWheelIdentifier).toBeTruthy();
    const loadingWheel2Identifier = screen.getByTestId(
      "loading-wheel-2-identifier",
    );
    expect(loadingWheel2Identifier).toBeTruthy();
  });
});
