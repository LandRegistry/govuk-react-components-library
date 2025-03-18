import React, { HTMLAttributes } from "react";
import { TaskListItemProps, TaskListProps } from "./TaskList.types";
import { LinkWithRef } from "../LinkWithRef";
import { Tag } from "../Tag";
import { Hint } from "../Hint";

const TaskList: React.FC<TaskListProps & HTMLAttributes<HTMLUListElement>> = (
  props,
) => {
  const { className, idPrefix, items, ...attributes } = props;

  const renderTaskListItem = (item: TaskListItemProps, index: number) => {
    if (!item) return null;

    const { title, hint, status, href, ...attributes } = item;
    const itemId: string = `${idPrefix}-${index + 1}`;
    return (
      <li
        key={itemId}
        id={itemId}
        className="govuk-task-list__item govuk-task-list__item--with-link"
        {...attributes}
      >
        <div className="govuk-task-list__name-and-hint">
          <LinkWithRef
            className="govuk-link govuk-task-list__link"
            href={href}
            aria-describedby={`${itemId}-status`}
          >
            {title.children}
          </LinkWithRef>
          {hint ? (
            <Hint
              id={`${itemId}-hint`}
              className="govuk-task-list__hint"
              {...hint}
            />
          ) : null}
        </div>
        <div className="govuk-task-list__status" id={`${itemId}-status`}>
          {status.tag ? <Tag {...status.tag} /> : status.children}
        </div>
      </li>
    );
  };
  return (
    <ul className={`govuk-task-list ${className || ""}`} {...attributes}>
      {items.map(renderTaskListItem)}
    </ul>
  );
};

export default TaskList;
