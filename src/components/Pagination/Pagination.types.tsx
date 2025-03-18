export interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  previousName?: string;
  previousChildren?: React.ReactNode;
  nextName?: string;
  nextChildren?: React.ReactNode;
}

export interface SvgIconProps {
  type: string;
}

export interface NavigationButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  name: string;
  type: "next" | "previous";
}
