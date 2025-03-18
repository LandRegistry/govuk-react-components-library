import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "@jest/globals";
import { MemoryRouter } from "react-router";
import Main from "./Main";

afterEach(() => {
  cleanup();
});

test("Main component has Back button when given url", () => {
  render(
    <MemoryRouter>
      <Main backLink="/check-record" />
    </MemoryRouter>,
  );
  expect(screen.getByText("Back")).toBeTruthy();
});

test("Main component does not have Back button when no URL is given", () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>,
  );
  expect(screen.queryByText("Back")).toBeNull();
});

describe("Main Component", () => {
  // Mock BackLink component
  jest.mock("../BackLink/BackLink", () => ({
    __esModule: true,
    default: ({ to, state }: { to: { pathname: string }; state: unknown }) => (
      <div>
        Mocked BackLink - Pathname: {to.pathname}, State:{" "}
        {JSON.stringify(state)}
      </div>
    ),
  }));
  test("renders children correctly", () => {
    render(
      <Main>
        <p>Test Children</p>
      </Main>,
    );

    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  test("renders BackLink when backLink is provided", () => {
    render(
      <MemoryRouter>
        <Main backLink="/test-backlink" backLinkState={{ from: "previous" }}>
          <p>Test Children</p>
        </Main>
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
  });

  test("does not render BackLink when backLink is not provided", () => {
    render(
      <Main>
        <p>Test Children</p>
      </Main>,
    );

    expect(screen.queryByText(/Mocked BackLink/)).not.toBeInTheDocument();
  });

  test("main content is rendered with correct ID and data-testid", () => {
    render(
      <Main>
        <p>Test Children</p>
      </Main>,
    );

    const mainContent = screen.getByTestId("main-content");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent.id).toBe("main-content");
  });
});
