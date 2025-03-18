import React, { JSX } from "react";
import { DateInputItem, DateInputProps } from "./DateInput.types";
import Fieldset from "../Fieldset/Fieldset";
import Hint from "../Hint/Hint";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Input from "../Input/Input";

const DateInput: React.FC<DateInputProps> = (props) => {
  const {
    className,
    errorMessage,
    fieldset,
    formGroup,
    hint,
    id,
    items,
    namePrefix,
    onChange,
    ...attributes
  } = props;

  let describedBy: string = fieldset?.["aria-describedby"]
    ? fieldset["aria-describedby"]
    : "";

  let hintComponent: JSX.Element | undefined;
  let errorMessageComponent: JSX.Element | undefined;
  let dateInputItems: Array<{
    name: string;
    className?: string;
    type?: string;
  }> = [];

  if (hint) {
    const hintId: string = `${id}-hint`;
    describedBy += ` ${hintId}`;
    hintComponent = <Hint {...hint} id={hintId} />;
  }

  if (errorMessage) {
    const errorId: string = id ? `${id}-error` : "";
    describedBy += ` ${errorId}`;
    errorMessageComponent = <ErrorMessage {...errorMessage} id={errorId} />;
  }

  if (items && items.length > 0) {
    dateInputItems = items;
  } else {
    dateInputItems = [
      {
        name: "day",
        className: "govuk-input--width-2",
        type: "text",
      },
      {
        name: "month",
        className: "govuk-input--width-2",
        type: "text",
      },
      {
        name: "year",
        className: "govuk-input--width-4",
        type: "text",
      },
    ];
  }

  const itemComponents: JSX.Element[] = dateInputItems
    .filter((item) => item)
    .map((item, index) => {
      const {
        name: itemName,
        inputMode: itemInputMode,
        label: itemLabel,
        reactListKey: itemReactListKey,
        id: itemId,
        className: itemClassName,
        pattern: itemPattern,
        ...itemAttributes
      }: DateInputItem = item;

      return (
        <div key={itemReactListKey || index} className="govuk-date-input__item">
          <Input
            onChange={onChange}
            {...itemAttributes}
            label={{
              children:
                itemLabel ||
                itemName.charAt(0).toUpperCase() + itemName.slice(1),
              className: "govuk-date-input__label",
            }}
            id={itemId || `${id}-${itemName}`}
            className={`govuk-date-input__input ${itemClassName || ""}`}
            name={namePrefix ? `${namePrefix}-${itemName}` : itemName}
            type="text"
            inputMode={itemInputMode || "numeric"}
            pattern={itemPattern || "[0-9]*"}
          />
        </div>
      );
    });

  const innerHtml: JSX.Element = (
    <>
      {hintComponent}
      {errorMessageComponent}
      <div
        className={`govuk-date-input ${className || ""}`}
        {...attributes}
        id={id}
      >
        {itemComponents}
      </div>
    </>
  );

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      {fieldset ? (
        <Fieldset
          {...fieldset}
          aria-describedby={describedBy || undefined}
          role="group"
        >
          {innerHtml}
        </Fieldset>
      ) : (
        <>{innerHtml}</>
      )}
    </div>
  );
};

export default DateInput;
