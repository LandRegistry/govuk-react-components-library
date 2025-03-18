import React from "react";
import { MemoryRouter, Routes } from "react-router";
import { Route } from "react-router-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  expect,
  afterEach,
  describe,
  test,
  beforeAll,
  beforeEach,
  jest,
} from "@jest/globals";
import ProblemWithService from "./ProblemWithService";

let message: string | undefined;
let historyMessage: string | undefined;
let historyLocation: unknown | undefined;
let windowLocation: Location | undefined;
let applicationName: string | undefined;

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h2>Use this service to:</h2>
    </div>
  );
};

beforeAll(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

function renderWithRouterMatch({
  path = "/error",
  route = "/error",
}: { path?: string; route?: string } = {}) {
  const myInitialEntries = [
    {
      pathname: route,
      state: {
        message: historyMessage,
        location: historyLocation,
        applicationName: applicationName,
      },
    },
  ];
  render(
    <MemoryRouter initialEntries={myInitialEntries}>
      <Routes>
        <Route path={"/"} element={<DashboardPage />} />
        <Route path={path} element={<ProblemWithService message={message} />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("The Problem with service page", () => {
  beforeEach(() => {
    message = undefined;
    historyMessage = undefined;
    historyLocation = undefined;
    applicationName = undefined;
  });

  afterEach(() => {
    cleanup();
  });

  test("can render correctly", () => {
    renderWithRouterMatch();
    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
    expect(
      screen.getByText("Document and plan retrieval system"),
    ).toBeInTheDocument();
    expect(screen.getByText(/If the problem continues/i)).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: "contact support (Opens in a new window or tab)",
    });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toEqual(
      "http://marval-live/MSMselfservice/AutoGen.aspx?page=1268",
    );
    expect(link.target).toEqual("_blank");
  });

  test("can render message correctly", () => {
    message = "This is a test Problem with service message";
    renderWithRouterMatch();
    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
    expect(
      screen.getByText("Document and plan retrieval system"),
    ).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("can render application name correctly", () => {
    applicationName = "New UI Application";
    renderWithRouterMatch();
    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
    expect(screen.getByText(applicationName)).toBeInTheDocument();
  });

  test("can render home page when the link is clicked", async () => {
    windowLocation = window.location;
    delete window.location;
    window.location = {
      pathname: "/",
      reload: jest.fn(),
    } as Location;
    message = "This is a test Problem with service message the second";
    renderWithRouterMatch();
    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
    expect(
      screen.getByText("Document and plan retrieval system"),
    ).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("link", {
        name: "Document and plan retrieval system",
      }),
    );
    expect(await screen.findByText("Use this service to:")).toBeInTheDocument();
    window.location = windowLocation;
  });

  test("stops reload if route is not base path", async () => {
    windowLocation = window.location;
    delete window.location;
    window.location = {
      pathname: "/test-url",
      reload: jest.fn(),
    } as Location;
    message = "This is a test Problem with service message the second";
    renderWithRouterMatch();
    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
    expect(
      screen.getByText("Document and plan retrieval system"),
    ).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("link", {
        name: "Document and plan retrieval system",
      }),
    );
    expect(await screen.findByText("Use this service to:")).toBeInTheDocument();
    expect(window.location.reload).not.toHaveBeenCalled();
    window.location = windowLocation;
  });
});

describe("ProblemWithService", () => {
  const defaultProps = {
    message: "Test error message",
    applicationName: "Test Application",
    applicationRoute: "/",
    reportingLink: "http://test-reporting-link.com",
    basePageName: "home page",
  };

  it("renders the default error message and application name", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { state: { message: "Custom error", applicationName: "Custom App" } },
        ]}
      >
        <ProblemWithService {...defaultProps} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Sorry, there is a problem with the service"),
    ).toBeInTheDocument();
    expect(screen.getByText("Custom error")).toBeInTheDocument();
    expect(screen.getByText("Custom App")).toBeInTheDocument();
    // expect(screen.getByText("home page")).toBeInTheDocument();
  });

  it("renders the provided message and application name if no state message exists", () => {
    render(
      <MemoryRouter>
        <ProblemWithService {...defaultProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("Test Application")).toBeInTheDocument();
    // expect(screen.getByText("home page")).toBeInTheDocument();
  });

  it("displays the contact support link with correct href", () => {
    render(
      <MemoryRouter>
        <ProblemWithService {...defaultProps} />
      </MemoryRouter>,
    );

    const supportLink = screen.getByText("contact support").closest("a");
    expect(supportLink).toHaveAttribute("href", defaultProps.reportingLink);
  });

  it("does not render the error message when it's not provided", () => {
    render(
      <MemoryRouter>
        <ProblemWithService message="" applicationName="Test App" />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
