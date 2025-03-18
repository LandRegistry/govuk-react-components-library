import React, { JSX } from "react";
import { CardLayoutProps } from "./CardLayout.types";
import { CardColumn } from "../CardColumn";
import { CardColumnProps } from "../CardColumn/CardColumn.types";

const CardLayout: React.FC<CardLayoutProps> = (props) => {
  const { cardColumns: children, numberOfGridColumns = 3 } = props;

  const divideByColumn: JSX.Element[] = [];
  let accumulator: JSX.Element[] = [];

  children.map((child: CardColumnProps, index: number) => {
    accumulator.push(<CardColumn {...child} key={`card-column-${index}`} />);
    if (index % numberOfGridColumns === numberOfGridColumns - 1) {
      divideByColumn.push(
        <div
          key={`card-layout-${index}`}
          className={`row row-cols-1 row-cols-md-${numberOfGridColumns} govuk-!-margin-bottom-8`}
        >
          {accumulator}
        </div>,
      );
      accumulator = [];
    }
  });

  if (accumulator.length > 0) {
    divideByColumn.push(
      <div
        key={`card-layout-final`}
        className={`row row-cols-1 row-cols-md-${numberOfGridColumns} govuk-!-margin-bottom-8`}
      >
        {accumulator}
      </div>,
    );
  }

  return <>{divideByColumn}</>;
};

export default CardLayout;
