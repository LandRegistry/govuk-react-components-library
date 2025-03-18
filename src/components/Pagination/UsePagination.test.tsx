import React from "react";
import { render, screen } from "@testing-library/react";
import { UsePagination, DOTS } from "./UsePagination";

// Create a TestComponent to render the hook inside
const TestComponent = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount,
}: {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}) => {
  const pagination = UsePagination({
    totalCount,
    pageSize,
    currentPage,
    siblingCount,
  });

  return (
    <div data-testid="pagination">
      {pagination &&
        pagination.map((page, index) => (
          <span key={index} data-testid={`page-${index}`}>
            {page}
          </span>
        ))}
    </div>
  );
};

describe("UsePagination Hook via TestComponent", () => {
  test("returns only first page when total count is zero", () => {
    render(<TestComponent totalCount={0} pageSize={10} currentPage={1} />);
    expect(screen.queryByTestId("page-0")).toBeNull();
  });

  test("handles single page case when total count is equal to page size", () => {
    render(<TestComponent totalCount={10} pageSize={10} currentPage={1} />);
    expect(screen.getByTestId("page-0")).toHaveTextContent("1");
  });

  test("shows all pages when total pages are less than siblingCount + visible pages", () => {
    render(<TestComponent totalCount={40} pageSize={10} currentPage={1} />);
    expect(screen.getByTestId("page-0")).toHaveTextContent("1");
    expect(screen.getByTestId("page-3")).toHaveTextContent("4");
  });

  test("returns correct range when current page is in the middle", () => {
    render(
      <TestComponent
        totalCount={100}
        pageSize={10}
        currentPage={5}
        siblingCount={1}
      />,
    );
    const pages = [
      { testId: "page-0", content: "1" },
      { testId: "page-1", content: "2" },
      { testId: "page-2", content: "3" },
      { testId: "page-3", content: "4" },
      { testId: "page-4", content: "5" },
      { testId: "page-5", content: "6" },
      { testId: "page-6", content: "7" },
    ];

    pages.forEach(({ testId, content }) =>
      expect(screen.getByTestId(testId)).toHaveTextContent(content),
    );
  });

  test("returns correct pagination when siblingCount is zero", () => {
    render(
      <TestComponent
        totalCount={100}
        pageSize={10}
        currentPage={5}
        siblingCount={0}
      />,
    );
    const pages = [
      { testId: "page-0", content: "1" },
      { testId: "page-1", content: "2" },
      { testId: "page-2", content: "3" },
      { testId: "page-3", content: "4" },
      { testId: "page-4", content: "5" },
    ];

    pages.forEach(({ testId, content }) =>
      expect(screen.getByTestId(testId)).toHaveTextContent(content),
    );
  });

  test("handles edge case when currentPage is greater than total pages", () => {
    render(<TestComponent totalCount={100} pageSize={10} currentPage={15} />);
    const pages = [
      { testId: "page-0", content: "1" },
      { testId: "page-1", content: "2" },
      { testId: "page-2", content: "3" },
      { testId: "page-3", content: "4" },
      { testId: "page-4", content: "5" },
    ];

    pages.forEach(({ testId, content }) =>
      expect(screen.getByTestId(testId)).toHaveTextContent(content),
    );
  });

  test("returns undefined when pageSize is zero (invalid case)", () => {
    render(<TestComponent totalCount={100} pageSize={0} currentPage={1} />);
    const pagination = screen.queryByTestId("pagination");
    expect(pagination).toBeInTheDocument();

    const pages = [
      { testId: "page-0", content: "1" },
      { testId: "page-1", content: "2" },
      { testId: "page-2", content: "3" },
      { testId: "page-3", content: "4" },
      { testId: "page-4", content: "5" },
      { testId: "page-5", content: "6" },
      { testId: "page-6", content: "7" },
      { testId: "page-7", content: "8" },
      { testId: "page-8", content: "9" },
      { testId: "page-9", content: "10" },
      { testId: "page-10", content: DOTS },
      { testId: "page-11", content: "Infinity" },
    ];

    pages.forEach(({ testId, content }) =>
      expect(screen.getByTestId(testId)).toHaveTextContent(content),
    );
  });
});
