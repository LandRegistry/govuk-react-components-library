import React, { JSX } from "react";
import { Row, SummaryListProps } from "./SummaryList.types";
import ActionLink from "../ActionLink/ActionLink";

const actions = (row: Row): JSX.Element | null => {
  const actionLinks = row.actions?.items.map((action, index) => {
    const { reactListKey, ...actionAttributes } = action;
    return <ActionLink key={reactListKey || index} {...actionAttributes} />;
  });

  if (row.actions?.items.length) {
    return (
      <dd
        className={`govuk-summary-list__actions ${row.actions.className || ""}`}
      >
        {row.actions.items.length === 1 ? (
          actionLinks
        ) : (
          <ul className="govuk-summary-list__actions-list">
            {actionLinks?.map((actionLink) => (
              <li
                key={actionLink.key}
                className="govuk-summary-list__actions-list-item"
              >
                {actionLink}
              </li>
            ))}
          </ul>
        )}
      </dd>
    );
  }

  return null;
};

const SummaryList: React.FC<SummaryListProps> = (props) => {
  const { className, rows, ...attributes } = props;
  const filteredRows = rows ? rows.filter((row) => row) : [];
  const anyRowHasActions = filteredRows.some(
    (item) => item.actions?.items && item.actions?.items.length > 0,
  );

  return (
    <dl className={`govuk-summary-list ${className || ""}`} {...attributes}>
      {filteredRows.map((row, index) => (
        <div
          key={row.reactListKey || index}
          className={`govuk-summary-list__row ${
            anyRowHasActions && !row.actions?.items
              ? "govuk-summary-list__row--no-actions"
              : ""
          } ${row.className || ""}`}
        >
          <dt className={`govuk-summary-list__key ${row.key?.className || ""}`}>
            {row.key?.children}
          </dt>
          <dd
            className={`govuk-summary-list__value ${row.value?.className || ""}`}
          >
            {row.value?.children}
          </dd>

          {actions(row)}
        </div>
      ))}
    </dl>
  );
};

export default SummaryList;
