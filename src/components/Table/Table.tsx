import React, { useMemo } from "react";
import { TableProps } from "./Table.types";

const Table: React.FC<TableProps> = ({
  caption,
  captionClassName,
  className,
  firstCellIsHeader,
  head,
  rows,
  footer,
  ...attributes
}) => {
  // Memoize caption component to avoid re-renders if it doesn't change
  const captionComponent = useMemo(
    () =>
      caption && (
        <caption className={`govuk-table__caption ${captionClassName || ""}`}>
          {caption}
        </caption>
      ),
    [caption, captionClassName],
  );

  // Memoize head component
  const headComponent = useMemo(
    () =>
      head && (
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {head.map(
              (
                {
                  className,
                  format,
                  children,
                  reactListKey,
                  ...itemAttributes
                },
                index,
              ) => (
                <th
                  key={reactListKey || index}
                  scope="col"
                  className={`govuk-table__header ${format ? `govuk-table__header--${format}` : ""} ${className || ""}`}
                  {...itemAttributes}
                >
                  {children}
                </th>
              ),
            )}
          </tr>
        </thead>
      ),
    [head],
  );

  // Memoize footer component
  const footerComponent = useMemo(
    () =>
      footer && (
        <tfoot className="govuk-table__head">
          <tr className="govuk-table__row">
            {footer.map(
              (
                {
                  className,
                  format,
                  children,
                  reactListKey,
                  ...itemAttributes
                },
                index,
              ) => (
                <th
                  key={reactListKey || index}
                  scope="col"
                  className={`govuk-table__header ${format ? `govuk-table__header--${format}` : ""} ${className || ""}`}
                  {...itemAttributes}
                >
                  {children}
                </th>
              ),
            )}
          </tr>
        </tfoot>
      ),
    [footer],
  );

  // Filter rows that contain cells
  const filteredRows = rows?.filter((row) => row.cells) || [];

  return (
    <table className={`govuk-table ${className}`} {...attributes}>
      {captionComponent}
      {headComponent}

      <tbody className="govuk-table__body">
        {filteredRows.map(({ cells, reactListKey }, rowIndex) => (
          <tr key={reactListKey || rowIndex} className="govuk-table__row">
            {cells.map(
              (
                {
                  className,
                  children,
                  format,
                  reactListKey,
                  ...cellAttributes
                },
                cellIndex,
              ) => {
                const cellClassNames = `govuk-table__cell ${className || ""} ${format ? `govuk-table__cell--${format}` : ""}`;
                const headerClassNames = `govuk-table__header ${className || ""}`;

                // Check if the first cell should be a header
                if (cellIndex === 0 && firstCellIsHeader) {
                  return (
                    <th
                      key={reactListKey || cellIndex}
                      scope="row"
                      className={headerClassNames}
                      {...cellAttributes}
                    >
                      {children}
                    </th>
                  );
                }
                return (
                  <td
                    key={reactListKey || cellIndex}
                    className={cellClassNames}
                    {...cellAttributes}
                  >
                    {children}
                  </td>
                );
              },
            )}
          </tr>
        ))}
      </tbody>
      {footerComponent}
    </table>
  );
};

export default Table;
