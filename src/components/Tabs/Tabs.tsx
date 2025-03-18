import React from "react";
import { TabItem, TabsProps } from "./Tabs.types";

const Tabs: React.FC<TabsProps> = ({
  className = "",
  id,
  idPrefix = "",
  items = [],
  title = "Contents",
  ...attributes
}) => {
  const filteredItems: TabItem[] = items.filter(Boolean); // filter out any falsy items in a cleaner way

  const renderTab = (item: TabItem, index: number) => {
    const tabId: string = item.id || `${idPrefix}-${index + 1}`;
    return (
      <li
        key={tabId}
        className={`govuk-tabs__list-item ${
          index === 0 ? "govuk-tabs__list-item--selected" : ""
        }`}
      >
        <a className="govuk-tabs__tab" href={`#${tabId}`} {...item}>
          {item.label}
        </a>
      </li>
    );
  };

  const renderPanel = (item: TabItem, index: number) => {
    const panelId: string = item.id || `${idPrefix}-${index + 1}`;
    return (
      <div
        key={panelId}
        id={panelId}
        className={`govuk-tabs__panel ${
          index > 0 ? "govuk-tabs__panel--hidden" : ""
        }`}
        {...item.panel}
      />
    );
  };

  return (
    <div
      id={id}
      className={`govuk-tabs ${className}`}
      {...attributes}
      data-module="govuk-tabs"
    >
      <h2 className="govuk-tabs__title">{title}</h2>
      {filteredItems.length > 0 && (
        <>
          <ul className="govuk-tabs__list">{filteredItems.map(renderTab)}</ul>
          {filteredItems.map(renderPanel)}
        </>
      )}
    </div>
  );
};

export default Tabs;
