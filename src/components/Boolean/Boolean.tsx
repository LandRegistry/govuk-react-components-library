import React, { JSX } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Fieldset from "../Fieldset/Fieldset";
import Hint from "../Hint/Hint";
import Label from "../Label/Label";

import { BooleanItem, BooleanProps } from "./Boolean.types";
import omit from "./OmitKey";

const Boolean: React.FC<BooleanProps> = ({
  className,
  errorMessage,
  fieldset,
  formGroup,
  hint,
  idPrefix,
  items,
  controlType,
  name,
  onChange,
  onBlur,
  "aria-describedby": describedByProp,
  ...attributes
}) => {
  const idPrefixValue: string | undefined = idPrefix || name;
  let describedBy = describedByProp || fieldset?.["aria-describedby"] || "";

  const getHintComponent = () => {
    if (hint) {
      const hintId: string = `${idPrefixValue}-hint`;
      describedBy += ` ${hintId}`;
      return <Hint {...hint} id={hintId} />;
    }
    return null;
  };

  const getErrorMessageComponent = () => {
    if (errorMessage) {
      const errorId = `${idPrefixValue}-error`;
      describedBy += ` ${errorId}`;
      return <ErrorMessage {...errorMessage} id={errorId} />;
    }
    return null;
  };

  const hasFieldset: boolean = !!fieldset;
  const innerHtml: JSX.Element = (
    <>
      {getHintComponent()}
      {getErrorMessageComponent()}

      <div
        className={`govuk-${controlType} ${className || ""}`}
        {...attributes}
        data-module={`govuk-${controlType}`}
      >
        {items &&
          items.map((item: BooleanItem, index: number) => {
            if (!item) {
              return null;
            }

            if (item.behaviour === "exclusive") {
              delete item.behaviour;
            }

            const {
              id,
              children,
              hint: itemHint,
              conditional: itemConditional,
              behaviour,
              label,
              reactListKey,
              ...itemAttributes
            } = item;

            const idSuffix: string = `-${index + 1}`;
            const idValue: string =
              id || `${idPrefixValue}${index === 0 ? "" : idSuffix}`;
            const nameValue: string | undefined = item.name ? item.name : name;
            const conditionalId: string | undefined = itemConditional?.children
              ? `conditional-${idValue}`
              : undefined;
            const itemHintId: string = `${idValue}-item-hint`;

            let itemDescribedBy: string = "";

            if (controlType === "checkboxes" && !hasFieldset) {
              itemDescribedBy = describedBy;
            }

            if (itemHint) {
              itemDescribedBy += ` ${itemHintId}`;
            }

            if (item.divider) {
              return (
                <div
                  key={reactListKey || index}
                  className={`govuk-${controlType}__divider`}
                >
                  {item.divider}
                </div>
              );
            }

            return (
              <React.Fragment key={reactListKey || index}>
                <div className={`govuk-${controlType}__item`}>
                  <input
                    className={`govuk-${controlType}__input`}
                    id={idValue}
                    name={nameValue}
                    type={controlType === "radios" ? "radio" : "checkbox"}
                    data-aria-controls={conditionalId}
                    aria-describedby={itemDescribedBy || undefined}
                    onChange={onChange}
                    onBlur={onBlur}
                    data-behaviour={behaviour}
                    {...itemAttributes}
                  />
                  <Label
                    {...{
                      ...label,
                      className: `govuk-${controlType}__label ${
                        label?.className || ""
                      }`,
                      htmlFor: idValue,
                      isPageHeading: false,
                    }}
                  >
                    {children}
                  </Label>
                  {itemHint ? (
                    <Hint
                      {...{
                        ...itemHint,
                        className: `govuk-${controlType}__hint ${
                          itemHint.className || ""
                        }`,
                      }}
                      id={itemHintId}
                    />
                  ) : (
                    ""
                  )}
                </div>

                {itemConditional?.children ? (
                  <div
                    className={`govuk-${controlType}__conditional ${
                      item.checked
                        ? ""
                        : `govuk-${controlType}__conditional--hidden`
                    }`}
                    id={conditionalId}
                  >
                    {itemConditional.children}
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );

  return (
    <div
      className={`govuk-form-group${
        errorMessage ? " govuk-form-group--error" : ""
      } ${formGroup?.className || ""}`}
    >
      {hasFieldset ? (
        <Fieldset
          {...omit(fieldset, "role")}
          aria-describedby={describedBy.trim() || undefined}
        >
          {innerHtml}
        </Fieldset>
      ) : (
        innerHtml
      )}
    </div>
  );
};

export default Boolean;
