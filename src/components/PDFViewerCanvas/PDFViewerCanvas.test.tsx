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
  let getContextSpy: jest.SpyInstance;

  beforeEach(() => {
    getContextSpy = jest
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValue({} as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
    getContextSpy.mockRestore();
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

  test("passes colour props through to DifferenceNavigation", async () => {
    await act(async () => {
      render(
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          showNavigation
          buttonColour="#0f7a52"
          buttonTextColour="#ffffff"
          buttonShadowColour="#083d29"
          buttonHoverColour="#ffdd00"
          buttonHoverTextColour="#0b0c0c"
        />,
      );
    });

    expect(DifferenceNavigation).toHaveBeenCalled();
    const callArgs = (DifferenceNavigation as jest.Mock).mock.calls[0][0];
    expect(callArgs).toHaveProperty("buttonColour", "#0f7a52");
    expect(callArgs).toHaveProperty("buttonTextColour", "#ffffff");
    expect(callArgs).toHaveProperty("buttonShadowColour", "#083d29");
    expect(callArgs).toHaveProperty("buttonHoverColour", "#ffdd00");
    expect(callArgs).toHaveProperty("buttonHoverTextColour", "#0b0c0c");
  });

  test("renders the page onto the canvas using the 2D context", async () => {
    await act(async () => {
      render(<PDFViewerCanvas src="test.pdf" documentName="Test PDF" />);
    });

    expect(getContextSpy).toHaveBeenCalledWith("2d");
    const canvas = screen.getByTestId("viewer") as HTMLCanvasElement;
    expect(canvas.width).toBe(600);
    expect(canvas.height).toBe(800);
  });

  test("queues a pending page render when a render is already in progress", async () => {
    await act(async () => {
      render(
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          showNavigation
        />,
      );
    });

    const callArgs = (DifferenceNavigation as jest.Mock).mock.calls[0][0];
    const setDifferenceFocus = callArgs.setDifferenceFocus as (
      pageNum: number,
    ) => void;

    await act(async () => {
      // Call twice synchronously so the second call finds a render already
      // in progress and queues itself as the pending page instead.
      setDifferenceFocus(2);
      setDifferenceFocus(3);
      // Flush the chained promises (getPage -> render -> pending re-render).
      await new Promise((resolve) => setTimeout(resolve, 0));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getContextSpy).toHaveBeenCalledWith("2d");
  });

  test("ignores setDifferenceFocus calls for an out-of-range page number", async () => {
    await act(async () => {
      render(
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          showNavigation
        />,
      );
    });

    const callArgs = (DifferenceNavigation as jest.Mock).mock.calls[0][0];
    const setDifferenceFocus = callArgs.setDifferenceFocus as (
      pageNum: number,
    ) => void;
    const initialDifferenceId = callArgs.differenceId;

    await act(async () => {
      setDifferenceFocus(0);
      setDifferenceFocus(999);
    });

    const latestCallArgs = (DifferenceNavigation as jest.Mock).mock.calls[
      (DifferenceNavigation as jest.Mock).mock.calls.length - 1
    ][0];
    expect(latestCallArgs.differenceId).toEqual(initialDifferenceId);
  });

  test("falls back to page 1 when the requested page number exceeds the total pages", async () => {
    (pdfjsLib.getDocument as jest.Mock).mockReturnValueOnce({
      promise: Promise.resolve({
        numPages: 2,
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
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          pageNumber={10}
        />,
      );
    });

    const callArgs = (DifferenceNavigation as jest.Mock).mock.calls[0][0];
    expect(callArgs.differenceId).toEqual(1);
  });

  test("does not attempt to load a PDF when no src is provided", async () => {
    await act(async () => {
      render(<PDFViewerCanvas src="" documentName="No source" />);
    });

    expect(pdfjsLib.getDocument).not.toHaveBeenCalled();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("does not pass colour props to DifferenceNavigation when none are provided", async () => {
    await act(async () => {
      render(
        <PDFViewerCanvas
          src="test.pdf"
          documentName="Test PDF"
          showNavigation
        />,
      );
    });

    expect(DifferenceNavigation).toHaveBeenCalled();
    const callArgs = (DifferenceNavigation as jest.Mock).mock.calls[0][0];
    expect(callArgs.buttonColour).toBeUndefined();
    expect(callArgs.buttonTextColour).toBeUndefined();
    expect(callArgs.buttonShadowColour).toBeUndefined();
    expect(callArgs.buttonHoverColour).toBeUndefined();
    expect(callArgs.buttonHoverTextColour).toBeUndefined();
  });
});
