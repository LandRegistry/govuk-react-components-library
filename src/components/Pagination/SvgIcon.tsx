import React from "react";
import { SvgIconProps } from "./Pagination.types";
export const SvgIcon: React.FC<
  SvgIconProps & React.SVGProps<SVGSVGElement>
> = ({ type, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={13}
    aria-hidden="true"
    {...props}
  >
    <path
      d={
        type === "next"
          ? "M8.107-.008L6.693 1.406 10.986 5.7H-2v2h12.896L6.71 11.676l1.378 1.449 6.744-6.406L8.107-.008z"
          : "M6.594-.008-.133 6.72l6.744 6.406 1.377-1.449-4.185-3.977h12.896v-2H3.715l4.293-4.293L6.594-.008z"
      }
    />
  </svg>
);
