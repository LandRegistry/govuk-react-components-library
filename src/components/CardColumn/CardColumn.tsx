import React from "react";
import "./CardColumn.scss";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CardColumnProps } from "./CardColumn.types";

const CardColumn: React.FC<CardColumnProps> = (props: CardColumnProps) => {
  const { body, header, link } = props;
  return (
    <div className="col">
      <Card className="card-styles">
        <Link to={link}>
          <Card.Header className="card-header govuk-!-font-size-27 govuk-!-font-weight-bold">
            {header}
          </Card.Header>
        </Link>
        <Card.Body className="govuk-!-font-size-19">{body}</Card.Body>
      </Card>
    </div>
  );
};

export default CardColumn;
