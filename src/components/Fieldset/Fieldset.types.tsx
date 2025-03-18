export interface LegendProps {
  children: React.ReactNode;
  className?: string;
  isPageHeading?: boolean;
}

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  className?: string;
  legend?: LegendProps;
  children: React.ReactNode;
  "aria-describedby"?: string;
  [key: string]: unknown;
}
