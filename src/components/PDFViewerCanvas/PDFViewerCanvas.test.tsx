import React from "react";
import { render, screen, act } from "@testing-library/react";
import PDFViewerCanvas from "./PDFViewerCanvas";
import { DifferenceNavigation } from "../DifferenceNavigation";
import * as pdfjsLib from "pdfjs-dist/webpack.mjs";

// Mocking necessary modules
jest.mock("pdfjs-dist/webpack.mjs", () => ({
  getDocument: jest.fn(() => ({
    promise: Promise.resolve({
      numPages: 5,
      getPage: jest.fn((pageNum) =>
        Promise.resolve({
          pageNum,
          getViewport: () => ({
            width: 600,
            height: 800,
            scale: 1,
          }),
          render: jest.fn(() => ({ promise: Promise.resolve() })),
        }),
      ),
    }),
  })),
}));

jest.mock("../DifferenceNavigation", () => ({
  DifferenceNavigation: jest.fn(() => (
    <div data-testid="difference-navigation">Mock Navigation</div>
  )),
}));

jest.mock("../Loading", () => ({
  Loading: jest.fn(() => <div data-testid="loading">Loading...</div>),
}));

beforeAll(() => {
  console.groupCollapsed = jest.fn();
  console.info = jest.fn();
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  console.groupEnd = jest.fn();
});

describe("PDFViewerCanvas", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading component initially", async () => {
    render(<PDFViewerCanvas src="test.pdf" documentName="Test PDF" />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders canvas and elements after loading", async () => {
    await act(async () => {
      render(<PDFViewerCanvas src="test.pdf" documentName="Test PDF" />);
    });

    expect(screen.getByTestId("viewer")).toBeInTheDocument();
    expect(screen.getByTestId("viewer").tagName).toBe("CANVAS");
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  test("renders navigation when there are multiple pages", async () => {
    await act(async () => {
      render(
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          showNavigation
        />,
      );
    });

    expect(screen.getByTestId("difference-navigation")).toBeInTheDocument();
  });

  test("does not render navigation when there is only one page", async () => {
    (pdfjsLib.getDocument as jest.Mock).mockReturnValueOnce({
      promise: Promise.resolve({
        numPages: 1,
        getPage: jest.fn((pageNum) =>
          Promise.resolve({
            pageNum,
            getViewport: () => ({ width: 600, height: 800, scale: 1 }),
            render: jest.fn(() => ({ promise: Promise.resolve() })),
          }),
        ),
      }),
    });

    await act(async () => {
      render(
        <PDFViewerCanvas src="singlePage.pdf" documentName="Single Page PDF" />,
      );
    });

    expect(
      screen.queryByTestId("difference-navigation"),
    ).not.toBeInTheDocument();
  });

  test("calls setDifferenceFocus when navigating to another page", async () => {
    await act(async () => {
      render(
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          showNavigation
        />,
      );
    });

    const mockNavigation = screen.getByTestId("difference-navigation");
    expect(mockNavigation).toBeInTheDocument();

    // Check that DifferenceNavigation was called with the correct props
    expect(DifferenceNavigation).toHaveBeenCalled();
    const callArgs = (DifferenceNavigation as jest.Mock).mock.calls[0][0];
    expect(callArgs).toHaveProperty("differenceId");
    expect(callArgs).toHaveProperty("setDifferenceFocus");
    expect(callArgs).toHaveProperty("totalDifferences");
    expect(callArgs).toHaveProperty("keyword", "page");
    expect(callArgs).toHaveProperty("plural", "Pages");
    expect(typeof callArgs.setDifferenceFocus).toBe("function");
  });

  test("handles errors during PDF loading", async () => {
    (pdfjsLib.getDocument as jest.Mock).mockReturnValueOnce({
      promise: Promise.reject(new Error("Error loading PDF")),
    });

    await act(async () => {
      render(<PDFViewerCanvas src="invalid.pdf" documentName="Invalid PDF" />);
    });

    expect(screen.queryByTestId("viewer")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        `There was an error loading the PDF document called "Invalid PDF".`,
      ),
    ).toBeInTheDocument();
  });

  test("handles errors during PDF loading without document name", async () => {
    (pdfjsLib.getDocument as jest.Mock).mockReturnValueOnce({
      promise: Promise.reject(new Error("Error loading PDF")),
    });

    await act(async () => {
      render(<PDFViewerCanvas src="invalid.pdf" />);
    });

    expect(screen.queryByTestId("viewer")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(
      screen.getByText(`There was an error loading the PDF document.`),
    ).toBeInTheDocument();
  });
});
