import { useMemo } from "react";

export const DOTS = "...";

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const UsePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps): (number | string)[] | undefined => {
  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const visiblePages = siblingCount + 10;

    // Case 1: Show all pages when total pages is less than the number of visible pages
    if (visiblePages >= totalPages) {
      return range(1, totalPages);
    }

    const firstPage = 1;
    const lastPage = totalPages;

    const leftSibling = Math.max(currentPage - siblingCount, firstPage);
    const rightSibling = Math.min(currentPage + siblingCount, lastPage);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 2;

    // Case 2: Only right dots are shown
    if (!showLeftDots && showRightDots) {
      const leftPages = range(1, 8 + 2 * siblingCount);
      return [...leftPages, DOTS, lastPage];
    }

    // Case 3: Only left dots are shown
    if (showLeftDots && !showRightDots) {
      const rightPages = range(
        totalPages - (6 + 2 * siblingCount) + 1,
        lastPage,
      );
      return [firstPage, DOTS, ...rightPages];
    }

    // Case 4: Both left and right dots are shown
    const middlePages = range(leftSibling, rightSibling);
    return [firstPage, DOTS, ...middlePages, DOTS, lastPage];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
