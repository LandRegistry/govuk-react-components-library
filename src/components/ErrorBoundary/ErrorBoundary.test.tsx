import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, afterEach, describe, test, jest } from "@jest/globals";
import ErrorBoundary from "./ErrorBoundary";

const ThrowError: React.FC = () => {
  throw new Error("Test");
};

describe("The Error Boundary component", () => {
  afterEach((): void => {
    cleanup();
  });

  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  test("displays ProblemWithService page if error is thrown", () => {
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalled();
  });

  test("renders error message from caught error", () => {
    const ThrowError = () => {
      throw new Error("Test error message");
    };

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    // Verify that the message is passed down (if message rendering is implemented in ProblemWithService)
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
