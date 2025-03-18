import React, { JSX } from "react";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { expect, describe, test, beforeEach } from "@jest/globals";
import NotFoundPage from "./NotFoundPage";

const DashboardPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <h2>Use this service to:</h2>
    </div>
  );
};

describe("Not Found 404 page", () => {
  beforeEach(() => {});

  test("invalid path should redirect to 404", async () => {
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <NotFoundPage />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Use this service to:")).not.toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("If you typed the web address, check it is correct."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "If you pasted the web address, check you copied the entire address.",
      ),
    ).toBeInTheDocument();
  });

  test("valid path should not redirect to 404", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <DashboardPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Use this service to:")).toBeInTheDocument();
    expect(screen.queryByText("Page not found")).not.toBeInTheDocument();
    expect(
      screen.queryByText("If you typed the web address, check it is correct."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "If you pasted the web address, check you copied the entire address.",
      ),
    ).not.toBeInTheDocument();
  });
});
