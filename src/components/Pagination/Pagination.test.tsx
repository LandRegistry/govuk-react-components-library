import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, describe, test, jest, afterEach } from "@jest/globals";
import Pagination from "./Pagination";

const onPageChange = jest.fn();
const PageBatchSize = 150;
const PageSize = 25;
const paginationRange = [1, 2, 3, 4, 5, 6];

describe("Pagination component", () => {
  afterEach(() => {
    cleanup();
  });
  test("should render basic Pagination properly and content is on first page", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={1}
          totalCount={PageBatchSize}
          pageSize={PageSize}
        />
      </>,
    );

    await screen.findByText("Previous");
    const nextNavigation = screen.getByRole("link", { name: "Next" });
    fireEvent.click(nextNavigation);
    expect(onPageChange).toHaveBeenCalledWith(2);
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole("link", { name: "Previous" })).toBeFalsy();
  });

  test("should render basic Pagination properly and content is on 3rd page", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={3}
          totalCount={PageBatchSize}
          pageSize={PageSize}
        />
      </>,
    );

    await screen.findByText("Previous");
    const nextNavigation = screen.getByRole("link", { name: "Next" });
    fireEvent.click(nextNavigation);
    expect(onPageChange).toHaveBeenCalledWith(2);
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole("link", { name: "Previous" })).toBeTruthy();
  });

  test("should render basic Pagination properly and content is on last page", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={6}
          totalCount={PageBatchSize}
          pageSize={PageSize}
        />
      </>,
    );

    await screen.findByText("Previous");
    expect(screen.queryByRole("link", { name: "Previous" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Next" })).toBeFalsy();
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
  });
  test("should not render Pagination if total is lesser than page count", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={1}
          totalCount={PageBatchSize}
          pageSize={200}
        />
      </>,
    );

    expect(screen.queryByText("Previous")).toBeFalsy();
    expect(screen.queryByText("Next")).toBeFalsy();
  });

  test("should render the new previous name is changed to `Back` ", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={1}
          totalCount={PageBatchSize}
          pageSize={PageSize}
          previousName="Back"
        />
      </>,
    );

    await screen.findByText("Back");
    const nextNavigation = screen.getByRole("link", { name: "Next" });
    fireEvent.click(nextNavigation);
    expect(onPageChange).toHaveBeenCalledWith(2);
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole("link", { name: "Back" })).toBeFalsy();
  });

  test("should render the new next name is changed to `Forward`", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={6}
          totalCount={PageBatchSize}
          pageSize={PageSize}
          nextName="Forward"
        />
      </>,
    );

    await screen.findByText("Previous");
    expect(screen.queryByRole("link", { name: "Previous" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Forward" })).toBeFalsy();
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
  });

  test("should render if the new previous name is changed to `Back` and previous children is provided", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={1}
          totalCount={PageBatchSize}
          pageSize={PageSize}
          previousName="Back"
          previousChildren={
            <span className="govuk-pagination__link-label">
              Applying for a provisional lorry or bus licence
            </span>
          }
        />
      </>,
    );

    await screen.findByText("Back");
    const nextNavigation = screen.getByRole("link", { name: "Next" });
    fireEvent.click(nextNavigation);
    expect(onPageChange).toHaveBeenCalledWith(2);
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
    expect(screen.queryByRole("link", { name: "Back" })).toBeFalsy();
    expect(
      screen.getByText("Applying for a provisional lorry or bus licence"),
    ).toBeInTheDocument();
  });

  test("should render if the new next name is changed to `Forward` and next children is provided", async () => {
    render(
      <>
        <Pagination
          onPageChange={onPageChange}
          currentPage={6}
          totalCount={PageBatchSize}
          pageSize={PageSize}
          nextName="Forward"
          nextChildren={
            <span className="govuk-pagination__link-label">
              Driver CPC part 1 test: theory
            </span>
          }
        />
      </>,
    );

    await screen.findByText("Previous");
    expect(screen.queryByRole("link", { name: "Previous" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Forward" })).toBeFalsy();
    paginationRange.forEach((value) => {
      expect(
        screen.getByRole("link", { name: `Page ${value}` }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText("Driver CPC part 1 test: theory"),
    ).toBeInTheDocument();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      onPageChange: jest.fn(),
      totalCount: 100,
      siblingCount: 1,
      currentPage: 1,
      pageSize: 10,
      ...props,
    };
    return render(<Pagination {...defaultProps} />);
  };

  test("renders without crashing", () => {
    setup();
    expect(
      screen.getByRole("navigation", { name: /pagination/i }),
    ).toBeInTheDocument();
  });

  test("calls onPageChange when next button is clicked", () => {
    const onPageChange = jest.fn();
    setup({ currentPage: 1, onPageChange });

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange when previous button is clicked", () => {
    const onPageChange = jest.fn();
    setup({ currentPage: 2, onPageChange });

    fireEvent.click(screen.getByText("Previous"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test("disables previous button on first page", () => {
    setup({ currentPage: 1 });
    const prevButton = screen.getByText("Previous");
    expect(prevButton.closest("a")).toBeNull(); // previous is not a link when disabled
  });

  test("disables next button on last page", () => {
    setup({ currentPage: 10, totalCount: 100 });
    const nextButton = screen.getByText("Next");
    expect(nextButton.closest("a")).toBeNull(); // next is not a link when disabled
  });

  test("renders correct number of pagination items", () => {
    setup({ currentPage: 1, totalCount: 50, pageSize: 10 });
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(1); // ensure pagination items are rendered
  });

  test("renders DOTS when siblingCount is greater than 1", () => {
    setup({ currentPage: 5, totalCount: 130, siblingCount: 2 });
    expect(screen.getAllByText("...").length).toBeGreaterThan(1);
  });
});
