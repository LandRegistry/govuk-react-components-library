import React from "react";
import { Route } from "react-router-dom";
import { MemoryRouter, Routes } from "react-router";
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
import WarningInfo from "./WarningInfo";

let messageHeading: string | undefined;
let message: string | undefined;
let historyMessageHeading: string | undefined;
let historyMessage: string | undefined;
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

beforeEach(() => {
  messageHeading = undefined;
  message = undefined;
  historyMessageHeading = undefined;
  historyMessage = undefined;
  applicationName = undefined;
});

afterEach(() => {
  cleanup();
});

function renderWithRouterMatch({
  path = "/warning-info",
  route = "/warning-info",
}: {
  path?: string;
  route?: string;
} = {}) {
  const myInitialEntries = [
    {
      pathname: route,
      state: {
        messageHeading: historyMessageHeading,
        message: historyMessage,
        applicationName: applicationName,
      },
    },
  ];
  render(
    <MemoryRouter initialEntries={myInitialEntries}>
      <Routes>
        <Route path={"/"} element={<DashboardPage />} />
        <Route
          path={path}
          element={
            <WarningInfo messageHeading={messageHeading} message={message} />
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("The Warning Info page", () => {
  test("can render correctly", () => {
    renderWithRouterMatch();
    expect(screen.getByText("Warning or Info Heading")).toBeInTheDocument();
    expect(
      screen.getByText("Warning or Info Heading message"),
    ).toBeInTheDocument();
  });

  test("can render message heading parameter correctly", () => {
    messageHeading = "This is a test Warning or Info Heading";
    renderWithRouterMatch();
    expect(screen.getByText(messageHeading)).toBeInTheDocument();
    expect(
      screen.getByText("Warning or Info Heading message"),
    ).toBeInTheDocument();
  });

  test("can render message parameter correctly", () => {
    message = "This is a test Warning or Info message";
    renderWithRouterMatch();
    expect(screen.getByText("Warning or Info Heading")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("can render location message heading parameter correctly", () => {
    historyMessageHeading =
      "This is a test Warning or Info Heading from history";
    renderWithRouterMatch();
    expect(screen.getByText(historyMessageHeading)).toBeInTheDocument();
    expect(
      screen.getByText("Warning or Info Heading message"),
    ).toBeInTheDocument();
  });

  test("can render location message parameter correctly", () => {
    historyMessage = "This is a test Warning or Info message from history";
    renderWithRouterMatch();
    expect(screen.getByText("Warning or Info Heading")).toBeInTheDocument();
    expect(screen.getByText(historyMessage)).toBeInTheDocument();
  });

  test("can application name parameter correctly", () => {
    applicationName = "New UI Application";
    renderWithRouterMatch();
    expect(screen.getByText("Warning or Info Heading")).toBeInTheDocument();
    expect(screen.getByText(applicationName)).toBeInTheDocument();
  });

  test("can render home page when the link is clicked", async () => {
    windowLocation = window.location;
    delete window.location;
    window.location = {
      pathname: "/",
      reload: jest.fn(),
    } as Location;
    historyMessage = "This is a test Warning or Info message from history";
    renderWithRouterMatch();
    expect(screen.getByText("Warning or Info Heading")).toBeInTheDocument();
    expect(screen.getByText(historyMessage)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("link", {
        name: "Document and plan retrieval system",
      }),
    );
    expect(await screen.findByText("Use this service to:")).toBeInTheDocument();
    expect(window.location.reload).toHaveBeenCalled();
    window.location = windowLocation;
  });

  test("stops reload if route is not base path", async () => {
    windowLocation = window.location;
    delete window.location;
    window.location = {
      pathname: "/test-url",
      reload: jest.fn(),
    } as Location;
    historyMessage = "This is a test Warning or Info message from history";
    renderWithRouterMatch();
    expect(screen.getByText("Warning or Info Heading")).toBeInTheDocument();
    expect(screen.getByText(historyMessage)).toBeInTheDocument();
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
